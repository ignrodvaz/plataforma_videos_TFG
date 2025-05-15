# backend/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet, register_user, current_user

router = DefaultRouter()
router.register(r'videos', VideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('user/', current_user),
]
