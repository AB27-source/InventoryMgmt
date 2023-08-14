from django.contrib import admin
from .models import Beverage, Frozen, SnackShelf, VarianceCalculatorEntry

# Register your models here.
class BeverageFrozenAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'is_available', 'updated_at')

class SnackShelfAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'is_available', 'updated_at', 'type')

class VarianceCalculatorEntryAdmin(admin.ModelAdmin):
    list_display = ('date', 'previous_day_end_count', 'inventory_sold', 'added_inventory', 'transferred_inventory', 'previous_day_sales', 'end_count', 'book_count', 'variance')

admin.site.register(Beverage, BeverageFrozenAdmin)
admin.site.register(Frozen, BeverageFrozenAdmin)
admin.site.register(SnackShelf, SnackShelfAdmin)
admin.site.register(VarianceCalculatorEntry, VarianceCalculatorEntryAdmin)