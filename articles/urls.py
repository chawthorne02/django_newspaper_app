from django.urls import path

from . import views

app_name = 'articles'

urlpatterns = [
    # path('articles/admin/', views.AdminArticleListAPIView.as_view(), name='admin_article_list'),
    path('articles/user/', views.UserArticleListCreateAPIView.as_view(), name='user_article_list'),
    path('articles/', views.ArticleListAPIView.as_view(), name='article_list'),
    path('articles/<int:pk>/', views.ArticleDetailAPIView.as_view(), name='article_detail'),
]