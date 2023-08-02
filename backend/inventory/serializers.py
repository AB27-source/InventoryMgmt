from rest_framework import serializers
from .models import Beverage, Frozen, SnackShelf

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