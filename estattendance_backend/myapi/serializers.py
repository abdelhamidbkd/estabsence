from rest_framework import serializers

from .models import Attendance

class AttendanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Attendance
        fields = ('id', 'name', 'date')