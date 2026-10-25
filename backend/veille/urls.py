from django.urls import path
from .views import TendancesView

urlpatterns = [
    path('', TendancesView.as_view(), name='veille-tendances'),
]
