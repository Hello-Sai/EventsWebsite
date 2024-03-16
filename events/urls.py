from django.urls import include, path
from rest_framework.routers import DefaultRouter
from events import views
router = DefaultRouter()
router.register("events",views.EventsAPI)
urlpatterns = [
    path("",include(router.urls)),
    path("login",views.LoginAPI.as_view(),name="login"),
    path("logout",views.LogoutAPI.as_view(),name="logout"),
    path("user",views.UserAPI.as_view(),name="user"),
    path("register",views.RegisterAPI.as_view(),name="register"),
    path('likes',views.LikedEventsAPI.as_view(),name="likes")
]