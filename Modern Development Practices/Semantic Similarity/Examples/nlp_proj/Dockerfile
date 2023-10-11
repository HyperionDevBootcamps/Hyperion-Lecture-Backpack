FROM python:3.11

ENV PYTHONUNBUFFERED 1

RUN mkdir /faq_service

WORKDIR /faq_service

ADD . ./

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip install -r requirements.txt

RUN python -m spacy download en_core_web_lg

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]