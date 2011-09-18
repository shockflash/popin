from popin.shortcuts import render_to_popin, redirect_popin
from django.shortcuts import render_to_response

def page2(request):
    return redirect_popin('/page1')