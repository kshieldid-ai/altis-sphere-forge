from rest_framework.response import Response
from rest_framework.views import APIView

from .feeds import get_articles


class TendancesView(APIView):
    """Dernières actualités IT agrégées depuis les flux RSS (lecture seule)."""

    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return Response({'articles': get_articles()})
