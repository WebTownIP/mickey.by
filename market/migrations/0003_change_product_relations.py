# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_auto_20160126_1701'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='category',
        ),
        migrations.AddField(
            model_name='product',
            name='categories',
            field=models.ManyToManyField(to='market.Category'),
        ),
        migrations.AlterField(
            model_name='product',
            name='properties',
            field=models.ManyToManyField(to='market.Property', blank=True),
        ),
    ]
