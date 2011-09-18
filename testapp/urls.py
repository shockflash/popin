from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.views.generic.simple import direct_to_template
from popin.views import direct_popin_to_template

urlpatterns = patterns('',
     (r'^$', direct_to_template, {'template': 'index.html'}),
     (r'^page1$', direct_popin_to_template, {'template': 'page1.html'}),
     url(r'^page2$', 'views.page2'),
     (r'^page3$', direct_popin_to_template, {'template': 'page3.html'}),
     (r'^page4$', direct_popin_to_template, {'template': 'page4.html'}),

    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.PROJECT_PATH + '/popin/static/'}),
)
