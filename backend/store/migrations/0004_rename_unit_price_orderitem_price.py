# Generated by Django 5.1.1 on 2024-10-02 18:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_alter_user_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='unit_price',
            new_name='price',
        ),
    ]
