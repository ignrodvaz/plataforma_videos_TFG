# backend/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
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

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user