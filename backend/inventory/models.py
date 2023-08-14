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

class VarianceCalculatorEntry(models.Model):
    date = models.DateField(auto_now_add=True, verbose_name="Date")
    previous_day_end_count = models.PositiveIntegerField(verbose_name="Previous Day End Count")
    inventory_sold = models.PositiveIntegerField(verbose_name="Inventory Sold")
    added_inventory = models.PositiveIntegerField(verbose_name="Added to Inventory")
    transferred_inventory = models.PositiveIntegerField(verbose_name="Transferred Inventory")
    previous_day_sales = models.PositiveIntegerField(verbose_name="Previous Day Sales")
    end_count = models.PositiveIntegerField(verbose_name="End Count")
    book_count = models.PositiveIntegerField(verbose_name="Book Count", default=0)
    variance = models.IntegerField(verbose_name="Variance", default = 0)  # This can be negative, so using IntegerField

    def save(self, *args, **kwargs):
        # Calculate book_count and variance before saving
        self.book_count = self.previous_day_end_count + self.added_inventory - self.inventory_sold - self.transferred_inventory - self.previous_day_sales
        self.variance = self.end_count - self.book_count
        super(VarianceCalculatorEntry, self).save(*args, **kwargs)

    def __str__(self):
        return f"Entry for {self.date}"

    class Meta:
        verbose_name = "Variance Calculator Entry"
        verbose_name_plural = "Variance Calculator Entries"
        ordering = ['-date']
