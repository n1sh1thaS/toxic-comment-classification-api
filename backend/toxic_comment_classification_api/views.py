from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from rest_framework_api_key.models import APIKey
from .models import User, Project, ClassifierAPIKey
from .serializers import UserSerializer, ProjectSerializer
# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=False, methods=['post'])
    def create_project(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        project = serializer.save()
        api_key, key = APIKey.objects.create_key(name="toxic-comment-api")
        ClassifierAPIKey.objects.create(project = project, key = api_key)
        return Response({"apiKey": key}, status=status.HTTP_201_CREATED)
    





@api_view(['GET', 'PATCH'])
def get_user(request, id):
    user = User.objects.get(pk=id)
    if request.method == 'GET':
        try:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
    elif request.method == 'PATCH':
        serializer = UserSerializer(user, data = request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status = status.HTTP_200_OK)
    
@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    #print(serializer.validated_data)
    return Response(serializer.data, status = status.HTTP_201_CREATED)
