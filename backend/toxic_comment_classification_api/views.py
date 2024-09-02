from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from rest_framework_api_key.models import APIKey
from .models import User, Project, ClassifierAPIKey
from .serializers import UserSerializer, ProjectSerializer, ClassifierAPIKeySerializer
# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=False, methods=['post'])
    def create_project(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        project = serializer.save(user = request.user)
        api_key, key = APIKey.objects.create_key(name="toxic-comment-api for ")
        ClassifierAPIKey.objects.create(project = project, key = api_key)
        return Response({"apiKey": key}, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def get_projects(self, request):
        project_titles = Project.objects.filter(user = request.user).values("title")
        titles = []
        for title in project_titles:
            titles.append(title["title"])
        return Response({"titles": titles}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def validate_key(self, request):
        return Response("key validated")

class ClassifierAPIKeyViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ClassifierAPIKeySerializer
    queryset = ClassifierAPIKey.objects.all()

    @action(detail=False, methods=['post'])
    def update_key(self, request):
        project = get_object_or_404(Project, title = request.data.get("title"), user = request.user)
        classifier_key = ClassifierAPIKey.objects.filter(project_id=project.id).first()
        if (classifier_key): 
            #remove old APIKey object from database
            oldKey = APIKey.objects.filter(id=classifier_key.key_id).first()
            if(oldKey): oldKey.delete()
            #generate new key and APIKey object and replace in ClassifierAPIKey
            api_key, key = APIKey.objects.create_key(name="toxic-comment-api")
            classifier_key.key = api_key
            classifier_key.save()
            return Response({"apiKey": key}, status=status.HTTP_200_OK)
        else:
            return Response({"apiKey" : "error generating new key"}, status = status.HTTP_400_BAD_REQUEST)


#create view to validate the api key when using it to access the classification model
class ClassificationViewSet(viewsets.ViewSet):
    permission_classes = [HasAPIKey]
    queryset = APIKey.objects.all()

    @action(detail=False, methods=['post'])
    def validate_key(self, request):
        key = request.META["HTTP_AUTHORIZATION"].split()[1]
        api_key = APIKey.objects.get_from_key(key)
        classifier_key = ClassifierAPIKey.objects.filter(key_id=api_key).first()
        if(classifier_key):
            project = Project.objects.filter(id = classifier_key.project_id).first()
            if(project.title == request.data.get("title")):
                #call model to get result here
                return Response({"classification": [0, 0, 0, 0, 0, 0]}, status=status.HTTP_200_OK)
        return Response("invalid API Key", status=status.HTTP_401_UNAUTHORIZED)


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
