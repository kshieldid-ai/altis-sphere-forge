"""
Veille technologique : agrège les flux RSS de médias IT francophones.

Les flux sont relus au plus une fois par heure (cache Django) ; le site
affiche donc des actualités à jour sans qu'on ait rien à publier.
Pour ajouter ou retirer une source, il suffit de modifier SOURCES.
"""
import html
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from xml.etree import ElementTree

from django.core.cache import cache

SOURCES = [
    {'name': 'Le Monde Informatique', 'category': 'Actualité IT',
     'url': 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml'},
    {'name': 'LeMagIT', 'category': 'Entreprise & cloud',
     'url': 'https://www.lemagit.fr/rss/ContentSyndication.xml'},
    {'name': 'Silicon.fr', 'category': 'Actualité IT',
     'url': 'https://www.silicon.fr/feed'},
    {'name': 'Journal du Net', 'category': 'Numérique',
     'url': 'https://www.journaldunet.com/rss/'},
    {'name': 'CERT-FR (ANSSI)', 'category': 'Cybersécurité',
     'url': 'https://www.cert.ssi.gouv.fr/feed/'},
]

CACHE_KEY = 'veille:articles'
# Dernière liste valide, servie si tous les flux tombent en même temps
LAST_GOOD_KEY = 'veille:articles:last-good'
CACHE_SECONDS = 60 * 60
RETRY_SECONDS = 5 * 60

REQUEST_TIMEOUT = 8
MAX_FEED_BYTES = 3 * 1024 * 1024
PER_SOURCE = 5
MAX_ARTICLES = 24
MAX_AGE = timedelta(days=30)
SUMMARY_LENGTH = 220

USER_AGENT = 'Mozilla/5.0 (compatible; AltisSphereVeille/1.0; +https://altisphere-group.com)'

_TAG_RE = re.compile(r'<[^>]+>')
_SPACE_RE = re.compile(r'\s+')
_SPACE_BEFORE_PUNCT_RE = re.compile(r'\s+([.,)])')
# Mention ajoutée en fin de résumé par WordPress
_WP_FOOTER_RE = re.compile(r"\s*(The post|L’article|L'article)\s.+?(appeared first on|est apparu en premier sur).*$", re.S)
_XML_DECL_RE = re.compile(rb'^\s*<\?xml[^>]*\?>')


def _local(tag):
    """Nom de balise sans espace de noms : '{http://...}date' -> 'date'."""
    return tag.rsplit('}', 1)[-1]


def _child(item, *names):
    for child in item:
        if _local(child.tag) in names:
            return child
    return None


def _text(item, *names):
    node = _child(item, *names)
    return (node.text or '').strip() if node is not None else ''


def _clean(raw):
    # Certains flux échappent deux fois le HTML (« &amp;eacute; »)
    text = html.unescape(html.unescape(raw or ''))
    text = _TAG_RE.sub(' ', text)
    text = _WP_FOOTER_RE.sub('', text)
    text = _SPACE_RE.sub(' ', text).strip()
    return _SPACE_BEFORE_PUNCT_RE.sub(lambda m: m.group(1), text)


def _truncate(text, length=SUMMARY_LENGTH):
    if len(text) <= length:
        return text
    cut = text[:length].rsplit(' ', 1)[0].rstrip(' ,;:.(')
    return f'{cut}…'


def _parse_date(value):
    if not value:
        return None
    try:
        date = parsedate_to_datetime(value)
    except (TypeError, ValueError):
        try:
            date = datetime.fromisoformat(value.replace('Z', '+00:00'))
        except ValueError:
            return None
    if date.tzinfo is None:
        date = date.replace(tzinfo=timezone.utc)
    return date.astimezone(timezone.utc)


def _link(item):
    node = _child(item, 'link')
    if node is None:
        return ''
    # Atom : <link href="..."/> ; RSS : <link>...</link>
    return (node.get('href') or node.text or '').strip()


def _parse_xml(payload):
    try:
        return ElementTree.fromstring(payload)
    except ElementTree.ParseError:
        # Encodage déclaré inconnu d'expat (ex. ISO-8859-15) : on décode nous-mêmes
        match = re.search(rb'encoding=["\']([\w.-]+)["\']', payload[:200])
        encoding = match.group(1).decode() if match else 'utf-8'
        text = _XML_DECL_RE.sub(b'', payload).decode(encoding, errors='replace')
        return ElementTree.fromstring(text)


def parse_feed(payload, source):
    """Transforme un flux RSS 2.0, RSS 1.0 (RDF) ou Atom en liste d'articles."""
    root = _parse_xml(payload)
    articles = []
    for item in root.iter():
        if _local(item.tag) not in ('item', 'entry'):
            continue
        title = _clean(_text(item, 'title'))
        link = _link(item)
        if not title or not link.startswith(('https://', 'http://')):
            continue
        published = _parse_date(_text(item, 'pubDate', 'date', 'published', 'updated'))
        summary = _clean(_text(item, 'description', 'summary', 'body', 'content'))
        articles.append({
            'title': title,
            'link': link,
            'summary': _truncate(summary),
            'source': source['name'],
            'category': source['category'],
            'published': published.isoformat() if published else None,
        })
    return articles


def _fetch(source):
    request = urllib.request.Request(source['url'], headers={'User-Agent': USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=REQUEST_TIMEOUT) as response:
            payload = response.read(MAX_FEED_BYTES)
        return parse_feed(payload, source)
    except Exception:
        # Une source en panne ne doit pas bloquer les autres
        return []


def collect_articles():
    """Lit toutes les sources en parallèle et garde les plus récentes."""
    with ThreadPoolExecutor(max_workers=len(SOURCES)) as pool:
        per_source = list(pool.map(_fetch, SOURCES))

    oldest = datetime.now(timezone.utc) - MAX_AGE
    articles, seen = [], set()
    for items in per_source:
        recent = [a for a in items if a['published'] and datetime.fromisoformat(a['published']) >= oldest]
        recent.sort(key=lambda a: a['published'], reverse=True)
        for article in recent[:PER_SOURCE]:
            if article['link'] not in seen:
                seen.add(article['link'])
                articles.append(article)

    articles.sort(key=lambda a: a['published'], reverse=True)
    return articles[:MAX_ARTICLES]


def get_articles():
    articles = cache.get(CACHE_KEY)
    if articles is not None:
        return articles

    articles = collect_articles()
    if articles:
        cache.set(CACHE_KEY, articles, CACHE_SECONDS)
        cache.set(LAST_GOOD_KEY, articles, None)
        return articles

    # Tous les flux en échec : on ressert la dernière liste et on réessaie bientôt
    fallback = cache.get(LAST_GOOD_KEY, [])
    cache.set(CACHE_KEY, fallback, RETRY_SECONDS)
    return fallback
