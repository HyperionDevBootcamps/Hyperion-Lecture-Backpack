from django.shortcuts import render
from django.urls import reverse
from django.http.response import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from . import models

# Create your views here.
def login_landing(request):
    return render(request, 'login.html')

def login_user(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is None:
        return HttpResponseRedirect(reverse("sport_app:login"))
    else:
        login(request, user)
        return HttpResponseRedirect(
            reverse('sport_app:welcome')
        )

def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse("sport_app:login"))

def register(request):
    return render(request, 'register.html')

def register_user(request):
    user_form = request.POST
    if (user_form.get('username') and user_form.get('password')
        and user_form.get('password') == user_form.get('password_conf')):
            user = User.objects.create_user(username=user_form.get('username'), password=user_form.get('password'))
            user.save()
            return render(request, 'user_register_success.html')
    return HttpResponseRedirect(reverse("sport_app:register"))

@login_required(login_url="/sport_app/")
def welcome(request):
    return render(request, 'welcome.html')

@login_required(login_url="/sport_app/")
def register_team(request):
    sport = request.GET['sport']
    return render(request, 'team_register.html', {'sport' : sport})

def add_team(request):
    model_dict = {
        'football' : models.FootballTeam,
        'rugby' : models.RugbyTeam
    }
    sport = request.POST.get('sport')
    # print(sport)
    if sport in model_dict:
        sport = model_dict[sport]()
    sport.team_registration_key = request.POST.get('registrationCode')
    sport.team_name = request.POST.get('teamName')
    sport.total_registered_players = request.POST.get('totalPlayers')
    sport.save()
    return render(request, 'team_added.html')

@login_required(login_url="/sport_app/")
def register_player(request):
    sport = request.GET['sport']
    return render(request, 'player_register.html', {'sport' : sport})

def add_player(request):
    model_dict = {
        'track' : models.TrackAthlete,
        'tennis' : models.TennisPlayer,
        'golf' : models.GolfPlayer
    }
    sport = request.POST.get('sport')
    print(sport)
    if sport in model_dict:
        sport = model_dict[sport]()
    sport.player_registration_key = request.POST.get('registrationCode')
    sport.player_name = request.POST.get('playerName')
    sport.player_surname = request.POST.get('playerSurname')
    sport.player_age = request.POST.get('playerAge')
    sport.save()
    return render(request, 'player_added.html')