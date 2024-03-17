from rest_framework import serializers
from events.models import Event
from django.contrib.auth.hashers import make_password
# from events.models import User
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
    is_liked = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all(), required=False)
    class Meta:
        model = Event
        fields = '__all__'

    # def save(self, **kwargs):
    #     super().save(**kwargs)
    #     user = User.objects.get(user_id = self.instance.user_id)
    #     user.events.create(self.instance)
    #     return