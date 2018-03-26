---
**TODO**

* Middlewares only refer to express.

---

### Basic routing setup

To set up routes with hadron, we are able to include them as an objects in config object under key **routes**.
```javascript
config = {
  routes: {
    helloWorldRoute: {
      callback: () ='Hello world !',
      methods: ['GET'],
      path: '/',
    },
  },
}
```
Basic, required structure of route object includes:

* **callback**: function called when request is made, returned value will be send as a response.
* **methods**: array of [HTTP methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).
* **path**: route path.

### Callback

Callback function can take route parameters as a arguments. Hadron also allows us to grab a container value easily.

```javascript
routeWithParam: {
  callback: (firstParam) =`firstParam value: ${firstParam}`,
  methods: ['GET'],
  path: '/:firstParam',
}
```
Using this simple example, if we send a request, for example *http://localhost/foobar* will provide a response as below:
```
"firstParam value: foobar"
```  
---
When you would like to implement multiple route parameters, their order as arguments in callback does not matter, argument name needs only to match parameter name.
```javascript
multipleParams: {
  callback: (secondParam, firstParam) =`${firstParam} ${secondParam}`,
  methods: ['GET'],
  path: '/:firstParam/:secondParam',
}
```
GET request with path: *http://localhost/Hello/World* will result with following response:
```
"Hello World"
```
#### Retrieving items from container in callback
Callback function provides a simple way to retrieve items from container with ease. Simply set item's key as callback function's argument. Let's see an example below:
```javascript
hadron(expressApp, [
  'hadron-express',
], {
  routes: {
    routeWithContainerValue: {
      // sayHello argument will refer to container value
      callback: (sayHello) =`hadron says: ${sayHello}`,
      methods: ['GET'],
      path: '/',
    },
  }
}).then(container ={
  // Register value under key sayHello
  container.register('sayHello', 'Hello World');
});
```
After sending a request to */* path, response will look like that:
```
"hadron says: Hello World"
```
---
Hadron will first look for request parameters and next if not found any, it will look for value in container. So if you register a key **foo** in container and set the route param under the same name, it will inject param's value into callback's argument foo.
```javascript
container.register('foo', 'container');
```
```javascript
exampleRoute: {
  callback: (foo) =`foo value: ${foo}`,
  methods: ['GET'],
  path: '/:foo',
},
```
Respone for GET request */param* will look like this:
```
"foo value: param"
```
### Middlewares
Routing with hadron provides a middleware support. You need to pass array with middleware functions to a *middleware* key in route config.
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
GET request to */* will log to the console following:
```
First middleware
Second middleware
Callback function
```
Middlewares take three arguments: **request**, **response** and **next**. First two are objects and third one - function which executed continues request flow.
You can read more about middlewares in [express guide](https://expressjs.com/en/guide/using-middleware.html).