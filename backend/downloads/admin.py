from django.contrib import admin
from .models import DownloadItem

@admin.register(DownloadItem)
class DownloadItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')
