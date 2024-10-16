from django.db import transaction
from rest_framework import serializers
from .models import Order, OrderItem, Product, ShoppingCart, CartItem, User
from .constants import *


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'product_id', 'name', 'description', 'price', 'inventory',
            'colour', 'shape', 'width', 'height', 'photo_id'
        ]


class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'name', 'price']


class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    total = serializers.SerializerMethodField()

    def get_total(self, item: CartItem):
        return item.quantity * item.product.price

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'total']


class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.CharField(max_length=ID_LENGTH)

    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError(
                f'No product with exists with ID {value}')
        else:
            return value

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        product_id = self.validated_data['product_id']
        quantity = self.validated_data['quantity']

        try:
            cart_item = CartItem.objects.get(
                cart_id=cart_id, product_id=product_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(
                cart_id=cart_id, **self.validated_data)

        return self.instance

    class Meta:
        model = CartItem
        fields = ['cart', 'product_id', 'quantity']


class ShoppingCartSerializer(serializers.ModelSerializer):
    cart_id = serializers.CharField(max_length=ID_LENGTH, read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    subtotal = serializers.SerializerMethodField()

    def get_subtotal(self, cart):
        return sum([item.quantity * item.product.price for item in cart.items.all()])

    class Meta:
        model = ShoppingCart
        fields = ['cart_id', 'items', 'subtotal']


class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']


class UserSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'user_id', 'phone']


class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    price = serializers.SerializerMethodField()

    def get_price(self, item: OrderItem):
        return item.quantity * item.product.price

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'price', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'placed_at', 'payment_status', 'items']


class CreateOrderSerializer(serializers.Serializer):
    with transaction.atomic():
        cart_id = serializers.CharField(max_length=ID_LENGTH)

        def validate_cart_id(self, cart_id):
            if not ShoppingCart.objects.filter(pk=cart_id).exists():
                raise serializers.ValidationError('Cart not found')
            elif CartItem.objects.filter(cart_id=cart_id).count() == 0:
                raise serializers.ValidationError('Cart is empty')
            else:
                return cart_id

        def save(self, **kwargs):
            cart_id = self.validated_data['cart_id']

            user_id = User.objects.get(
                user_id=self.context['user_id'])

            order = Order.objects.create(user=user_id)
            cart_items = CartItem.objects \
                .select_related('product') \
                .filter(cart_id=cart_id)
            order_items = [
                OrderItem(
                    order=order,
                    product=item.product,
                    price=item.product.price,
                    quantity=item.quantity
                )for item in cart_items
            ]
            OrderItem.objects.bulk_create(order_items)
            ShoppingCart.objects.filter(pk=cart_id).delete()
            return order


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_status']
