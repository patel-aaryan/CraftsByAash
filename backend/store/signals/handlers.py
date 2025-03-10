from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from store.models import User


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_new_user(sender, **kwargs):
    if kwargs['created']:
        User.objects.create(user=kwargs['instance'])
