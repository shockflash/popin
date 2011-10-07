from django.template import RequestContext
from django.views.decorators.csrf import csrf_protect
from popin.shortcuts import render_to_popin, redirect_popin


@csrf_protect
def direct_popin_to_template(request, template = 'page1.html'):
    return render_to_popin(template, context_instance=RequestContext(request))