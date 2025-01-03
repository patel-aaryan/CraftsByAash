from django.contrib import admin, messages
from django.db.models.aggregates import Count
from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils.html import format_html, urlencode

from . import models


class InventoryFilter(admin.SimpleListFilter):
    title = 'inventory'
    parameter_name = 'inventory'

    def lookups(self, request, model_admin):
        return [
            ('<10', 'Low')
        ]

    def queryset(self, request, queryset: QuerySet):
        if self.value() == '<10':
            return queryset.filter(inventory__lt=10)


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ['category']
    actions = ['clear_inventory']
    list_display = ['name', 'price',
                    'inventory_status', 'category_name']
    list_editable = ['price']
    list_filter = ['category', 'last_update', InventoryFilter]
    list_per_page = 10
    list_select_related = ['category']
    search_fields = ['name']

    def category_name(self, product):
        if product.category:
            return product.category.name

    @admin.display(ordering='inventory')
    def inventory_status(self, product):
        if product.inventory < 10:
            return 'Low'
        return 'OK'

    @admin.action(description='Clear inventory')
    def clear_inventory(self, request, queryset):
        updated_count = queryset.update(inventory=0)
        self.message_user(
            request,
            f'{updated_count} products were successfully updated.',
            messages.ERROR
        )


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'products_count']
    search_fields = ['name']

    @admin.display(ordering='products_count')
    def products_count(self, category):
        url = (
            reverse('admin:store_product_changelist')
            + '?'
            + urlencode({
                'category__id': str(category.id)
            }))
        return format_html('<a href="{}">{} Products</a>', url, category.products_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            products_count=Count('product')
        )


@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user__first_name', 'user__last_name', 'orders', 'user__is_verified']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']
    search_fields = ['first_name__istartswith', 'last_name__istartswith']

    @admin.display(ordering='orders_count')
    def orders(self, user):
        url = (
            reverse('admin:store_order_changelist')
            + '?'
            + urlencode({
                'user__id': str(user.id)
            }))
        return format_html('<a href="{}">{} Orders</a>', url, user.orders_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )


class OrderItemInline(admin.TabularInline):
    autocomplete_fields = ['product']
    min_num = 1
    max_num = 10
    model = models.OrderItem
    extra = 0


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    autocomplete_fields = ['user']
    inlines = [OrderItemInline]
    list_display = ['id', 'placed_at', 'user']



@admin.register(models.Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ['media_id', 'product', 'product_name']
    search_fields = ['media_id', 'product__name']
    list_filter = ['product__name']
    ordering = ['product__name']

    def product_name(self, media):
        if media.product:
            return media.product.name
