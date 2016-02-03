# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

from utils.models import HasTimeHistory


class UserProfile(HasTimeHistory):

    user = models.OneToOneField(User)
    phone_number = models.CharField(max_length=9, blank=True)

    class Meta:
        db_table = 'user_profile_table'

    def __str__(self):
        return self.user.username.encode('utf8')
