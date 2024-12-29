from django.contrib.auth.models import AbstractUser
from django.db import models

from store.models import generate_uuid
from utils.constants import ID_LENGTH


class User(AbstractUser):
    id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=36, null=True, blank=True)

    def generate_verification_token(self):
        self.verification_token = generate_uuid()
        self.save()