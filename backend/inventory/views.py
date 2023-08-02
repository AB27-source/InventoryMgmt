from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BeverageSerializer, FrozenSerializer, SnackShelfSerializer
from .models import Beverage, Frozen, SnackShelf

# Create your views here.
class BeverageView(viewsets.ModelViewSet):
    serializer_class = BeverageSerializer
    queryset = Beverage.objects.all()

class FrozenView(viewsets.ModelViewSet):
    serializer_class = FrozenSerializer
    queryset = Frozen.objects.all()

class SnackShelfView(viewsets.ModelViewSet):
    serializer_class = SnackShelfSerializer
    queryset = SnackShelf.objects.all()
