from django.contrib import admin
from django.urls import path

from series.views import api_series, api_resumo

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/series/', api_series),
    path('api/series/resumo/', api_resumo),
]
