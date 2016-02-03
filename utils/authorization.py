# -*- coding: utf-8 -*-

from tastypie.authorization import Authorization
from tastypie.exceptions import Unauthorized


class PerOwnerAuthorization(Authorization):

    def get_user(self, bundle):
        return bundle.request.user

    def read_list(self, object_list, bundle):
        return object_list.filter(created_by=self.get_user(bundle))

    def read_detail(self, object_list, bundle):
        return bundle.obj.created_by == self.get_user(bundle)

    def create_list(self, object_list, bundle):
        return object_list

    def create_detail(self, object_list, bundle):
        bundle.obj.created_by = self.get_user(bundle)
        return True

    def update_list(self, object_list, bundle):
        allowed = []

        for obj in object_list:
            if obj.user == self.get_user(bundle):
                allowed.append(obj)

        return allowed

    def update_detail(self, object_list, bundle):
        return bundle.obj.created_by == self.get_user(bundle)

    def delete_detail(self, object_list, bundle):
        return bundle.obj.created_by == self.get_user(bundle)
