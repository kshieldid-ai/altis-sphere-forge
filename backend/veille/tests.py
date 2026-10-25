from datetime import datetime, timedelta, timezone
from unittest import mock

from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from . import feeds

SOURCE = {'name': 'Source test', 'category': 'Test', 'url': 'https://example.org/feed'}


def _rss(date):
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <item>
    <title>Nouvelle faille &amp; correctif</title>
    <link>https://example.org/article</link>
    <description><![CDATA[<p>Un r&eacute;sum&eacute; <b>court</b>.</p><p>The post <a href="#">x</a> appeared first on Test.</p>]]></description>
    <pubDate>{date}</pubDate>
  </item>
  <item><title>Lien dangereux</title><link>javascript:alert(1)</link></item>
</channel></rss>""".encode()


RDF_LATIN = """<?xml version="1.0" encoding="ISO-8859-15"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns="http://purl.org/rss/1.0/">
  <item rdf:about="https://example.org/rdf">
    <title>Réseau d'entreprise</title>
    <description>Au-del&amp;agrave; du cloud (...)</description>
    <link>https://example.org/rdf</link>
    <dc:date>2026-10-23T17:36:04</dc:date>
  </item>
</rdf:RDF>""".encode('iso-8859-15')


class ParseFeedTests(TestCase):
    def test_rss_nettoye_et_liens_filtres(self):
        articles = feeds.parse_feed(_rss('Fri, 23 Oct 2026 15:34:30 +0000'), SOURCE)
        self.assertEqual(len(articles), 1)
        article = articles[0]
        self.assertEqual(article['title'], 'Nouvelle faille & correctif')
        self.assertEqual(article['summary'], 'Un résumé court.')
        self.assertEqual(article['published'], '2026-10-23T15:34:30+00:00')
        self.assertEqual(article['source'], 'Source test')

    def test_rdf_iso_8859_15_double_echappe(self):
        article = feeds.parse_feed(RDF_LATIN, SOURCE)[0]
        self.assertEqual(article['title'], "Réseau d'entreprise")
        self.assertEqual(article['summary'], 'Au-delà du cloud (...)')
        self.assertEqual(article['published'], '2026-10-23T17:36:04+00:00')


class TendancesApiTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    def _fake_fetch(self, source):
        recent = (datetime.now(timezone.utc) - timedelta(days=1)).strftime('%a, %d %b %Y %H:%M:%S +0000')
        return feeds.parse_feed(_rss(recent), SOURCE)

    def test_liste_publique_et_cache(self):
        with mock.patch.object(feeds, 'SOURCES', [SOURCE]), \
             mock.patch.object(feeds, '_fetch', side_effect=self._fake_fetch) as fetch:
            first = self.client.get('/api/veille/')
            self.client.get('/api/veille/')
        self.assertEqual(first.status_code, 200)
        self.assertEqual(first.json()['articles'][0]['link'], 'https://example.org/article')
        self.assertEqual(fetch.call_count, 1)  # second appel servi par le cache

    def test_articles_trop_anciens_ecartes(self):
        old = _rss('Mon, 05 Jan 2015 10:00:00 +0000')
        with mock.patch.object(feeds, 'SOURCES', [SOURCE]), \
             mock.patch.object(feeds, '_fetch', return_value=feeds.parse_feed(old, SOURCE)):
            self.assertEqual(self.client.get('/api/veille/').json()['articles'], [])

    def test_ecriture_refusee(self):
        self.assertEqual(self.client.post('/api/veille/', {}).status_code, 405)
