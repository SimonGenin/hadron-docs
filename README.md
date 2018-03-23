To run documentation use:
```
docker build -t hadron-docs ./hadron/docs/
docker run --rm --name docs -p 8000:8000 -v ./hadron/docs/:/documents hadron-docs
```
---
Running docs temporary, without docker:
```
mkdocs serve
```
It required you to install mkdocs, you can see [install instructions](http://www.mkdocs.org/#installation)