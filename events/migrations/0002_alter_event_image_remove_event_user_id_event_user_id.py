# Generated by Django 4.1 on 2024-03-16 02:44

from django.conf import settings
from django.db import migrations, models
import events.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("events", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="image",
            field=models.ImageField(
                blank=True, null=True, upload_to=events.models.upload_to
            ),
        ),
        migrations.RemoveField(
            model_name="event",
            name="user_id",
        ),
        migrations.AddField(
            model_name="event",
            name="user_id",
            field=models.ManyToManyField(
                related_name="events", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
