from django.db import transaction
from rest_framework import serializers

from utils.constants import *
from . import models as m


class ColourSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Colours
        fields = ['name', 'hex', 'rgba']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Media
        fields = ['media_id', 'media_type']


class ProductSerializer(serializers.ModelSerializer):
    colour = ColourSerializer()
    media = MediaSerializer(many=True, read_only=True)
    thumbnail = serializers.SerializerMethodField()

    def get_thumbnail(self, obj):
        media_list = obj.media.all()
        return next((item.media_id for item in media_list if item.media_type == 'I'), None)

    class Meta:
        model = m.Product
        fields = [
            'product_id', 'name', 'description', 'price', 'colour',
            'inventory', 'width', 'height', 'media', 'thumbnail'
        ]


class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Product
        fields = ['product_id', 'name', 'price']


class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    total = serializers.SerializerMethodField()

    def get_total(self, item: m.CartItem):
        return item.quantity * item.product.price

    class Meta:
        model = m.CartItem
        fields = ['id', 'product', 'quantity', 'total']


class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.CharField(max_length=ID_LENGTH)

    def validate_product_id(self, value):
        if not m.Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError(
                f'No product with exists with ID {value}')
        else:
            return value

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        product_id = self.validated_data['product_id']
        quantity = self.validated_data['quantity']

        try:
            cart_item = m.CartItem.objects.get(
                cart_id=cart_id, product_id=product_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except m.CartItem.DoesNotExist:
            self.instance = m.CartItem.objects.create(
                cart_id=cart_id, **self.validated_data)

        return self.instance

    class Meta:
        model = m.CartItem
        fields = ['cart', 'product_id', 'quantity']


class ShoppingCartSerializer(serializers.ModelSerializer):
    cart_id = serializers.CharField(max_length=ID_LENGTH, read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    subtotal = serializers.SerializerMethodField()

    def get_subtotal(self, cart: m.ShoppingCart):
        return sum([item.quantity * item.product.price
                    for item in cart.items.all()])

    class Meta:
        model = m.ShoppingCart
        fields = ['cart_id', 'items', 'subtotal']


class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.CartItem
        fields = ['quantity']


class UserAddressSerializer(serializers.ModelSerializer):
    address_id = serializers.CharField(max_length=ID_LENGTH, read_only=True)
    label = serializers.SerializerMethodField()

    def get_label(self, address: m.Address):
        return (f'{address.street_number} {address.street_name}, '
                f'{str(address.apt_number) + ', ' if address.apt_number else ""}{address.zip_postal_code}, '
                f'{address.city}, {address.state_province}, {address.country}')

    class Meta:
        model = m.Address
        fields = [
            'address_id', 'street_number', 'street_name', 'label', 'tax', 'apt_number',
            'full_name', 'city', 'state_province', 'country', 'zip_postal_code',
        ]


class SimpleUserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Address
        fields = [
            'street_number', 'street_name', 'apt_number', 'full_name',
            'city', 'state_province', 'country', 'zip_postal_code',
        ]


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    is_verified = serializers.BooleanField(source='user.is_verified', read_only=True)
    first_name = serializers.CharField(
        source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    addresses = UserAddressSerializer(many=True, read_only=True)

    class Meta:
        model = m.User
        fields = [
            'username', 'email', 'is_verified',
            'first_name', 'last_name', 'phone', 'addresses'
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    price = serializers.SerializerMethodField()

    def get_price(self, item: m.OrderItem):
        return item.quantity * item.product.price

    class Meta:
        model = m.OrderItem
        fields = ['id', 'product', 'price', 'quantity']


class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Tax
        fields = ['tax_pct']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    shipping_address = SimpleUserAddressSerializer(read_only=True)
    billing_address = SimpleUserAddressSerializer(read_only=True)
    total = serializers.SerializerMethodField()
    tax = serializers.SerializerMethodField()

    def get_total(self, order: m.Order):
        taxApplied = order.tax.tax_pct + 1 if order.tax else 1
        return sum([item.quantity * item.product.price
                    for item in order.items.all()]) * taxApplied

    def get_tax(self, order: m.Order):
        return order.tax.tax_pct if order.tax else 0

    class Meta:
        model = m.Order
        fields = [
            'id', 'user', 'placed_at', 'payment_status', 'total', 'tax',
            'phone', 'shipping_address', 'billing_address', 'items'
        ]


class CreateOrderSerializer(serializers.Serializer):
    with transaction.atomic():
        cart_id = serializers.CharField(max_length=ID_LENGTH)
        phone = serializers.CharField(max_length=MAX_PHONE, required=False)
        shipping_address = serializers.CharField(max_length=ID_LENGTH)
        billing_address = serializers.CharField(max_length=ID_LENGTH)
        tax = serializers.CharField(max_length=ID_LENGTH, required=False)

        def validate_cart_id(self, cart_id):
            if not m.ShoppingCart.objects.filter(pk=cart_id).exists():
                raise serializers.ValidationError('Cart not found')
            elif m.CartItem.objects.filter(cart_id=cart_id).count() == 0:
                raise serializers.ValidationError('Cart is empty')
            else:
                return cart_id

        def validate_shipping_address(self, shipping_address):
            user = m.User.objects.get(user_id=self.context['user_id'])
            test = m.Address.objects.filter(
                address_id=shipping_address, user_id=user.id)
            print(test)
            if not m.Address.objects.filter(
                    address_id=shipping_address, user_id=user.id).exists():
                raise serializers.ValidationError('Shipping Address not found')
            return shipping_address

        def validate_billing_address(self, billing_address):
            user = m.User.objects.get(user_id=self.context['user_id'])
            if not m.Address.objects.filter(
                    address_id=billing_address, user_id=user.id).exists():
                raise serializers.ValidationError('Shipping Address not found')
            return billing_address

        def validate_tax(self, tax):
            if not m.Tax.objects.filter(tax_id=tax).exists():
                raise serializers.ValidationError('Tax not found')
            return tax

        def save(self, **kwargs):
            cart_id = self.validated_data['cart_id']
            phone = self.validated_data.get('phone', None)
            shipping_id = self.validated_data['shipping_address']
            billing_id = self.validated_data['billing_address']
            tax_id = self.validated_data.get('tax', None)

            user_id = m.User.objects.get(user_id=self.context['user_id'])
            shipping_address = m.Address.objects.get(address_id=shipping_id)
            billing_address = m.Address.objects.get(address_id=billing_id)
            tax = m.Tax.objects.get(tax_id=tax_id) if tax_id else None

            order = m.Order.objects.create(
                user=user_id,
                phone=phone,
                shipping_address=shipping_address,
                billing_address=billing_address,
                tax=tax,
            )
            cart_items = m.CartItem.objects \
                .select_related('product') \
                .filter(cart_id=cart_id)

            order_items = []
            for item in cart_items:
                product = item.product
                if product.inventory >= item.quantity:
                    product.inventory -= item.quantity
                    product.save()
                else:
                    raise serializers.ValidationError(
                        f'Insufficient inventory for {product.name}'
                    )
                order_items.append(
                    m.OrderItem(
                        order=order,
                        product=item.product,
                        price=item.product.price,
                        quantity=item.quantity
                    )
                )

            m.OrderItem.objects.bulk_create(order_items)
            m.ShoppingCart.objects.filter(pk=cart_id).delete()
            return order


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Order
        fields = ['payment_status']
