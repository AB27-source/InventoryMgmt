from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from inventory import views

router = routers.DefaultRouter()
router.register(r'bevarages', views.BeverageView, 'bevarages')
router.register(r'freezer', views.FrozenView, 'freezer')
router.register(r'snackshelf', views.SnackShelfView, 'snackshelf')
router.register(r'variancecalculator', views.VarianceCalculatorEntryView, 'variancecalculator')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('variance-entry/', views.create_variance_entry, name='create_variance_entry'),
]