## Basic routing

Let's add a hello world route. Edit the config object to include the following:

```js
// index.js
const config = {
  routes: {
    helloWorld: {
      path: '/',
      methods: ['GET'],
      callback: () => 'Hello world!',
    },
  },
};
```

Put all your routes into the `routes` field of the config. Each route has to have a unique name and three keys: `path`, `methods` and `callback`.

Now you can run your server.
```sh
node index.js
```
You can access the API endpoint at the default URL: `http://localhost:8080/`:

```sh
curl http://localhost:8080/
> "Hello world!"
```

> Constantly restarting your server whenever you make changes can be tedious. You can add `nodemon` that will restart your server whenever you make changes to the code.
> ```sh
> npm install --save-dev nodemon
> ```
> Now edit `package.json` and add an npm script.
> ```json
>"scripts": {
>  "dev": "nodemon index.js"
>},
>```
>Now you can run the server with `npm run dev`.

