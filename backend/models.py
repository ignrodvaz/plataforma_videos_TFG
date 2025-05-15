# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class Advertisement(models.Model):
    advertisement_id = models.AutoField(db_column='ADVERTISEMENT_ID', primary_key=True)  # Field name made lowercase.
    video = models.ForeignKey('Video', models.DO_NOTHING, db_column='VIDEO_ID')  # Field name made lowercase.
    ad_url = models.CharField(db_column='AD_URL', max_length=255)  # Field name made lowercase.
    clicks = models.IntegerField(db_column='CLICKS', blank=True, null=True)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'ADVERTISEMENT'

    def __str__(self):
        return f"Advertisement {self.advertisement_id} for Video {self.video}"


class Category(models.Model):
    category_id = models.AutoField(db_column='CATEGORY_ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', unique=True, max_length=50)  # Field name made lowercase.

    class Meta:
        db_table = 'CATEGORY'

    def __str__(self):
        return self.name


class Comment(models.Model):
    comment_id = models.AutoField(db_column='COMMENT_ID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey('User', models.DO_NOTHING, db_column='USER_ID')  # Field name made lowercase.
    video = models.ForeignKey('Video', models.DO_NOTHING, db_column='VIDEO_ID')  # Field name made lowercase.
    content = models.TextField(db_column='CONTENT')  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'COMMENT'

    def __str__(self):
        return f"Comment {self.comment_id} by {self.user.username} on Video {self.video.title}"


class Playlist(models.Model):
    playlist_id = models.AutoField(db_column='PLAYLIST_ID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey('User', models.DO_NOTHING, db_column='USER_ID')  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=100)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'PLAYLIST'

    def __str__(self):
        return self.name


class PlaylistVideo(models.Model):
    playlist_video_id = models.AutoField(db_column='PLAYLIST_VIDEO_ID', primary_key=True)  # Field name made lowercase.
    playlist = models.ForeignKey(Playlist, models.DO_NOTHING, db_column='PLAYLIST_ID')  # Field name made lowercase.
    video = models.ForeignKey('Video', models.DO_NOTHING, db_column='VIDEO_ID')  # Field name made lowercase.

    class Meta:
        db_table = 'PLAYLIST_VIDEO'

    def __str__(self):
        return f"Video {self.video.title} in Playlist {self.playlist.name}"


class Reaction(models.Model):
    reaction_id = models.AutoField(db_column='REACTION_ID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey('User', models.DO_NOTHING, db_column='USER_ID')  # Field name made lowercase.
    video = models.ForeignKey('Video', models.DO_NOTHING, db_column='VIDEO_ID')  # Field name made lowercase.
    type = models.CharField(db_column='TYPE', max_length=20)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'REACTION'

    def __str__(self):
        return f"{self.type} by {self.user.username} on Video {self.video.title}"


class Report(models.Model):
    report_id = models.AutoField(db_column='REPORT_ID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey('User', models.DO_NOTHING, db_column='USER_ID')  # Field name made lowercase.
    video = models.ForeignKey('Video', models.DO_NOTHING, db_column='VIDEO_ID', blank=True, null=True)  # Field name made lowercase.
    comment = models.ForeignKey(Comment, models.DO_NOTHING, db_column='COMMENT_ID', blank=True, null=True)  # Field name made lowercase.
    reason = models.TextField(db_column='REASON')  # Field name made lowercase.
    status = models.CharField(db_column='STATUS', max_length=20, blank=True, null=True)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'REPORT'

    def __str__(self):
        return f"Report {self.report_id} by {self.user.username}"


class Subscription(models.Model):
    subscription_id = models.AutoField(db_column='SUBSCRIPTION_ID', primary_key=True)  # Field name made lowercase.
    subscriber = models.ForeignKey('User', models.DO_NOTHING, db_column='SUBSCRIBER_ID')  # Field name made lowercase.
    channel = models.ForeignKey('User', models.DO_NOTHING, db_column='CHANNEL_ID', related_name='subscription_channel_set')  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'SUBSCRIPTION'

    def __str__(self):
        return f"Subscription {self.subscription_id} from {self.subscriber.username} to {self.channel.username}"

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El email es obligatorio")
        if not username:
            raise ValueError("El username es obligatorio")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if not username:
            raise ValueError("El username es obligatorio para superuser")
        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    profile_picture = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    @property
    def id(self):
        return self.user_id

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = "USER"

# class User(models.Model):
#     user_id = models.AutoField(db_column='USER_ID', primary_key=True)  # Field name made lowercase.
#     username = models.CharField(db_column='USERNAME', unique=True, max_length=50)  # Field name made lowercase.
#     email = models.CharField(db_column='EMAIL', unique=True, max_length=100)  # Field name made lowercase.
#     password_hash = models.CharField(db_column='PASSWORD_HASH', max_length=255)  # Field name made lowercase.
#     profile_picture = models.CharField(db_column='PROFILE_PICTURE', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     is_active = models.BooleanField(db_column='IS_ACTIVE', blank=True, null=True)  # Field name made lowercase.
#     created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

#     class LegacyUser(models.Model):
#         class Meta:
#             managed = False
#             db_table = 'USER'

#     def __str__(self):
#         return self.username


class Video(models.Model):
    video_id = models.AutoField(db_column='VIDEO_ID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='USER_ID')  # Field name made lowercase.
    title = models.CharField(db_column='TITLE', max_length=255)  # Field name made lowercase.
    description = models.TextField(db_column='DESCRIPTION', blank=True, null=True)  # Field name made lowercase.
    file_url = models.CharField(db_column='FILE_URL', max_length=255)  # Field name made lowercase.
    thumbnail_url = models.CharField(db_column='THUMBNAIL_URL', max_length=255)  # Field name made lowercase.
    views = models.IntegerField(db_column='VIEWS', blank=True, null=True)  # Field name made lowercase.
    duration = models.FloatField(db_column='DURATION')  # Field name made lowercase.
    is_public = models.BooleanField(db_column='IS_PUBLIC', blank=True, null=True)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'VIDEO'

    def __str__(self):
        return self.title


class VideoCategory(models.Model):
    video_category_id = models.AutoField(db_column='VIDEO_CATEGORY_ID', primary_key=True)  # Field name made lowercase.
    video = models.ForeignKey(Video, models.DO_NOTHING, db_column='VIDEO_ID')  # Field name made lowercase.
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='CATEGORY_ID')  # Field name made lowercase.

    class Meta:
        db_table = 'VIDEO_CATEGORY'

    def __str__(self):
        return f"Video {self.video.title} in Category {self.category.name}"


class WatchHistory(models.Model):
    watch_history_id = models.AutoField(db_column='WATCH_HISTORY_ID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='USER_ID')  # Field name made lowercase.
    video = models.ForeignKey(Video, models.DO_NOTHING, db_column='VIDEO_ID')  # Field name made lowercase.
    watched_at = models.DateTimeField(db_column='WATCHED_AT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'WATCH_HISTORY'

    def __str__(self):
        return f"Watch History {self.watch_history_id} for Video {self.video.title} by {self.user.username}"
