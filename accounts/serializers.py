from rest_framework import serializers
from . import models
from dj_rest_auth.models import TokenModel

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = models.Profile
        fields = '__all__'


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    id = serializers.ReadOnlyField(source='user.id')
    avatar = serializers.ImageField(source='user.profile.avatar')

    class Meta:
        model = TokenModel
        fields = ('key', 'is_superuser', 'id', 'avatar',)