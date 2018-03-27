FROM python:alpine3.7

EXPOSE 8000

RUN pip install mkdocs

ADD mkdocs.yml ./mkdocs.yml
ADD src/ ./src/

CMD mkdocs serve -a 0.0.0.0:8000
