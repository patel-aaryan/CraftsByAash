from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import User


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
