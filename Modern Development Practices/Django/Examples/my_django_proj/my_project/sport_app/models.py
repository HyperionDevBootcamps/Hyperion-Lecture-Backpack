from typing import Any
from django.db import models

# Create your models here.
class FootballTeam(models.Model):
    
    team_registration_key = models.CharField(max_length=5, primary_key=True)
    team_name = models.CharField(max_length=20)
    total_registered_players = models.IntegerField()

class RugbyTeam(models.Model):
    
    team_registration_key = models.CharField(max_length=5, primary_key=True)
    team_name = models.CharField(max_length=20)
    total_registered_players = models.IntegerField()

class TrackAthlete(models.Model):
    
    player_registration_key = models.CharField(max_length=5, primary_key=True)
    player_name = models.CharField(max_length=20)
    player_surname = models.CharField(max_length=20)
    player_age = models.IntegerField()

class TennisPlayer(models.Model):
    
    player_registration_key = models.CharField(max_length=5, primary_key=True)
    player_name = models.CharField(max_length=20)
    player_surname = models.CharField(max_length=20)
    player_age = models.IntegerField()

class GolfPlayer(models.Model):
    
    player_registration_key = models.CharField(max_length=5, primary_key=True)
    player_name = models.CharField(max_length=20)
    player_surname = models.CharField(max_length=20)
    player_age = models.IntegerField()