# backend/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, Video

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
        extra_kwargs = {
            'file_url': {'required': False},
            'thumbnail_url': {'required': False},
            'duration': {'required': False},
            'user': {'required': False},
        }
    
    # def create(self, validated_data):
    #     # Añadir valores temporales si no vienen
    #     validated_data.setdefault('file_url', 'default.mp4')
    #     validated_data.setdefault('thumbnail_url', 'default.jpg')
    #     validated_data.setdefault('duration', 0.0)
    #     validated_data.setdefault('user', User.objects.first())  # O un usuario de prueba

    #     return super().create(validated_data)

