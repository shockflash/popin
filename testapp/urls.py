from django.conf.urls.defaults import patterns, include, url
from django.conf import settings

urlpatterns = patterns('',
     url(r'^$', 'views.index'),
     url(r'^page1$', 'views.page1'),
     url(r'^page2$', 'views.page2'),
     url(r'^page3$', 'views.page3'),

    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.PROJECT_PATH + '/popin/static/'}),
)
