from collections.abc import Iterable
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.
#Created a model Event giving attributes as name,data, date ,time ,location,image ,is_liked,user_id

def getusername(id):
    return User.objects.get(id = id).username

def upload_to(instance,filename):
    return f"images/{filename}"
class Event(models.Model):
    name = models.CharField(max_length=25)
    data = models.TextField(verbose_name="About ",null=True,blank=True)
    date = models.DateField(null=True,blank=True)
    time = models.TimeField(null=True,blank=True)
    location = models.CharField(max_length=100,null=True,blank=True)
    image = models.ImageField(upload_to=upload_to,null=True,blank=True)
    is_liked = models.ManyToManyField(User,related_name="liked_events")
    user_id = models.IntegerField()

    def __str__(self):
        username = getusername(self.user_id)
        return f"{self.name} by {username} "

    # def save(self,*args,**kwargs):
    #     try:
    #         event,created = User.objects.get(id = self.user_id).events.get_or_create(self)
    #         return "event created %s"%created
    #     except User.DoesNotExist:
    #         return "User is No more"
    #     except Exception as e:
    #         return "Got Exception %e"%e
        

"""Here i am using user as a django user and i didn't create a custom model """
# class Account(models.Model):
#     user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="account")
#     events = models.ManyToManyField(Event,related_name="users")
# class LikedUsers(models.Model):
#     liked_events = models.ForeignKey(Event,on_delete=models.CASCADE,related_name="liked_users")
# class User(AbstractUser):
#     events = models.ManyToManyField(Event,related_name="users")
#     liked_events = models.ForeignKey(Event,related_name="liked_users",on_delete=models.CASCADE)