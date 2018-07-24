
## Installation
```sh
npm install @brainhubeu/hadron-auth --save
```

## Overview

**hadron-auth** is a package that simplifies working with the traditional username-password authorization flow. It provides a basic structure for authorization and authentication using JSON web token.

## Guide

Let's build a simple Hadron backend with authorization. Before you begin, you should have a MySQL database running, either directly on your machine or Docker. See [TypeORM guide](/docs/packages/typeorm) for details.

*If you already have your database configuration, login and registration routes created, you can skip directly to the [authorization](#authorization) section.*

Start by importing all the necessary packages.

```sh
npm install --save @brainhubeu/hadron-core \
@brainhubeu/hadron-express \
@brainhubeu/hadron-typeorm \
@brainhubeu/hadron-auth \
express body-parser mysql bcrypt jsonwebtoken
```

Create the application entry point:

```js
const hadron = require('@brainhubeu/hadron-core').default;
const express = require('express');
const bodyParser = require('body-parser');

const dependencies = [
  require('@brainhubeu/hadron-auth'),
  require('@brainhubeu/hadron-express'),
  require('@brainhubeu/hadron-typeorm'),
];

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

const config = {
  // config goes here...
};

hadron(app, dependencies, config).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
```

Your server is now operational. Let's consider what needs to be done for a successful auth flow.

- The users need a way to register an account
- The users need a way to login to an existing account.
- The server needs a way to verify user's identity to access secure routes.

User registration and login should be simple thanks to Hadron's integration with TypeORM.  You can use `bcrypt` to hash your users' passwords so that they aren't stored directly in the database.

Authentication will be accomplished using JSON Web Tokens (JWT) that the users can store in their browser's cookies or local storage. hadron-auth gives you access to a default middleware that can be used to authenticate users using JWT, or you can create your own.

### Configuration

First include the TypeORM connection configuration in Hadron's config object:

```js
const config = {
  connection: {
    connectionName: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: process.env.DATABASE_PW,
    database: 'authdemo',
    entitySchemas: [],
    synchronize: true,
  },
};
```

### Schemas

To take advantage of hadron-auth's features we need to create schemas for two tables: users and roles. Then, users can be authenticated based on the roles they possess.

Users will be linked to roles via a many-to-many relation.

```js
const userSchema = {
  name: 'user',
  columns: {
    id: { primary: true, generated: true, type: 'int' },
    username: { unique: true, type: 'varchar' },
    hash: { type: 'varchar' },
  },
  relations: {
    roles: {
      target: 'role',
      type: 'many-to-many',
      joinTable: { name: 'user_role' },
    },
  },
};
```

```js
const roleSchema = {
  name: 'role',
  columns: {
    id: { primary: true, generated: true, type: 'int' },
    name: { type: 'varchar' },
  },
};
```

Don't forget to add your schemas to the connection config.

```js
entitySchemas: [userSchema, roleSchema],
```

You don't need to create specific routes for adding roles, instead for the purposes of the guide you can simply issue a MySQL query that will add a role from the MySQL prompt. Usually, the MySQL prompt is accessible under the `mysql` command in the shell.

```js
insert into role (name) values ('user');
```

### Registration

Before creating the routes for user registration and login, let's add the JWT secret to our config under the `authSecret` key. In this case, you can simply use an environment variable.

```js
const config = {
  authSecret: process.env.JWT_SECRET,
  // ...
};
```

That secret is automatically added into the DI container and can be retrieved in route callbacks.

Let's create a user registration route.

```js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ...

const config = {
  // ...
  routes: {
    userRegister: {
      path: '/user/register',
      methods: ['POST'],
      callback: async (req, { authSecret, userRepository, roleRepository }) => {
        try {
          // Get username and password from the request.
          const { username, password } = req.body;

          // Check if that username exists.
          const userExists = await userRepository.findOne({ username });
          if (userExists) {
            return { status: 400, body: { error: 'Username already in use.' } };
          }

          // Find the user role.
          const userRole = await roleRepository.findOne({ name: 'user' });

          // Hash the password.
          const hash = await bcrypt.hash(password, 10);

          // Save the user into a database.
          const user = await userRepository.save({ username, hash, roles: [userRole] });

          // Create a JSON web token.
          const token = jwt.sign(user.id, authSecret);

          // Add it to our user
          user.authorization = `Bearer ${token}`;

          // Delete the hashed password before returning the user.
          delete user.hash;

          // Return the user.
          return { status: 201, body: user };
        } catch (error) {
          return { status: 400, body: { error: 'Bad request.' } };
        }
      },
    },
  },
};
```

Note that since you are taking your JWT secret from the environment variables, you need to export it first.

```sh
export JWT_SECRET=shhhh
```

Now you can run your server and test your endpoint with `curl`:

```sh
curl http://localhost:8080/user/register \
  -X POST -H \
  'content-type: application/json' \
  -d '{"username":"cherry","password":"shhh"}'
```

Which yields:

```json
{
   "username" : "cherry",
   "authorization" : "Bearer <jwt>",
   "roles" : [
      {
         "id" : 1,
         "name" : "user"
      }
   ],
   "id" : 2
}
```

Instead of `<jwt>` you should see the full JSON web token.

### Login

Let's add a login route, which will be similar to the registration. It will take username and password in parameters and return the user from our database.

```js
const config = {
  // ...
  routes: {
    // ...
    userLogin: {
      path: '/user/login',
      methods: ['POST'],
      callback: async (req, { authSecret, userRepository }) => {
        try {
          // Get username and password from the request.
          const { username, password } = req.body;

          // Check if that username exists.
          const user = await userRepository.findOne({ username });
          if (!user) {
            return { status: 401, body: { error: 'User not found.' } };
          }

          // Check if the password hashes match.
          const match = await bcrypt.compare(password, user.hash);
          if (!match) {
            return { status: 401, body: { error: 'Invalid password.' } };
          }

          // Create a JSON web token.
          const token = jwt.sign(user.id, authSecret);

          // Add it to our user.
          user.authorization = `Bearer ${token}`;

          // Delete the hashed password before returning the user.
          delete user.hash;

          // Return the user.
          return { status: 201, body: user };
        } catch (error) {
          return { status: 400, body: { error: 'Bad request.' } };
        }
      },
    },
  },
};
```

Let's test the route with `curl` to see if it works.

```sh
curl http://localhost:8080/user/login \
  -X POST -H \
  'content-type: application/json' \
  -d '{"username":"cherry","password":"shhh"}'
```

You should receive a similar object.

```sh
{
   "roles" : [
      {
         "name" : "user",
         "id" : 1
      }
   ],
   "id" : 2,
   "username" : "cherry",
   "authorization" : "Bearer <jwt>"
}
```

For development convenience, you can copy the `<jwt>` part of the received token and export it into an environment variable.

```sh
export auth=<jwt>
```

### Authorization

Let's now create a simple route that will be blocked for users without specified roles.

```js
const config = {
  // ...
  routes: {
    // ...
    secretRoute: {
      path: '/wall',
      methods: ['GET'],
      callback: () => 'Congrats, you\'re in!',
    },
  },
};
```

hadron-auth uses an array of blocked routes provided in the `securedRoutes` key of the config. 

```js
const config = {
  // ...
  securedRoutes: [
    {
      path: '/wall',
      methods: ['POST'],
      roles: ['user'],
    },
  ],
}
```

There are a few things to point out here:

- `path` supports star wild cards, so you can for instance specify a path like `/path/*` to block `/path/to` but not `/path/to/something`. You can also use double star so `/path/**` will block every route that starts with `/path/`.

- `methods` field takes an array of HTTP verbs that should be blocked. If that field is unspecified, every HTTP verb will be blocked.

- `roles` takes an array of strings or arrays of strings. The first level is an *OR* operation, second level is an *AND* operation. For instance, `roles` declared as `[['admin', 'user'], 'manager']` will let in a user that's *admin and user* or *manager*.

If you use the default authorization middleware, to access any of the routes specified in that key, you will need an `Authorization` header.

If you try to access that route now:

```sh
curl http://localhost:8080/wall
```

You should receive an error:

```json
{
   "error" : {
      "message" : "Unauthorized"
   }
}
```

However, if you access the same route with a valid Authorization header:

```sh
curl http://localhost:8080/wall -H 'Authorization: Bearer '$auth
```

You should receive a simple text response:

```
"Congrats, you're in!"
```

### Complete example

```js
const hadron = require('@brainhubeu/hadron-core').default;
const express = require('express');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dependencies = [
  require('@brainhubeu/hadron-auth'),
  require('@brainhubeu/hadron-express'),
  require('@brainhubeu/hadron-typeorm'),
];

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

const userSchema = {
  name: 'user',
  columns: {
    id: { primary: true, generated: true, type: 'int' },
    username: { unique: true, type: 'varchar' },
    hash: { type: 'varchar' },
  },
  relations: {
    roles: {
      target: 'role',
      type: 'many-to-many',
      joinTable: { name: 'user_role' },
    },
  },
};

const roleSchema = {
  name: 'role',
  columns: {
    id: { primary: true, generated: true, type: 'int' },
    name: { type: 'varchar' },
  },
};

const config = {
  connection: {
    connectionName: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: process.env.DATABASE_PW,
    database: 'authdemo',
    entitySchemas: [userSchema, roleSchema],
    synchronize: true,
  },
  authSecret: process.env.JWT_SECRET,
  routes: {
    userRegister: {
      path: '/user/register',
      methods: ['POST'],
      callback: async (req, { authSecret, userRepository, roleRepository }) => {
        try {
          // Get username and password from the request.
          const { username, password } = req.body;

          // Check if that username exists.
          const userExists = await userRepository.findOne({ username });
          if (userExists) {
            return { status: 400, body: { error: 'Username already in use.' } };
          }

          // Find the user role.
          const userRole = await roleRepository.findOne({ name: 'user' });

          // Hash the password.
          const hash = await bcrypt.hash(password, 10);

          // Save the user into a database.
          const user = await userRepository.save({ username, hash, roles: [userRole] });

          // Create a JSON web token.
          const token = jwt.sign(user.id, authSecret);

          // Add it to our user
          user.authorization = `Bearer ${token}`;

          // Delete the hashed password before returning the user.
          delete user.hash;

          // Return the user.
          return { status: 201, body: user };
        } catch (error) {
          console.error(error);
          return { status: 400, body: { error: 'Bad request.' } };
        }
      },
    },
    userLogin: {
      path: '/user/login',
      methods: ['POST'],
      callback: async (req, { authSecret, userRepository }) => {
        try {
          // Get username and password from the request.
          const { username, password } = req.body;

          // Check if that username exists.
          const user = await userRepository.findOne({
            where: { username },
            relations: ['roles'],
          });
          if (!user) {
            return { status: 401, body: { error: 'User not found.' } };
          }

          // Check if the password hashes match.
          const match = await bcrypt.compare(password, user.hash);
          if (!match) {
            return { status: 401, body: { error: 'Invalid password.' } };
          }

          // Create a JSON web token.
          const token = jwt.sign(user.id, authSecret);

          // Add it to our user.
          user.authorization = `Bearer ${token}`;

          // Delete the hashed password before returning the user.
          delete user.hash;

          // Return the user.
          return { status: 201, body: user };
        } catch (error) {
          return { status: 400, body: { error: 'Bad request.' } };
        }
      },
    },
    secretRoute: {
      path: '/wall',
      methods: ['GET'],
      callback: () => 'Congrats, you\'re in!',
    },
  },
  securedRoutes: [
    {
      path: '/wall',
      roles: ['user'],
    },
  ],
};

hadron(app, dependencies, config).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
```

## Authorization middleware

The hadron-auth's default authorization middleware uses a JSON web token with the user ID encoded in it to authorize users based on their roles. The middleware verifies the Bearer token provided in the Authorization request header and, if valid, lets the user through.

Generally speaking, the default middleware makes certain assumptions about your application's architecture and in certain cases it may not be precisely the solution you need. For that, hadron-auth allows for defining your own authorization middleware.

To use a custom authorization middleware, define it in the config as follows:

```js
const config = {
  authorizationMiddleware: (container) => {
    return (req, res, next) => {
      // custom authorization logic
    }
  }
}
```

Note that this is essentially a raw Express middleware. To prevent authorization you can immediately return appropriate HTTP statuses using the `http.response` syntax.

```js
return res.status(401).json({ error: 'Authorization failed.' });
// or
return res.status(403).json({ error: 'You can\'t access this resource.' });
```

If, on the other hand, you want the authorization to succeed just return `next()`.

To simplify working with paths and roles, hadron-auth exposes two utility functions (that can be `require`d from the hadron-auth module).

- `isRouteNotSecure(path)` checks if `path` even exists in the `securedRotes` key.
- `isAllowed(path, method, user, allRoles)` checks if the user is allowed access to the route where:
  - `path` is the route path (usually `req.path`)
  - `method` is the route method (usually `req.method`)
  - `user` is the user object that has the `roles` key (see [Schemas](#schemas))
  - `allRoles` is an array of names of all roles in the database

The following is an example of an authorization middleware structure using the utility functions:

```js
const config = {
  authorizationMiddleware: (container) => async (req, res, next) => {
    try {
      if (isRouteNotSecure(req.path)) {
        return next();
      }

      const userRepository = container.take('userRepository');
      const roleRepository = container.take('roleRepository');

      // const user = await userRepository.find(req.body.id);
      
      const roles = await roleRepository.find();
      const allRoles = roles.map(role => role.name);
      
      if (isAllowed(req.path, req.method, user, allRoles)) {
        return next();
      }

      return res.status(403).json({ error: 'You cannot access this resource.' });
    } catch (error) {
      return res.status(401).json({ error: 'Authorization unsuccessful.' });
    };
  },
};
```
