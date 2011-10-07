from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.views.generic.simple import direct_to_template
from popin.views import direct_popin_to_template
from popin.decorators import popin

from views import pageStandard, pageStandardRedirect

""" decorate a standard view that returns a httpresponse object to act as
    popin response """
pageStandardPopin = popin(pageStandard)
pageStandardRedirectPopin = popin(pageStandardRedirect)

urlpatterns = patterns('',
     (r'^$', direct_to_template, {'template': 'index.html'}),
     (r'^page1$', direct_popin_to_template, {'template': 'page1.html'}),
     url(r'^page2$', 'views.page2'),
     (r'^page3$', direct_popin_to_template, {'template': 'page3.html'}),
     (r'^page4$', direct_popin_to_template, {'template': 'page4.html'}),

     (r'^pageForm$', direct_popin_to_template, {'template': 'pageForm.html'}),
     (r'^pageFormDone$', 'views.pageFormDone'),

     (r'^pageStandard$', pageStandardPopin),
     (r'^pageStandardRedirect$', pageStandardRedirectPopin),

     (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.PROJECT_PATH + '/popin/static/'}),
)
