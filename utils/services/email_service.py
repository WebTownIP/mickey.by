# -*- coding: utf-8 -*-

from django.template.loader import get_template
from django.template import Context
from django.core.mail import EmailMessage
from django.conf import settings

class EmailService:

    @staticmethod
    def send_email(template, subject, context, to):
        message = get_template(template).render(Context(context))
        email = EmailMessage(subject, message, to=to, from_email=settings.SEND_FROM)
        email.content_subtype = 'html'
        email.send()
