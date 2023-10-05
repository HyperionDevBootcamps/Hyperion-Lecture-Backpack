from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.FootballTeam)
admin.site.register(models.RugbyTeam)
admin.site.register(models.TennisPlayer)
admin.site.register(models.TrackAthlete)
admin.site.register(models.GolfPlayer)