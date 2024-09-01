from rest_framework import serializers
from rest_framework_api_key.models import APIKey
from .models import User, Project, ClassifierAPIKey

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title']

class ClassifierAPIKeySerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255)
    class Meta:
        model = ClassifierAPIKey
        fields = ['id', 'title']
