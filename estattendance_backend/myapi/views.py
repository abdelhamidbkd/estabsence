# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


from rest_framework import viewsets

from .serializers import AttendanceSerializer
from .models import Attendance


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all().order_by('name')
    serializer_class = AttendanceSerializer
# Create your views here.
