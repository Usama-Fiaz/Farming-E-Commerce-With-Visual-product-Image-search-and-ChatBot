# Generated by Django 4.1.3 on 2023-04-12 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inventory", "0004_review"),
    ]

    operations = [
        migrations.CreateModel(
            name="RoomVisualizer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("roomtype", models.CharField(max_length=50)),
                ("image", models.ImageField(upload_to="room_images/")),
            ],
        ),
    ]
