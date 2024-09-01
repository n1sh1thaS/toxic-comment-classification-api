from django.urls import path
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'projects', views.ProjectViewSet)

urlpatterns = [
    path('users/<int:id>', views.get_user),
    path('users/', views.create_user),
]
urlpatterns += router.urls