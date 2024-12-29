from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from . import views

router = DefaultRouter()
router.register('products', views.ProductViewSet)
router.register('carts', views.ShoppingCartViewSet)
router.register('users', views.UserViewSet)
router.register('address', views.UserAddressViewSet)
router.register('orders', views.OrderViewSet, basename='orders')

carts_router = routers.NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register('items', views.CartItemViewSet, basename='cart-items')

urlpatterns = router.urls + carts_router.urls
