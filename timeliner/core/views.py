from django.conf import settings
from django.shortcuts import render


def ng_app(request):
    return render(request, 'base.html', {'DEBUG': settings.DEBUG})