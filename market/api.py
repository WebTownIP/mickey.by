# -*- coding: utf-8 -*-

from tastypie import fields
from tastypie.http import HttpUnauthorized, HttpBadRequest
from tastypie.resources import ALL_WITH_RELATIONS, ALL

from django.conf.urls import url
from django.conf import settings

from .models import Category, Order, Product, Property
from authentication.models import UserProfile
from utils.api import BaseModelResource, HasOwnerResource
from utils.services.email_service import EmailService

import json


class CategoryResource(BaseModelResource):

    class Meta(BaseModelResource.Meta):
        queryset = Category.objects.filter(parent=None)
        resource_name = 'market/categories'
        filtering = {
            'id': ['in', 'exact'],
        }

    def dehydrate(self, bundle):
        bundle.data['subcategories'] = list(
            Category.objects.filter(parent=bundle.obj.id).values())
        return bundle


class PropertyResource(BaseModelResource):

    class Meta(BaseModelResource.Meta):
        queryset = Property.objects.all()
        resource_name = 'market/properties'


class ProductResource(BaseModelResource):
    categories = fields.ToManyField(
        CategoryResource, 'categories', use_in='details', full=True)
    properties = fields.ToManyField(
        PropertyResource, 'properties', full=True, use_in='details')
    is_in_cart = fields.BooleanField(readonly=True, use_in='details')

    class Meta(BaseModelResource.Meta):
        queryset = Product.objects.all().prefetch_related(
            'categories', 'properties').distinct()
        resource_name = 'market/products'
        filtering = {
            'is_popular': ['exact', ],
            'categories': ALL_WITH_RELATIONS,
            'price': ['lte', 'gte'],
        }

    def dehydrate_is_in_cart(self, bundle):
        if not bundle.request.user.is_anonymous():
            return len(Order.objects.filter(product=bundle.obj,
                created_by=bundle.request.user, is_in_cart=True)) != 0
        else:
            return False


class OrderResource(HasOwnerResource):
    product = fields.ToOneField(
        ProductResource, 'product', full=True)

    class Meta(HasOwnerResource.Meta):
        queryset = Order.objects.all()
        resource_name = 'market/orders'
        filtering = {
            'is_in_cart': ['exact', ]
        }

    def prepend_urls(self):
        return [
            url(r'^%s/purchase/$' % self._meta.resource_name,
                self.wrap_view('purchase'), name='api_purchase'),
        ]

    def purchase(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        data = json.loads(request.body)
        try:
            address = data.get('address')
            date = data.get('date')
            time = data.get('time')
        except KeyError:
            return self.create_response(request, {}, HttpBadRequest)
        user = request.user
        profile = UserProfile.objects.get(user=user)
        if user.is_authenticated():
            orders_in_cart = Order.objects.filter(
                created_by=user, is_in_cart=True)
            context = {
                'products': [],
                'total_price': 0,
                'user': {
                    'name': '%s %s' % (user.first_name, user.last_name),
                    'phone': profile.phone_number,
                    'address': address,
                    'date': date,
                    'time': time
                }
            }
            for order in orders_in_cart:
                product = {
                    'id': order.product.id,
                    'name': order.product.name,
                    'count': order.count,
                    'price': order.count * (order.product.price - order.product.discount)
                }
                context['products'].append(product)
                context['total_price'] += product['price']
            subject = '[Mickey] Новый Заказ'
            EmailService.send_email('order.email.html', subject,
                context, settings.SEND_TO)
            orders_in_cart.update(is_in_cart=False)
            return self.create_response(request, {})
        else:
            return self.create_response(request, {}, HttpUnauthorized)