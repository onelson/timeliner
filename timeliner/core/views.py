from django.shortcuts import render


def ng_app(request):
    return render(request, 'index.html')