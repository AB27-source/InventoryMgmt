from django.db import models

# Create your models here.
class Beverage(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_available = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Frozen(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_available = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class SnackShelf(models.Model):
    CHOICES = [
        ('snack','Snack'),
        ('candy','Candy'),
        ('sundry','Sundry'),
        ('warmfood', 'Warmfood')
    ]
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_available = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.CharField(max_length=100, choices=CHOICES)

    def __str__(self):
        return self.name

