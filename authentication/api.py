# -*- coding: utf-8 -*-

from tastypie.resources import Resource
from tastypie import fields
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.http import (
    HttpNotFound,
    HttpUnauthorized,
    HttpBadRequest
)

from django.contrib.auth.models import User
from django.contrib import auth
from django.conf.urls import url
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.conf import settings

from authentication.models import UserProfile
from utils.api import BaseModelResource, UserResource
from utils.services.email_service import EmailService
from .authorizations import UserProfileAuthorization

import json


class UserProfileResource(BaseModelResource):
    user = fields.ToOneField(UserResource, 'user', null=True, full=True)

    class Meta(BaseModelResource.Meta):
        queryset = UserProfile.objects.all()
        authentication = SessionAuthentication()
        authorization = UserProfileAuthorization()
        resource_name = 'user_profiles'

    def prepend_urls(self):
        return [
            url(r'^%s/change_password/$' % self._meta.resource_name,
                self.wrap_view('change_password'), name='api_change_password'),
        ]

    def change_password(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        user = request.user
        if user.is_anonymous():
            return self.create_response(request, {}, HttpUnauthorized)
        data = json.loads(request.body)
        try:
            old_password = data.get('old_password')
            new_password = data.get('new_password')
            confirm_password = data.get('confirm_password')
        except KeyError:
            return self.create_response(request, {}, HttpBadRequest)
        if not user.check_password(old_password) or new_password != confirm_password:
            return self.create_response(request, {}, HttpBadRequest)
        user.set_password(new_password)
        user.save()
        user = auth.authenticate(username=user.username, password=new_password)
        auth.login(request, user)
        return self.create_response(request, {})


class LoginResource(Resource):

    class Meta:
        resource_name = 'auth'

    def prepend_urls(self):
        return [
            url(r'^%s/login/$' % self._meta.resource_name,
                self.wrap_view('login'), name='api_login'),
            url(r'^%s/logout/$' % self._meta.resource_name,
                self.wrap_view('logout'), name='api_logout'),
            url(r'^%s/session/$' % self._meta.resource_name,
                self.wrap_view('session'), name='api_session'),
            url(r'^%s/registration/$' % self._meta.resource_name,
                self.wrap_view('registration'), name='api_registration'),
            url(r'^%s/reset_password/$' % self._meta.resource_name,
                self.wrap_view('reset_password'), name='api_reset_password')
        ]

    def login(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        data = json.loads(request.body)
        try:
            email = data.get('email')
            password = data.get('password')
        except KeyError:
            return self.create_response(request, {}, HttpBadRequest)
        user = auth.authenticate(username=email, password=password)

        if user is not None:
            if user.is_active:
                auth.login(request, user)
                user = {
                    'id': user.userprofile.id,
                    'username': user.username
                }
                return self.create_response(request, {'user': user})
            else:
                return self.create_response(request, {}, HttpBadRequest)
        else:
            return self.create_response(request, {}, HttpUnauthorized)

    def logout(self, request, **kwargs):
        self.method_check(request, allowed=['get'])
        auth.logout(request)
        return self.create_response(request, {})

    def session(self, request, **kwargs):
        self.method_check(request, allowed=['get'])
        user = request.user

        if user.is_authenticated():
            user = {
              'id': user.userprofile.id,
              'username': user.username
            }
            return self.create_response(request, {'user': user})
        else:
            return self.create_response(request, {}, HttpUnauthorized)

    def registration(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        data = json.loads(request.body)
        try:
            email = data.get('email')
            password = data.get('password')
            confirm_password = data.get('confirm_password')
            phone_number = data.get('phone_number')
        except KeyError:
            return self.create_response(request, {}, HttpBadRequest)
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        try:
            User.objects.get(username=email)
            return self.create_response(request, {}, HttpBadRequest)
        except ObjectDoesNotExist:
            if password == confirm_password:
                user = User.objects.create_user(email, email, password,
                    first_name=first_name, last_name=last_name)
                user.save()
                user_profile = UserProfile(user=user, phone_number=phone_number)
                try:
                    user_profile.save()
                except:
                    user.delete()
                    return self.create_response(request, {}, HttpBadRequest)
                return self.create_response(request, {})
            else:
                return self.create_response(request, {}, HttpBadRequest)

    def reset_password(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        data = json.loads(request.body)
        try:
            email = data.get('email')
        except KeyError:
            return self.create_response(request, {}, HttpBadRequest)
        try:
            user = User.objects.get(username=email)
        except ObjectDoesNotExist:
            return self.create_response(request, {}, HttpBadRequest)
        new_password = User.objects.make_random_password()
        user.set_password(new_password)
        user.save()
        context = {
            'name': '%s %s' % (user.first_name, user.last_name),
            'password': new_password
        }
        subject = '[mickey.by] Сброс пароля.'
        EmailService.send_email('reset_password.email.html', subject,
            context, [user.email, ])
        return self.create_response(request, {})
