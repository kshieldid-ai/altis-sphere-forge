from rest_framework import viewsets
from .models import DownloadItem
from .serializers import DownloadItemSerializer


class DownloadItemViewSet(viewsets.ReadOnlyModelViewSet):
    """Lecture seule : les éléments se gèrent depuis l'admin Django."""

    queryset = DownloadItem.objects.all().order_by('-created_at')
    serializer_class = DownloadItemSerializer
