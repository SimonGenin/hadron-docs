To run documentation use:
```
docker build -t hadron-docs ./
docker run --rm --name docs -p 8000:8000 -v /:/documents hadron-docs
```