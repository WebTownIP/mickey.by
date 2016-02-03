# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User


class BaseModel(models.Model):

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self._meta.abstract:
            self.full_clean()
        super(BaseModel, self).save(*args, **kwargs)


class HasTimeHistory(BaseModel):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class HasOwner(HasTimeHistory):

    created_by = models.ForeignKey(
        User, blank=True, null=True, related_name="%(app_label)s_%(class)s_created")

    class Meta:
        abstract = True
