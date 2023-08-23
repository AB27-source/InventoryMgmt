from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from inventory import views
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'beverages', views.BeverageView, 'beverages')
router.register(r'freezer', views.FrozenView, 'freezer')
router.register(r'snackshelf', views.SnackShelfView, 'snackshelf')
router.register(r'variancecalculator', views.VarianceCalculatorEntryView, 'variancecalculator')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]