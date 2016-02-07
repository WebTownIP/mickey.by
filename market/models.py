# -*- coding: utf-8 -*-

from django.db import models

from utils.models import BaseModel, HasOwner, HasTimeHistory


class Category(BaseModel):
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(default='')

    class Meta:
        app_label = 'market'
        db_table = 'market_categories'

    def __str__(self):
        return self.name.encode('utf8')


class Property(BaseModel):
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    extension = models.CharField(max_length=255, blank=True)

    class Meta:
        app_label = 'market'
        db_table = 'market_product_properties'

    def __str__(self):
        return '%s - %s%s' % (
            self.key.encode('utf8'), self.value.encode('utf8'), self.extension.encode('utf8'))


class Product(HasTimeHistory):
    name = models.CharField(max_length=255)
    categories = models.ManyToManyField(Category)
    properties = models.ManyToManyField(Property, blank=True)
    price = models.IntegerField()
    description = models.TextField(blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='products')
    is_active = models.BooleanField(default=True)
    is_sale = models.BooleanField(default=False)
    discount = models.IntegerField(default=0)
    is_popular = models.BooleanField(default=False)

    class Meta:
        app_label = 'market'
        db_table = 'market_products'

    def __str__(self):
        return self.name.encode('utf8')


class Order(HasOwner):
    STATUSES = (
        ('new', 'Новый'),
        ('in_process', 'В обработке'),
        ('completed', 'Завершен')
    )

    product = models.ForeignKey(Product)
    status = models.CharField(
        max_length=50, choices=STATUSES, default='new')
    is_in_cart = models.BooleanField(default=True)
    count = models.IntegerField(default=1)

    class Meta:
        app_label = 'market'
        db_table = 'market_orders'

    def __str__(self):
        return '%s - %s' % (
            self.product.name.encode('utf8'), self.count)
