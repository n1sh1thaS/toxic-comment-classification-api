from django.urls import path
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'apikey', views.ClassifierAPIKeyViewSet)
router.register(r'', views.ClassificationViewSet)

urlpatterns = []
urlpatterns += router.urls