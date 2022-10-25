from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    author_image = serializers.ReadOnlyField(source='author.profile.avatar.url')
    
    class Meta:
        model = Article
        exclude = ('phase', 'author')


class UserArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    author_image = serializers.ReadOnlyField(source='author.profile.avatar.url')
    
    class Meta:
        model = Article
        exclude = ('author',)