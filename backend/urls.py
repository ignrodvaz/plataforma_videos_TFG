# backend/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet, register_user, current_user, listar_videos_usuario, cambiar_email, cambiar_contrasena, eliminar_cuenta

router = DefaultRouter()
router.register(r'videos', VideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('user/', current_user),
    path('user/videos/', listar_videos_usuario, name='listar_videos_usuario'),
    path('user/update-email/', cambiar_email, name='cambiar_email'),
    path('user/change-password/', cambiar_contrasena, name='cambiar_contrasena'),
    path('user/delete-account/', eliminar_cuenta, name='eliminar_cuenta'),
]
