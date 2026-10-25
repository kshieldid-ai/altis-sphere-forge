from django.db import models

class DownloadItem(models.Model):
    CATEGORY_CHOICES = [
        ('Desktop Drivers', 'Desktop Drivers'),
        ('Android Apps', 'Android Apps'),
        ('PDFs', 'PDFs'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='downloads/images/')
    download_link = models.URLField()
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
