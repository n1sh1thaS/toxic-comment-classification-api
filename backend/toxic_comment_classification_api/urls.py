from django.urls import path
from . import views

urlpatterns = [
    path('users/<int:id>', views.get_user),
    path('users/', views.create_user)
]