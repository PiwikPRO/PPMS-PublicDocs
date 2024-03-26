FROM python:3.7.4-alpine3.10

RUN adduser -D piwikpro

WORKDIR /app

COPY requirements.local.txt .
COPY requirements.txt .
COPY download_remote_docs.py .
COPY remote_docs_config.json .

RUN python -m pip install --requirement requirements.local.txt && \
    python -m pip install sphinx-autobuild && \
    rm requirements.local.txt && \
    rm requirements.txt

USER piwikpro

RUN python3 download_remote_docs.py

CMD ["sphinx-autobuild", "--host", "0.0.0.0", "--port", "8080", "--ignore", "/app/_static/api/*", "--ignore", "/app/.idea/*", "/app", "/home/python/docs/_build/html"]
