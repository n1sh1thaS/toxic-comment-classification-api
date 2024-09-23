from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from rest_framework_api_key.models import APIKey
from .models import Project, ClassifierAPIKey
from .serializers import ProjectSerializer, ClassifierAPIKeySerializer

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
model = joblib.load('../toxic-comment-model/toxicity_classifier.joblib')
vectorizer = joblib.load('../toxic-comment-model/tfidf_vectorizer.joblib')
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

class ClassificationViewSet(viewsets.ViewSet):
    permission_classes = [HasAPIKey]
    queryset = APIKey.objects.all()
    
    @action(detail=False, methods=['post'])
    def classify(self, request):
        #validate API key -- ensure it is connected to the given project
        key = request.META["HTTP_AUTHORIZATION"].split()[1]
        api_key = APIKey.objects.get_from_key(key)
        classifier_key = ClassifierAPIKey.objects.filter(key_id=api_key).first()
        if(classifier_key):
            project = Project.objects.filter(id = classifier_key.project_id).first()
            if(project.title == request.data.get("title")):
                #call model and return result if API key is valid
                if(isinstance(request.data.get("text"), str)):
                   text = request.data.get("text")
                   if(model):
                        text = vectorizer.transform([text])
                        classification = model.predict(text)
                        return Response({"classification": classification}, status=status.HTTP_200_OK)
                   else: return Response({"try again later"}, status=status.HTTP_409_CONFLICT)
                else: return Response("invalid input text", status=status.HTTP_400_BAD_REQUEST)
        return Response("invalid API Key", status=status.HTTP_401_UNAUTHORIZED)
    