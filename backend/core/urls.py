from django.urls import path

from .views import VerifyEmailView, ResendVerificationEmailView

urlpatterns = [
    path('verify/', VerifyEmailView.as_view()),
    path('resend/', ResendVerificationEmailView.as_view())
]
