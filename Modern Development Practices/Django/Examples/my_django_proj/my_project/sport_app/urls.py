from django.urls import path
from . import views


app_name = 'sport_app'
urlpatterns = [
    path('', views.login_landing, name="login"),
    path("login_user/", views.login_user, name="login_user"),
    path("logout_user/", views.logout_user, name="logout"),
    path('register/', views.register, name="register"),
    path('register_user/', views.register_user, name="register_user"),
    path('welcome', views.welcome, name="welcome"),
    path('register_team', views.register_team),
    path('add_team/', views.add_team),
    path('register_player', views.register_player),
    path('add_player/', views.add_player),
]