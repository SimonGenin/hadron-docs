## Installation

INFO: Routing with hadron currently works only with the Express framework.

```bash
npm install @brainhubeu/hadron-express --save
```

[More info about installation](/docs/basics/core/#installation)

## Express integration

We need to include the `hadron-express` package while initializing Hadron.

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

When setting up routes with Hadron, we are able to include them as objects in the config object under the key `routes`.

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

The required properties of a route config object include:

* `callback` - function called when the request is made, you can either return response specification or primitive value which will be used as the response body
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
    * `headers` - object with header names as keys and header data as values, all header names are lowercase
    * `locals` - custom variables per request
    * `params` - url params array
    * `query` - url querystring params array

* `dependencies` - proxy object which internally calls `container.take(key)` when you try to access its keys

* `responseSpec` - object that you should return from the callback function, it is used to generate a response, it can have following fields (all keys are optional):
    * `status` - HTTP numeric status - defaults to `200` or `302` (on redirection)
    * `redirect` - redirection url
    * `headers` - object with header names as keys and header data as values
    * `body` - response body - defaults to `{}`
    * `view` - object describing the view to return (requires a registered view engine), has the following keys:
        * `name` - name of the view file inside the `views` folder (required)
        * `bindings` - view bindings (optional)

You should always return an unequivocal `responseSpec` object with none or one of `body`/`view`/`redirect` keys.

You can return a primitive value directly - in that case, it will be used as the response body.

Response spec can be also wrapped in a promise - framework will automatically wait till the promise is resolved.

## Example callbacks

*Note: For simplicity, we are not showing the whole route config in the examples below, but take notice that all `callback` functions listed below should be registered under `callback` key in route config*

### Simplest callback

If you don't need to access values from the request object or the DI container you can omit both callback parameters, you can also use the shorthand `responseSpec` if the returned value is primitive, for example:

```javascript
const callback = () => 'Hello!';
```

Will respond with a body:

```json
"Hello!"
```

And status `200`.

### Callback with a non-primitive response body

To avoid ambiguity you should always return `responseSpec` if the body is a non-primitive one:

```javascript
const callback = () => {
  return {
    body: {
      message: 'Hello!',
    },
  },
};
```

Will respond with a body:

```json
{
  "message": "Hello!",
}
```

and status `200`.

### Callback with custom status and headers

You can explicitly specify the response status as well as additional headers:

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

Will respond with a body:

```json
{
  "id": 1,
}
```

With status `201` and an additional header:

### Callback with redirection

You can also redirect the user to another page:

```javascript
const callback = () => {
  return {
    redirect: '//google.com'
  },
};
```

It will redirect the user to Google with its default protocol: `https://google.com`.

### Callback returning a rendered view

You can install and register a view rendering engine in your underlying Express app, for example:

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

The default views folder should be named `views` and be placed in the project's main folder. Let's add a simple view:

```html
<!-- my-projects/views/hello.ejs -->
<p>Hello <%= user %>!</p>
```

Now we can set a route with a view specification returned from the callback:

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

With status `200`.

### Callback with the request object

The request object is passed as the first argument to the callback function. You can use it directly or destructure needed items. Let's say that we have a route that looks like this:

```sh
/items/:id?details=<boolean>
```

Now we can easily access the route parameters and query items:

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

Or:

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

When we call a route like this: `/items/1?details=true`, it will respond with a body:

```json
{
  "itemId": 1,
  "details": true,
}
```

And status `200`.

### Callback using container items

Lets assume that we registered two items in the DI container:

```javascript
container.register('foo', 'baz');
container.register('bar', 'bat');
```

We can access them via the second argument of the callback:

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

Or:

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

It will respond with a body:

```json
{
  "foo": "baz",
  "bar": "bat"
}
```

And status `200`.

*Note: If you try to list all available dependencies (for example via `Object.keys(dependencies)`) it will return an empty array - that's because the second argument is a Proxy object which prevents direct access to DI container. You should always refer to specific keys, either via `dependencies[key]` or via destructuring.*

### Callback with asynchronous code

Let's assume that the DI container contains a repository that returns a promise:

```javascript
const repository = {
  byId(id) {
    return Promise.resolve({ id: '1', name: 'Stranger' })
  }
}

container.register('usersRepository', repository);
```

We can return the response spec as a promise, too:

```javascript
const callback = (req, { usersRepository }) => {
  return usersRepository.byId(1)
    .then(user => ({
      body: user.name
    }));
};
```

Or with async-await:

```javascript
const callback = async (req, { usersRepository }) => {
  const user = await usersRepository.byId(1);

  return {
    body: user.name
  };
};
```

It will respond with a body:

```json
"Stranger"
```

And status `200`.

## Middlewares

_Note: Currently middlewares only refer to express._

Routing with Hadron provides middleware support. You need to pass an array with middleware functions to a `middleware` key in route config.

For example:

```javascript
middlewareExample: {
  callback: () => {
    console.log('Callback function');
  },
  methods: ['GET'],
  middleware: [
    firstMiddleware, // logs "First middleware"
    secondMiddleware, // logs "Second middleware"
  ],
  path: '/',
},
```

`GET` request to `/` will log the following to the console:

```sh
First middleware
Second middleware
Callback function
```

You can use either raw middleware compatible with the underlying micro-framework, or the special form of Hadron middleware. You can mix both types, taking into account the recommendations specified below.

### Raw middlewares

The ability to use raw middlewares gives you the possibility to use a huge amount of existing third-party middlewares. You can also write your custom raw middlewares, however in most cases we recommend you use the Hadron middlewares syntax.

Raw middlewares take three arguments: `request`, `response` and `next`. The first two are objects and the third one - a function which continues the request flow when executed, for example:

```javascript
const myRawMiddleware = (req, res, next) => {
  console.log("Hello from custom middleware");
  next();
};
```

You can read more about middlewares in the [express guide](https://expressjs.com/en/guide/using-middleware.html)

### Hadron middlewares

Hadron middlewares give you an abstraction over the underlying micro-framework, which minimizes changes required if you decide to switch to another one in the future. They also give you safe access to the DI container and a declarative, easy to test API, similar to the route callback API.

Hadron middlewares automatically call the `next()` function at the end of the middleware. In cases when you really need to control the `next` function you should use a raw middleware instead.

A middleware has the following structure:

```javascript
const myHadronMiddleware = (request, dependencies) = {
  // ... some operations
  return responseSpec | partialResponseSpec | partialRequest;
};
```

The `request` and `dependencies` are the same as in the route callback. As for the return value, the only difference are the extended result types:

---

#### responseSpec

Same as in the route callback, it sends a response immediately.

#### partialResponseSpec

You can set a partial response specification with headers or status (or both) by setting the returned object's type property as `PARTIAL_RESPONSE`, for example:

```javascript
const myHadronMiddleware = (request, dependencies) = {
  // ... some operations
  return {
    type: "PARTIAL_RESPONSE",
    headers: {
      "custom-header": "some value"
    },
    status: 418
  };
};
```

#### partialRequest

You can change the request object - modify or add keys, by specifying the returned object's `type` property as `PARTIAL_REQUEST` and adding or modifying the `values` object's keys, for example:

```javascript
const myHadronMiddleware = (request, dependencies) = {
  // ... some operations
  return {
    type: "PARTIAL_REQUEST",
    values: {
      body: 'bar',
      customKey: 'foo',
    },
  };
};
```
