from django.shortcuts import render
from django.http import HttpResponse
from .functions import faq_detection

# Create your views here.
def faq(request):
    return render(request, 'faq.html')


def ask_question(request):
    user_question = request.POST['question']
    with open('faq_app/data/faq.txt', 'r', encoding='utf-8') as file:
        faq_detector = faq_detection.FAQDetector(file)
    question, answer = faq_detector.get_most_similar_question(user_question)
    return render(request, 'answer.html', {'question':question, 'answer':answer})