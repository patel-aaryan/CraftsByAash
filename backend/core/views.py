from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import User
from utils.helpers import send_verification_email


class VerifyEmailView(APIView):
    def get(self, request):
        token = request.query_params.get('token')
        if not token:
            return Response(
                {"error": "Token is required"},
                status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(verification_token=token)
            user.is_verified = True
            user.verification_token = None  # Clear the token after verification
            user.save()
            return Response(
                {"message": "Email verified successfully"},
                status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid token"},
                status.HTTP_400_BAD_REQUEST
            )


class ResendVerificationEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.is_verified:
            return Response(
                {"detail": "Account already verified."},
                status.HTTP_400_BAD_REQUEST
            )

        user.generate_verification_token()
        send_verification_email(user, 'resend')

        return Response(
            {"detail": "Verification email sent."},
            status.HTTP_200_OK
        )
