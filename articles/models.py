from telnetlib import STATUS
from django.db import models
from django.conf import settings

class Article(models.Model):

    UNASSIGNED = "Unassigned"
    SPORTS = "Sports"
    GAMING = "Gaming"
    ENTERTAINMENT = "Entertainment"
    TRAVEL = "Travel"
    
    DRAFTS = "Drafts"
    SUBMITTED = "Submitted"
    PUBLISHED = "Published"
    REJECTED = "Rejected"
    ARCHIVED = "Archived"

    PHASE_CHOICES = [
        (DRAFTS, "Drafts"),
        (SUBMITTED, "Submitted"),
        (PUBLISHED, "Published"),
        (REJECTED, "Rejected"),
        (ARCHIVED, "Archived"),
        (UNASSIGNED, "Unassigned"),
    ]

    CATEGORY_CHOICES = [
        (SPORTS, "Sports"),
        (GAMING, "Gaming"),
        (ENTERTAINMENT, "Entertainment"),
        (TRAVEL, "Travel"),
        (UNASSIGNED, "Unassigned"),
    ]


    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    image = models.ImageField(upload_to="articles", null=True)
    category = models.CharField(max_length=25, choices=CATEGORY_CHOICES, default=UNASSIGNED)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    phase = models.CharField(max_length=25, choices=PHASE_CHOICES, default=DRAFTS)
    is_highlighted = models.BooleanField(default=False)

    def __str__(self):
        return self.title