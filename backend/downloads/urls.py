from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DownloadItemViewSet

router = DefaultRouter()
router.register(r'items', DownloadItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
