# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(default=b'')),
                ('parent', models.ForeignKey(blank=True, to='market.Category', null=True)),
            ],
            options={
                'db_table': 'market_categories',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('status', models.CharField(default=b'new', max_length=50, choices=[(b'new', b'\xd0\x9d\xd0\xbe\xd0\xb2\xd1\x8b\xd0\xb9'), (b'in_process', b'\xd0\x92 \xd0\xbe\xd0\xb1\xd1\x80\xd0\xb0\xd0\xb1\xd0\xbe\xd1\x82\xd0\xba\xd0\xb5'), (b'completed', b'\xd0\x97\xd0\xb0\xd0\xb2\xd0\xb5\xd1\x80\xd1\x88\xd0\xb5\xd0\xbd')])),
                ('is_in_cart', models.BooleanField(default=True)),
                ('count', models.IntegerField(default=1)),
                ('created_by', models.ForeignKey(related_name='market_order_created', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'db_table': 'market_orders',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('name', models.CharField(max_length=255)),
                ('price', models.IntegerField()),
                ('description', models.TextField(blank=True)),
                ('image', models.ImageField(null=True, upload_to=b'products', blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_sale', models.BooleanField(default=False)),
                ('discount', models.IntegerField(default=0)),
                ('is_popular', models.BooleanField(default=False)),
                ('category', models.ForeignKey(to='market.Category')),
            ],
            options={
                'db_table': 'market_products',
            },
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('key', models.CharField(max_length=255)),
                ('value', models.CharField(max_length=255)),
                ('extension', models.CharField(max_length=255, blank=True)),
            ],
            options={
                'db_table': 'market_product_properties',
            },
        ),
        migrations.AddField(
            model_name='product',
            name='properties',
            field=models.ManyToManyField(to='market.Property'),
        ),
        migrations.AddField(
            model_name='order',
            name='product',
            field=models.ForeignKey(to='market.Product'),
        ),
    ]
