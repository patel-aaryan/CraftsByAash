
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from utils.constants import *
from utils.helpers import generate_uuid


class User(models.Model):
    phone = models.CharField(max_length=MAX_PHONE)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, models.CASCADE, related_name='profile')


    def __str__(self) -> str:
        return f'{self.user.first_name} {self.user.last_name}'

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
        permissions = [
            ('view_history', 'Can view history')
        ]


class Category(models.Model):
    category_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    name = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()


class Colours(models.Model):
    name = models.CharField(max_length=MAX_LENGTH)
    hex = models.CharField(max_length=MAX_COLOUR)
    rgba = models.CharField(max_length=MAX_RGB)


class Product(models.Model):
    product_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    name = models.CharField(max_length=MAX_LENGTH)
    description = models.TextField()

    price = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)

    category = models.ForeignKey(Category, models.PROTECT, blank=True, null=True)
    inventory = models.PositiveIntegerField()
    colour = models.ForeignKey(Colours, models.PROTECT, null=True)
    last_update = models.DateTimeField(auto_now=True)

    width = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)

    height = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)


class Media(models.Model):
    MEDIA_TYPE_IMAGE = 'I'
    MEDIA_TYPE_VIDEO = 'V'
    MEDIA_TYPE_CHOICES = [
        (MEDIA_TYPE_IMAGE, 'Image'),
        (MEDIA_TYPE_VIDEO, 'Video'),
    ]
    media_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    media_type = models.CharField(
        max_length=1, choices=MEDIA_TYPE_CHOICES, default=MEDIA_TYPE_IMAGE)
    product = models.ForeignKey(
        Product, models.PROTECT, null=True, related_name='media')


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
    name = models.CharField(max_length=MAX_LENGTH, default="Tax")
    country = models.CharField(max_length=MAX_LENGTH)
    state = models.CharField(max_length=MAX_LENGTH)

    tax_pct = models.DecimalField(
        max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)


class Address(models.Model):
    address_id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    user = models.ForeignKey(User, models.CASCADE, related_name='addresses')
    full_name = models.CharField(blank=True, max_length=MAX_LENGTH)
    street_number = models.PositiveSmallIntegerField(default=None)
    apt_number = models.PositiveSmallIntegerField(blank=True, null=True)
    street_name = models.CharField(max_length=MAX_LENGTH)
    city = models.CharField(max_length=MAX_LENGTH)
    state_province = models.CharField(max_length=MAX_LENGTH)
    country = models.CharField(max_length=MAX_LENGTH)
    zip_postal_code = models.CharField(max_length=MAX_POSTAL)
    tax = models.ForeignKey(Tax, models.PROTECT, default=None, blank=True, null=True)


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
    phone = models.CharField(max_length=MAX_PHONE, blank=True, null=True, default=None)
    shipping_address = models.ForeignKey(
        Address, models.PROTECT, related_name='shipping', default=None)
    billing_address = models.ForeignKey(
        Address, models.PROTECT, related_name='billing', default=None)
    tax = models.ForeignKey(Tax, models.PROTECT, blank=True, null=True, default=None)

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
    price = models.DecimalField(max_digits=MAX_DIGITS, decimal_places=DECIMAL_PLACES)
