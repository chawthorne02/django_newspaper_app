from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Article
from .serializers import ArticleSerializer, UserArticleSerializer
from .permissions import IsAuthorOrReadOnly
from django.db.models import Q # ( Q object encapsulates a SQL expression in a Python object that can be used in database-related operations. Using Q objects we can make complex queries with less and simple code.)

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




class AdminArticleListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    queryset = models.Article.objects.order_by('-created_at')
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return models.Article.objects.filter(Q(status='Published') | Q(status='Submitted') | Q(status='Archived'))

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  