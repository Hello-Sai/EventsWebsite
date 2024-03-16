from rest_framework import serializers
from events.models import Event
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =('username','password')

    def validate(self, data):
        data['password'] = make_password(data['password'])

        return data
    
class EventSerializer(serializers.ModelSerializer):
    '''Serializing data i.e: converting into json'''
    image = serializers.ImageField(required = False)
    user_id = serializers.IntegerField(required=False)
    class Meta:
        model = Event
        fields = '__all__'