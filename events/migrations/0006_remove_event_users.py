# Generated by Django 4.1 on 2024-03-16 06:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0005_event_users"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="event",
            name="users",
        ),
    ]