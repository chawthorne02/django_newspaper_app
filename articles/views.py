from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAuthorOrReadOnly

from articles import models
from . import models
from .permissions import IsAuthorOrReadOnly


class ArticleListAPIView(generics.ListCreateAPIView):  #GET request for all
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView): #  GET request for a specific object
    permission_classes = (IsAuthorOrReadOnly)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # Retrieve is a get request
    # Update is a put request
    # Destroy is a delete request