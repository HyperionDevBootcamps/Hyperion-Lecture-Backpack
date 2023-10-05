from django.db import models

# Create your models here.
class House(models.Model):

    street_name = models.CharField(max_length=50)
    house_number = models.IntegerField()
    zipcode = models.CharField(max_length=6)


class Architect(models.Model):

    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    contact_numebr = models.CharField(max_length=15)


