from django.test import TestCase
from rest_framework.test import APIClient

from .models import DownloadItem


class DownloadItemApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        DownloadItem.objects.create(
            name='Pilote test',
            image='downloads/images/test.webp',
            download_link='https://example.org/pilote',
            category='Desktop Drivers',
        )

    def test_liste_publique(self):
        response = self.client.get('/api/downloads/items/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['name'], 'Pilote test')
        # URL d'image absolue, exploitable directement par le front
        self.assertTrue(response.json()[0]['image'].startswith('http'))

    def test_ecriture_refusee(self):
        payload = {'name': 'x', 'download_link': 'https://example.org', 'category': 'Other'}
        self.assertEqual(self.client.post('/api/downloads/items/', payload).status_code, 405)
        self.assertEqual(self.client.delete('/api/downloads/items/1/').status_code, 405)
