FROM python:3.11

ENV PYTHONUNBUFFERED 1

RUN mkdir /my_service

WORKDIR /my_service

ADD . ./

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]