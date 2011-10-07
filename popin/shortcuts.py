import json
from django.views.decorators.csrf import csrf_protect
from django.template import loader, RequestContext
from django.http import HttpResponse, Http404

def render_to_popin(*args, **kwargs):
    """
    Returns a HttpResponse whose content is filled with the result of calling
    django.template.loader.render_to_string() with the passed arguments.
    """
    content = loader.render_to_string(*args, **kwargs)
    return HttpResponse(json.dumps({
            'action': 'show',
            'content': content,
        }), 'application/json')

def redirect_popin(url, *args, **kwargs):
    """
    Returns a HttpResponse that contains an json array that informs Popin
    to redirect to another url.

    Most of the time a standard HTTPRedirect repsonse will work fine, this is
    only an option.
    """
    return HttpResponse(json.dumps({
            'action': 'redirect',
            'content': url,
        }), 'application/json')