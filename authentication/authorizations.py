# -*- coding: utf-8 -*-

from tastypie.authorization import Authorization
from tastypie.exceptions import Unauthorized


class UserProfileAuthorization(Authorization):

    def get_user(self, bundle):
        return bundle.request.user

    def read_list(self, object_list, bundle):
        return []

    def read_detail(self, object_list, bundle):
        return bundle.obj.user == self.get_user(bundle)

    def create_list(self, object_list, bundle):
        return []

    def create_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no creates.")

    def update_list(self, object_list, bundle):
        return []

    def update_detail(self, object_list, bundle):
        return bundle.obj.user == self.get_user(bundle)

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")
