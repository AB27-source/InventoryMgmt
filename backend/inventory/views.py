from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from .serializers import BeverageSerializer, FrozenSerializer, SnackShelfSerializer, VarianceCalculatorEntrySerializer
from .models import Beverage, Frozen, SnackShelf, VarianceCalculatorEntry

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

class VarianceCalculatorEntryView(viewsets.ModelViewSet):
    serializer_class = VarianceCalculatorEntrySerializer
    queryset = VarianceCalculatorEntry.objects.all()

# @api_view(['POST'])
# def create_variance_entry(request):
#     serializer = VarianceCalculatorEntrySerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)