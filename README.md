# Hadron documentation

This repository contains source for Hadron documentation page, which you can find here:

[Hadron Docs](http://hadron-docs.dev.brainhub.pl/)

## Development

### Run via Docker

```sh
docker build -t hadron-docs ./
docker run --rm --name docs -p 8000:8000 -v /:/documents hadron-docs
```

### Run locally

1. Install MkDocs locally: [installation](http://www.mkdocs.org/#installation)

2. Run `mkdocs serve` and  inside `hadron-docs` folder.

### Update documentation

To download all latest documentations from repository, got to `update-script` folder, run `npm i` and then `npm start`.

### Deploy documentation

1. Login to Brainhub docker registry with `docker login <url>`

2. run `docker build -t <url>/hadron-docs/hadron-docs:latest .`

3. run `docker push <url>/hadron-docs/hadron-docs:latest`

4. Enter rancher and update stack
