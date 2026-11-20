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

        if not titulo or not plataforma or ano is None or avaliacao is None:
            return JsonResponse({"erro": "Preencha todos os campos."}, status=400)

        if not 0 <= avaliacao <= 10:
            return JsonResponse({"erro": "A avaliação deve estar entre 0 e 10."}, status=400)

        if not 1900 <= ano <= 2026:
            return JsonResponse({"erro": "O ano deve estar entre 1900 e 2026."}, status=400)

        serie = Serie.objects.create(
            titulo=dados['titulo'],
            plataforma=dados['plataforma'],
            ano=dados['ano'],
            avaliacao=dados['avaliacao'],
        )
        return JsonResponse({'id': serie.id}, status=201)

    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)

def api_resumo(request):
    series = Serie.objects.all()

    total = len(series)

    total_avaliacao = 0
    melhor = None
    maior_avaliacao = -1

    for serie in series:
        total_avaliacao += serie.avaliacao

        if serie.avaliacao > maior_avaliacao:
            maior_avaliacao = serie.avaliacao
            melhor = serie.titulo

        if total > 0:
            media = round(total_avaliacao / total, 2)
        else:
            media = 0.00

        return JsonResponse({
            "total": total,
            "media_avaliacao": media,
            "melhor": melhor
        })
