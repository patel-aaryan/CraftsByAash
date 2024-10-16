from uuid import uuid4
from django.db import models

from .constants import *
from django.core.validators import MinValueValidator
from django.conf import settings


def generate_uuid():
    return str(uuid4())


class User(models.Model):
    phone = models.CharField(max_length=MAX_LENGTH)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, models.CASCADE)

    def __str__(self) -> str:
        return f'{self.user.first_name} {self.user.last_name}'

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
        permissions = [
            ('view_history', 'Can view history')
        ]


class UserPayment(models.Model):
    payment_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    user = models.ForeignKey(User, models.CASCADE)
    payment_type = models.CharField(max_length=MAX_LENGTH)
    provider = models.CharField(max_length=MAX_LENGTH)


class Category(models.Model):
    category_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    name = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()


class Product(models.Model):
    product_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    name = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()

    price = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)

    category = models.ForeignKey(Category, models.PROTECT, null=True)
    inventory = models.PositiveIntegerField()
    colour = models.CharField(max_length=MAX_LENGTH)
    shape = models.CharField(max_length=MAX_LENGTH)
    last_update = models.DateTimeField(auto_now=True)

    width = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)

    height = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)

    photo_id = models.PositiveIntegerField(default=None, blank=True)


class DiscountCodes(models.Model):
    discount_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    code = models.CharField(max_length=MAX_LENGTH, unique=True)
    discount_type = models.CharField(max_length=MAX_LENGTH)

    discount_dollar = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)

    discount_pct = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)


class Tax(models.Model):
    tax_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    country = models.CharField(max_length=MAX_LENGTH)
    state = models.CharField(max_length=MAX_LENGTH)

    country_tax_pct = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)

    state_tax_pct = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)


class UserAddress(models.Model):
    address_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    user = models.ForeignKey(User, models.CASCADE)
    address = models.CharField(max_length=MAX_LENGTH)
    city = models.CharField(max_length=MAX_LENGTH)
    state_province = models.CharField(max_length=MAX_LENGTH)
    country = models.CharField(max_length=MAX_LENGTH)
    zip_postal_code = models.CharField(max_length=MAX_LENGTH)
    phone = models.CharField(max_length=MAX_LENGTH)
    is_billing = models.BooleanField()
    is_shipping = models.BooleanField()
    tax = models.ForeignKey(Tax, models.PROTECT, default=None)


class ShoppingCart(models.Model):
    cart_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    user = models.OneToOneField(User, models.CASCADE)


class CartItem(models.Model):
    cart = models.ForeignKey(
        ShoppingCart, models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, models.PROTECT)
    quantity = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1)])
    discount = models.ForeignKey(DiscountCodes, models.PROTECT, null=True)

    class Meta:
        unique_together = [['cart', 'product']]


class Order(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed')
    ]

    placed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING)
    user = models.ForeignKey(User, models.PROTECT)

    class Meta:
        permissions = [
            ('cancel_order', 'Can cancel order')
        ]


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.PROTECT, related_name='items')
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name='orderitems')
    quantity = models.PositiveSmallIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)