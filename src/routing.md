## Installation

INFO: Currently routing with hadron works only with the Express framework.

```bash
npm install @brainhubeu/hadron-express --save
```

[More info about installation](/core/#installation)

## Express integration

We need to include `hadron-express` package while initializing hadron.

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const expressApp = express();
const config = {/* config */}

expressApp.use(bodyParser.json());

hadron(
  expressApp,
  [require('../hadron-express')],
  config
).then(container => {
  expressApp.listen(port);
})
```

## Basic routing setup

To set up routes with Hadron, we are able to include them as objects in config object under key `routes`.

```javascript
const config = {
  routes: {
    helloWorldRoute: {
      callback: () ='Hello world !',
      methods: ['GET'],
      path: '/',
    },
  },
};
```

Basic, required structure of route config object includes:

* `callback` - function called when request is made, you can either return response specification or primitive value which will be used as response body
* `methods` - array of [HTTP methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
* `path` - route path

## Callback

The callback function has the following structure:

```javascript
const callback = (request, dependencies) = {
  // ... response reparation
  return responseSpec;
};
```

* `request` - Hadron request object, its a simple data structure without methods, with the following keys:
    * `body` - request body
    * `file` or `files` - files processed by file middleware
    * `headers` - object with headers names as keys and headers data as values, all headers names are lowercase
    * `locals` - custom variables per request
    * `params` - url params array
    * `query` - url querystring params array

* `dependencies` - proxy object which internally calls `container.take(key)` when you try to access its keys

* `responseSpec` - object that you should return from callback function, it describes desired result and is internally used to generate response, can have following fields (all keys are optional):
    * `status` - HTTP numeric status - defaults to `200` or `302` (on redirection)
    * `redirect` - redirection url
    * `headers` - object with headers names as keys and headers data as values
    * `body` - response body - defaults to `{}`
    * `view` - object describing view to return (requires registered view engine), has following keys:
        * `name` - name of the view file inside `views` folder (required)
        * `bindings` - view bindings (optional)

You should always return unequivocal `responseSpec` object with none or one of `body`/`view`/`redirect` keys.

You can return primitive value directly - in that case it will be used as response body.

Response spec can be also wrapped in Promise - framework will automatically wait till promise is resolved.

## Example callbacks

*Note: For simplicity we are not showing whole route config in examples below, but take notice that all `callback` functions listed below should be registered under `callback` key in route config*

### Simplest callback

If you don't need to access values from request object or DI container you can omit both callback parameters, you can also use shortcut of the `responseSpec` if returned value is a primitive one, for example:

```javascript
const callback = () => 'Hello!';
```

will respond with body:

```json
"Hello!"
```

and status `200`

### Callback with non-primitive response body

To avoid ambiguity you should always return responseSpec if body is non-primitive one:

```javascript
const callback = () => {
  return {
    body: {
      message: 'Hello!',
    },
  },
};
```

will respond with body:

```json
{
  "message": "Hello!",
}
```

and status `200`

### Callback with custom status and headers

You can explicitly specify response status as well as additional headers:

```javascript
const callback = () => {
  return {
    status: 201,
    headers: {
      'my-header': 'some value'
    },
    body: {
      id: 1,
    },
  },
};
```

will respond with body:

```json
{
  "id": 1,
}
```

with status `201` and additional header

### Callback with redirection

You can also redirect user to another page:

```javascript
const callback = () => {
  return {
    redirect: '//google.com'
  },
};
```

it will redirect user to Google's page with its default protocol: `https://google.com`

### Callback returning rendered view

You can install and register view rendering engine in your underlying Express app, for example:

```sh
npm install ejs --save
```

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const expressApp = express();
const config = {/* config */}

expressApp.set('view engine', 'ejs'); // <- here
expressApp.use(bodyParser.json());

hadron(
  expressApp,
  [require('../hadron-express')],
  config
).then(container => {
  expressApp.listen(port);
})
```

Default views folder should be named `views` and be placed in project's main folder, lets add simple view:

```html
<!-- my-projects/views/hello.ejs -->
<p>Hello <%= user %>!</p>
```

Now we can set route with callback view specification:

```javascript
const callback = () => {
  return {
    view: {
      name: 'hello',
      bindings: { user: 'Stranger' }
    },
  },
};
```

It will respond with html:

```html
<p>Hello Stranger!</p>
```

with status `200`

### Callback with usage of request object

Request object is passed as a first argument to callback function, you can use it directly or destructure needed items, lets say that we have route that looks like this:

```sh
/items/:id?details=<boolean>
```

Now we can easy access route parameters and query items:

```javascript
const callback = (req) => {
  return {
    body: {
      itemId: Number(req.params.id),
      details: Boolean(req.query.details)
    },
  },
};
```

or:

```javascript
const callback = ({ params, query }) => {
  return {
    body: {
      itemId: Number(params.id),
      details: Boolean(query.details)
    },
  },
};
```

When we call a route like this: `/items/1?details=true`, it will respond with body:

```json
{
  "itemId": 1,
  "details": true,
}
```

and status `200`

### Callback with usage of container items

Lets assume that we registered two items in DI container:

```javascript
container.register('foo', 'baz');
container.register('bar', 'bat');
```

We can access them via second argument of the callback:

```javascript
const callback = (req, dependencies) => {
  return {
    body: {
      foo: dependencies.foo,
      bar: dependencies.bar,
    },
  },
};
```

or:

```javascript
const callback = (req, { foo, bar }) => {
  return {
    body: {
      foo,
      bar,
    },
  },
};
```

It will respond with body:

```json
{
  "foo": "baz",
  "bar": "bat"
}
```

and status `200`

*Note: If you try to list all available dependencies (for example via `Object.keys(dependencies)`) it will return an empty array - that's because second argument is a Proxy object which prevents direct access to DI container. You should always refer to specific keys, either via `dependencies[key]` or via destructuring.*

### Callback with asynchronous code

Lets assume that DI container contains repository that returns results as a promise:

```javascript
const repository = {
  byId(id) {
    return Promise.resolve({ id: '1', name: 'Stranger' })
  }
}

container.register('usersRepository', repository);
```

We can return response spec as a promise:

```javascript
const callback = (req, { usersRepository }) => {
  return usersRepository.byId(1)
    .then(user => ({
      body: user.name
    }));
};
```

or with async-await:

```javascript
const callback = async (req, { usersRepository }) => {
  const user = await usersRepository.byId(1);

  return {
    body: user.name
  };
};
```

It will respond with body:

```json
"Stranger"
```

and status `200`


## Middlewares

*Note: Currently middlewares only refer to express.*

Routing with Hadron provides a middleware support. You need to pass array with middleware functions to a `middleware` key in route config.

For example:

```javascript
middlewareExample: {
  callback: () => {
    console.log('Callback function');
  },
  methods: ['GET'],
  middleware: [
    (req, res, next) => {
      console.log(`First middleware`);
      next();
    },
    (req, res, next) => {
      console.log(`Second middleware`);
      next();
    },
  ],
  path: '/',
},
```

`GET` request to `/` will log to the console following:

```sh
First middleware
Second middleware
Callback function
```

Middlewares take three arguments: `request`, `response` and `next`. First two are objects and third one - function which executed continues request flow.

You can read more about middlewares in [express guide](https://expressjs.com/en/guide/using-middleware.html)
