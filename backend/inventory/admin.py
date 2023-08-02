from django.contrib import admin
from .models import Beverage, Frozen, SnackShelf

# Register your models here.
class BeverageFrozenAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'is_available', 'updated_at')

class SnackShelfAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'is_available', 'updated_at', 'type')

admin.site.register(Beverage, BeverageFrozenAdmin)
admin.site.register(Frozen, BeverageFrozenAdmin)
admin.site.register(SnackShelf, SnackShelfAdmin)