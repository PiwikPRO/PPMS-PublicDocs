# PPMS-PublicDocs

## Choosing the right version

When working on this repository, ensure that you start from the right version. There
are branches corresponding with each released PPMS major-minor version, so you can simply
```shell script
git checkout X.Y
```
where `X.Y` is PPMS version of your choice, like:
```shell script
git checkout 8.2
```
will result in checking out docs for PPMS 8.2.x.

## Running docker container

To quickly view generated PublicDocs you need Docker and docker-compose (optional).
Check out examples below. Feel free to adjust port numbers and volume paths to
your needs.

### Run with `docker`

Run following commands:

```shell script
docker build \
    --tag "ppms-publicdocs" \
    .
docker run \
    --publish "9009:8080" \
    --volume "$(pwd):/app" \
    ppms-publicdocs
```

### Run with `docker-compose`

You can run it with `docker-compose up`. It uses `docker-compose.yaml` file.

### Serving generated files
Build files are served by default at http://127.0.0.1:9009/
Documentation is live (browser updates view each time any file changes).

test
