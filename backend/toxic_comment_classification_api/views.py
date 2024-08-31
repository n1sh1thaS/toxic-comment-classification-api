from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
# Create your views here.
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
    