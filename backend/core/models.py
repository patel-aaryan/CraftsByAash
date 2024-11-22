from django.contrib.auth.models import AbstractUser
from django.db import models

from store.constants import ID_LENGTH
from store.models import generate_uuid


class User(AbstractUser):
    id = models.CharField(
        primary_key=True, max_length=ID_LENGTH, default=generate_uuid)
    email = models.EmailField(unique=True)
