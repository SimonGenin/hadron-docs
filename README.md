To run documentation use:
```
docker build -t hadron-docs ./hadron/docs/
docker run --rm --name docs -p 8000:8000 -v ./hadron/docs/:/documents hadron-docs
```
