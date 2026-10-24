from rest_framework import serializers
from .models import DownloadItem

class DownloadItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DownloadItem
        fields = '__all__'
