import json
from django.http import HttpResponse

def popin(the_func):
    """
    Transforms a normal output to a special popin result.
    """

    def _decorated(*args, **kwargs):
        response = the_func(*args, **kwargs)

        content = response.content

        response['Content-Type'] = 'application/json';
        response.content = json.dumps({
                'action': 'show',
                'content': content,
            })
        return response

    return _decorated