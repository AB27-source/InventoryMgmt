from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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
    SECTION_CHOICES = [
        ('snackshelf', 'Snack Shelf'),
        ('freezer', 'Freezer'),
        ('beverage', 'Beverage Cooler')
    ]
    section = models.CharField(max_length=10, choices=SECTION_CHOICES, null=True, blank=True)
    date = models.DateField(auto_now_add=True, verbose_name="Date")
    previous_day_end_count = models.PositiveIntegerField(verbose_name="Previous Day End Count")
    # inventory_sold = models.PositiveIntegerField(verbose_name="Inventory Sold")
    added_inventory = models.PositiveIntegerField(verbose_name="Added to Inventory")
    # transferred_inventory = models.PositiveIntegerField(verbose_name="Transferred Inventory")
    previous_day_sales = models.PositiveIntegerField(verbose_name="Previous Day Sales")
    end_count = models.PositiveIntegerField(verbose_name="End Count")
    book_count = models.PositiveIntegerField(verbose_name="Book Count", default=0)
    variance = models.IntegerField(verbose_name="Variance", default = 0)  # This can be negative, so using IntegerField

    def __str__(self):
        return f"Entry for {self.date}"

    class Meta:
        verbose_name = "Variance Calculator Entry"
        verbose_name_plural = "Variance Calculator Entries"
        ordering = ['-date']

# -------------------
# User Models

class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email