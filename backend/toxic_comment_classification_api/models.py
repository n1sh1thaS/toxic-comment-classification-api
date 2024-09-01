from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework_api_key.models import APIKey
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Project(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="project")

class ClassifierAPIKey(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="api_key")
    key = models.OneToOneField(APIKey, on_delete=models.CASCADE, related_name="classification_key")
