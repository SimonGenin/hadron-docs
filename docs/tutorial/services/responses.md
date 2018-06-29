## Custom responses

#### Not Found:
```javascript
export const notFound = message => {
    return {
        status: 404,
        body: {
            error: {
                message,
            },
        },
    };
};
```

#### User Error:
```javascript
export const userError = message => {
    return {
        status: 400,
        body: {
            error: {
                message,
            },
        },
    };
};
```

#### Server Error:
```javascript
export const serverError = message => {
    return {
        status: 500,
        body: {
            error: {
                message,
            },
        },
    };
};
```

#### Unauthorized:
```javascript
export const unauthorized = () => {
    return {
        status: 403,
        body: {
            error: {
                message: 'Unauthorized',
            },
        },
    };
};
```

[Go back](/tutorial)