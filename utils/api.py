# -*- coding: utf-8 -*-

from tastypie.resources import ModelResource, Resource
from tastypie.authentication import Authentication, SessionAuthentication
from tastypie.authorization import ReadOnlyAuthorization, Authorization
from tastypie import fields

from django.contrib.auth.models import User

from .models import HasOwner
from .authorization import PerOwnerAuthorization


class BaseModelResource(ModelResource):

    class Meta:
        authentication = Authentication()
        authorization = ReadOnlyAuthorization()
        default_format = 'application/json'
        include_resource_uri = False
        include_absolute_url = False


class UserResource(BaseModelResource):
    
    class Meta(BaseModelResource.Meta):
        queryset = User.objects.all()
        resource_name = 'users'
        excludes = ['password', 'is_staff', 'is_superuser']
        authentication = SessionAuthentication()
        authorization = Authorization()


class HasOwnerResource(BaseModelResource):
    created_by = fields.ToOneField(UserResource, 'created_by', null=True, full=True)

    class Meta(BaseModelResource.Meta):
        authentication = SessionAuthentication()
        authorization = PerOwnerAuthorization()
