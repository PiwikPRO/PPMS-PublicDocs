# PPMS-PublicDocs

## Choosing the right version

When working on this repository, ensure that you are on the right version. There
are tags corresponding with PPMS major-minor version, so you can simply
```shell script
git checkout X.Y
```
where `X.Y` is PPMS version of your choice, like:
```shell script
git checkout 8.2
```
will result in checking out docs for PPMS 8.2.x.

## Running with Docker

To quickly start with PublicDocs you need Docker and docker-compose (optional).
Check out examples below. Feel free to adjust port numbers and volume paths to
your needs.

### Plain Docker

Run following commands:

```shell script
docker build \
    --tag "ppms-publicdocs" \
    .
docker run \
    --publish "9001:8080" \
    --volume "$(pwd):/app" \
    ppms-publicdocs
```

### Using `docker-compose`

Example `docker-compose.yml`:

```
version: '3'

services:
    ppms_public_docs:
        build: .
        volumes:
            - .:/app
        ports:
            - 9009:8080
```

You can run it with `docker-compose up`.
