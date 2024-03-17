from django.http import HttpResponse
from django.shortcuts import redirect, render
from rest_framework.response import Response
from rest_framework.decorators import api_view,APIView
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser,MultiPartParser
from rest_framework.authentication import authenticate,SessionAuthentication
from django.contrib.auth import login,logout
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
# from rest_framework.views import APIView
# Create your views here.
from rest_framework import permissions
from .models import Event
from .serializers import EventSerializer, UserSerializer
# class EventsAPI(APIView):
#     '''Getting From React request'''
#     def get(self,request):
#         if request.user.is_authenticated:
#             event = EventSerializer(Event.objects.filter(user_id =request.user.id),many=True)
#         else:
#             event = EventSerializer(Event.objects.all(),many=True)
#         return Response({'events':event.data,'is_authenticated':request.user.is_authenticated})
#     # @login_required(login_url="login")
#     def post(self,request):
#         #Creating from the POST request from react and adding it to Database
#         # if i                   data = 0
#         print(request.data)
#         if request.user.is_authenticated:
#             serializer = EventSerializer(data = {**request.data,'user_id':request.user.id})
#             # serializer.initial_data["user_id"] =request.user.id# runtime providing userid for creating serializer
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response("created Successfully",status=200)
#             return Response("Error occurred %s"%serializer.errors,status=400)
        # return Response("<h1> You are not Authorized </h1>",status=401)
class EventsAPI(ModelViewSet):
    queryset = Event.objects.all().order_by('-date')
    serializer_class = EventSerializer
    parser_classes = [MultiPartParser,JSONParser]

    # def create(self, request, *args, **kwargs):
    #     date = request.data.pop('date')
    #     print(date,date[0])
    #     print(request.user.events.all())
    #     request.user.events.create(**request.data,date=str(date[0]))
    #     print(request.user.events.all())
    #     return Response("Created Successfully")
    def perform_create(self, serializer):
        try:
            # print(self.request.user.id)
            serializer = serializer.save(user_id = self.request.user.id)
            # print(serializer.data)
        except Exception as e:
            print(e)
            return Response({'error':e},status=400)
        return Response("successfully Created")

    def partial_update(self, request, *args, **kwargs):
        # print("data is",request.data)
        id = request.data["id"]
        try:
            event = self.get_queryset().get(id = id)
            event.is_liked = request.data["is_liked"]
            event.save()
        except Event.DoesNotExist:
            return Response({"error":"Invalid id"},status=400)
        return Response(self.serializer_class(event).data)
class LoginAPI(APIView):
    authentication_classes = (SessionAuthentication,)
    def post(self,request):
        # print(request.data)
        user = authenticate(**request.data)
        if not user:
            return Response("Invalid Username / Password",status=400)
        login(request,user)
        
        # return Response("\nYour username is %s\nYour password is %s"%(username,password))
        response =  Response("Logged In Successfully")
        response.set_cookie('id',user.id)
        return response
    
class LogoutAPI(APIView):
    def get(self,request):
        logout(request)
        print(request.data,request.session,request)
        response =  Response("Successfully Logged Out\n %s"%request.session)
        response.delete_cookie('id')
        return response
        
    
class UserAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self,request):
        # print(request.user.username,request.user.password,request.user.id)
        serializer = UserSerializer(request.user)
        # print(serializer.data)
        return Response(serializer.data)
        

class RegisterAPI(APIView):
    def post(self,request):
        serializer  = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.instance)
            login(request,serializer.instance)
            # return Response("\nYour username is %s\nYour password is %s"%(username,password))
            return Response("Registered Successfully",status=202)
        return Response(serializer.errors,status=400)
    
class LikedEventsAPI(APIView):
    def get(self,request):
        liked_events = request.user.liked_events.all()
        # liked_events = liked_events.user_id.filter(id = request.user.id)
            # data = {'events':EventSerializer(liked_events,many=True).data}
            # print(liked_events,data)
            # return Response(data)
        # print(liked_events)
        return Response({'events':EventSerializer(liked_events,many=True).data})
    def post(self,request):
        print("data = ",request.data)
        try:
            event_id = request.data.get('id')
            is_liked = request.data.get('is_liked')
            event_obj = Event.objects.get(id = event_id)
            if is_liked:
                event_obj.is_liked.add(request.user)
                # print("add executed")
            else:
                # print(request.user)
                event_obj.is_liked.remove(request.user)
                # print("remove executed")
        except Exception as e:
            print("Error",e)
            return Response({'error':e},status=400)
        return Response("Successfully Executed")