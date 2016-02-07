from django.contrib import admin

from .models import Category, Order, Product, Property


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
admin.site.register(Category, CategoryAdmin)


class PropertyAdmin(admin.ModelAdmin):
    search_fields = ['key']
    list_display = ['key', 'value']
admin.site.register(Property, PropertyAdmin)


class ProductAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['name', 'price']
admin.site.register(Product, ProductAdmin)


class OrderAdmin(admin.ModelAdmin):
    search_fields = ['id']
    list_display = ['id', 'product', 'count', 'is_in_cart']
admin.site.register(Order, OrderAdmin)   
