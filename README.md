To run documentation use:
```sh
docker build -t hadron-docs ./
docker run --rm --name docs -p 8000:8000 -v /:/documents hadron-docs
```

To run for development purpose (live reload):

Install MkDocs locally: [installation](http://www.mkdocs.org/#installation)

Run `mkdocs serve` and  inside `hadron-docs` folder.