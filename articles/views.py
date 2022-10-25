from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Article
from .serializers import ArticleSerializer, UserArticleSerializer
from .permissions import IsAuthorOrReadOnly

from articles import models
from . import models
from .permissions import IsAuthorOrReadOnly


class ArticleListAPIView(generics.ListAPIView):  #GET request for all published articles
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Article.objects.filter(phase="Published")
    serializer_class = ArticleSerializer


class UserArticleListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = UserArticleSerializer

    def get_queryset(self):
        return models.Article.objects.filter(author=self.request.user)

    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveAPIView): #  GET request for a specific object
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # Retrieve is a get request
    # Update is a put request
    # Destroy is a delete request