import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Serie

@csrf_exempt
def api_series(request):
    if request.method == "POST":
        dados = json.loads(request.body)

        titulo = dados.get("titulo")
        plataforma = dados.get("plataforma")
        ano = dados.get("ano")
        avaliacao = dados.get("avaliacao")

        if not 0 <= avaliacao <= 10:
            return JsonResponse({"erro": "A avaliação deve estar entre 0 e 10."})

        if not 1900 <= ano <= 2026:
            return JsonResponse({"erro": "O ano deve estar entre 1900 e 2026."})

        serie = Serie.objects.create(
            titulo=dados['titulo'],
            plataforma=dados['plataforma'],
            ano=dados['ano'],
            avaliacao=dados['avaliacao'],
        )
        return JsonResponse({'id': serie.id}, status=201)

    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)
