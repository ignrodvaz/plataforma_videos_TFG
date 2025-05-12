from django.contrib import admin
from .models import (
    Advertisement,
    Category,
    Comment,
    Playlist,
    PlaylistVideo,
    Reaction,
    Report,
    Subscription,
    User,
    Video,
    VideoCategory,
    WatchHistory
)

# Register your models here.
admin.site.register(Advertisement)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Playlist)
admin.site.register(PlaylistVideo)
admin.site.register(Reaction)
admin.site.register(Report)
admin.site.register(Subscription)
admin.site.register(User)
admin.site.register(Video)
admin.site.register(VideoCategory)
admin.site.register(WatchHistory)