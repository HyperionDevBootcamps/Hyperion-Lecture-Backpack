from django.urls import path
from . import views

app_name = 'faq_app'

urlpatterns = [
    path('', views.faq, name='faq'),
    path('ask/', views.ask_question, name='ask_question'),
]