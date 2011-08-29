from popin.shortcuts import render_to_popin, redirect_popin
from django.shortcuts import render_to_response

def index(request):
    return render_to_response('index.html')

def page1(request):
    return render_to_popin('page1.html')

def page2(request):
    return redirect_popin('/page1')

def page3(request):
    return render_to_popin('page3.html')