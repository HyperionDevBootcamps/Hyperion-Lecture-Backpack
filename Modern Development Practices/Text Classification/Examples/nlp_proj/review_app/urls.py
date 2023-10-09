from django.urls import path
from . import views

app_name = 'review_app'

urlpatterns = [
    path('', views.review, name='review'),
    path('submit_review', views.submit_review, name='submit_review'),
]