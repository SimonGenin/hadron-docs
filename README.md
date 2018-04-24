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

1. Run `mkdocs serve` and  inside `hadron-docs` folder.