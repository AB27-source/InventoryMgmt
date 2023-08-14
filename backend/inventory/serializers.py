from rest_framework import serializers
from .models import Beverage, Frozen, SnackShelf, VarianceCalculatorEntry

class BeverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beverage
        fields = '__all__'

class FrozenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Frozen
        fields = '__all__'

class SnackShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnackShelf
        fields = '__all__'

class VarianceCalculatorEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = VarianceCalculatorEntry
        fields = '__all__'