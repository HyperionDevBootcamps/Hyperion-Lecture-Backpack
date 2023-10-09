from django.shortcuts import render
from .functions import analyze_review

# Create your views here.
def review(request):
    return render(request, 'review.html')

def submit_review(request):
    review_text = request.POST.get('review')
    sentiment = analyze_review.make_prediction(review_text)
    return render(request, 'thank_you.html', {'sentiment' : sentiment})