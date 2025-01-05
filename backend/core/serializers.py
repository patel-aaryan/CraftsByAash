from djoser.serializers import (
    UserSerializer as BaseUserSerializer,
    UserCreateSerializer as BaseUserCreateSerializer
)

from utils.helpers import send_verification_email
from .models import User


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = [
            'id', 'username', 'password',
            'email', 'first_name', 'last_name'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.generate_verification_token()
        send_verification_email(user, 'verify')
        return user


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'email', 'first_name', 'last_name']