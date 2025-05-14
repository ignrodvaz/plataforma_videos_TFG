from django.shortcuts import render
from rest_framework import viewsets
from .models import Video, User
from .serializers import VideoSerializer

from moviepy import *
import tempfile

import boto3
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.decorators import action
import uuid

# Create your views here.

# class VideoViewSet(viewsets.ModelViewSet):
#     queryset = Video.objects.all().order_by('video_id');
#     serializer_class = VideoSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('video_id')
    serializer_class = VideoSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        file = self.request.FILES.get('videoFile')

        if file:
            s3 = boto3.client('s3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME
            )

            # Genera un nombre único para el archivo
            filename = f"{uuid.uuid4()}_{file.name}"
            s3.upload_fileobj(
                file,
                settings.AWS_STORAGE_BUCKET_NAME,
                filename,
                ExtraArgs={'ContentType': file.content_type}
            )

            file_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{filename}"
            
            # Guardar el archivo temporalmente para calcular duración
            file.seek(0)  # vuelve al inicio del archivo
            with tempfile.NamedTemporaryFile(delete=True, suffix='.mp4') as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                temp_file.flush()

                clip = VideoFileClip(temp_file.name)
                duration = clip.duration  # en segundos (float)
            
            # Usa un usuario por defecto (por ejemplo el primero creado)
            default_user = User.objects.first()

            serializer.save(file_url=file_url, user=default_user, duration=duration)
        else:
            serializer.save(user=default_user)

    @action(detail=True, methods=['post'], url_path='add-view')
    def add_view(self, request, pk=None):
        video = self.get_object()
        if video.views is None:
            video.views = 1
        else:
            video.views += 1
        video.save()
        return Response({'status': 'view added', 'views': video.views}, status=status.HTTP_200_OK)