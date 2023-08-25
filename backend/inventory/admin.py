from django.contrib import admin
from .models import Beverage, Frozen, SnackShelf, VarianceCalculatorEntry, UserAccount

# Register your models here.
class BeverageFrozenAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'is_available', 'updated_at')

class SnackShelfAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'is_available', 'updated_at', 'type')

class VarianceCalculatorEntryAdmin(admin.ModelAdmin):
    list_display = ('date', 'previous_day_end_count', 'added_inventory', 'previous_day_sales', 'end_count', 'book_count', 'variance')

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'is_active', 'is_staff', 'is_superuser']
    search_fields = ['email', 'name']
    list_filter = ['is_active', 'is_staff', 'is_superuser']

admin.site.register(Beverage, BeverageFrozenAdmin)
admin.site.register(Frozen, BeverageFrozenAdmin)
admin.site.register(SnackShelf, SnackShelfAdmin)
admin.site.register(VarianceCalculatorEntry, VarianceCalculatorEntryAdmin)
admin.site.register(UserAccount, UserAccountAdmin)