# Todo app with Hadron

## Getting started

As is tradition, this guide will show you how to build a basic todo app backend with Hadron. You will need:
- [Node.js](http://nodejs.org/) and [npm](http://npmjs.com/) installed.
- A text editor
- A http request tool such as `curl` or [Postman](https://www.getpostman.com/).


Start by creating a directory to store your project.

```sh
mkdir hadron-todo-app
cd hadron-todo-app
npm init
```

Install Hadron packages as well as Express, which you'll use as your http server.

```sh
npm install --save @brainhubeu/hadron-core @brainhubeu/hadron-express express
```
Create the application entry point.

```sh
touch index.js
```

Open `index.js` in your code editor of choice to create your application entry point.

```js
// index.js
const hadron = require('@brainhubeu/hadron-core').default;
const express = require('express');

const dependencies = [
  require('@brainhubeu/hadron-express'),
];

const port = process.env.PORT || 8080;
const app = express();

const config = {
  // config goes here
};

hadron(app, dependencies, config).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
```

If you've used Express before, this will look familiar. The code above is wrapping Hadron around Express using the `hadron-express` module that you initialized in the `dependencies` array. If you run this script, your http server will start, but there will be no way to interact with it as you haven't defined any routes.
