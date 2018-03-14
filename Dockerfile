FROM python:alpine3.7

EXPOSE 8000

RUN pip install mkdocs

RUN mkdir /documents
RUN mkdir /site
WORKDIR /documents

CMD mkdocs serve -a 0.0.0.0:8000
