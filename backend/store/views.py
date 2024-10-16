from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsAdminOrReadOnly, ViewCustomerHistoryPermission
from .pagination import ProductPagination
from .filters import ProductFilter
from .models import CartItem, Order, Product, ShoppingCart, User
from .serializers import \
    AddCartItemSerializer, \
    CartItemSerializer, \
    CreateOrderSerializer, \
    OrderSerializer, \
    ProductSerializer, \
    ShoppingCartSerializer, \
    UpdateCartItemSerializer, \
    UpdateOrderSerializer, \
    UserSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    pagination_class = ProductPagination
    search_fields = ['name', 'description']
    ordering_fields = ['price']
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_context(self):
        return {'request': self.request}


class ShoppingCartViewSet(ModelViewSet):
    queryset = ShoppingCart.objects.prefetch_related('items__product').all()
    serializer_class = ShoppingCartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ShoppingCart.objects.prefetch_related('items__product').all()
        else:
            user_id = User.objects.only('id').get(user_id=user.id)
            return ShoppingCart.objects \
                .prefetch_related('items__product') \
                .filter(user_id=user_id.id)

    def perform_create(self, serializer):
        user = User.objects.get(user=self.request.user)
        serializer.save(user=user)


class CartItemViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        else:
            return CartItemSerializer

    def get_serializer_context(self):
        return {'cart_id': self.kwargs['cart_pk']}

    def get_queryset(self):
        return CartItem.objects \
            .filter(cart_id=self.kwargs['cart_pk']) \
            .select_related('product')


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, permission_classes=[ViewCustomerHistoryPermission])
    def history(self, request, pk):
        return Response('history')

    @action(['GET', 'PUT'], False, permission_classes=IsAuthenticated)
    def me(self, request):
        profile = User.objects.get(user_id=request.user.id)
        if request.method == 'GET':
            serializer = UserSerializer(profile)
        elif request.method == 'PUT':
            serializer = UserSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data)


class OrderViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [IsAdminUser()]
        else:
            return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data,
            context={'user_id': self.request.user.id})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        elif self.request.method == 'PATCH':
            return UpdateOrderSerializer
        else:
            return OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        else:
            user_id = User.objects.only('id').get(user_id=user.id)
            return Order.objects.filter(user=user_id)
