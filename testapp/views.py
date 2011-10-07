import json
from popin.shortcuts import render_to_popin, redirect_popin
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect

def page2(request):
    return redirect_popin('/page1')

def pageStandard(request):
    return HttpResponse('Standard HttpResponse response<br>Works')

def pageStandardRedirect(request):
    return HttpResponseRedirect('/page1')

def pageFormDone(request):
        return render_to_popin('pageFormDone.html', request.REQUEST);