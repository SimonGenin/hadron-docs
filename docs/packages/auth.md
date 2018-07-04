## Installation

```bash
npm install @brainhubeu/hadron-auth --save
```

## Overview

**hadron-auth** provides a back-end authorization layer for routes you choose.

### Configuration with Hadron Core

If you want to use **hadron-auth** with **hadron-core**, you should also import **hadron-typeorm** and **hadron-express**. All you need to provide is two schemas for TypeORM:

* `User` (id, username, and roles many-to-many relationship required)
  Here is an example schema:

```javascript
// schemas/User
const userSchema = {
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    passwordHash: {
      type: 'varchar',
    },
    addedOn: {
      type: 'timestamp',
    },
  },
  relations: {
    roles: {
      target: 'Role',
      type: 'many-to-many',
      joinTable: {
        name: 'user_role',
      },
      onDelete: 'CASCADE',
    },
  },
};

module.exports = userSchema;
```

* `Role` (id and name required)
  Example schema:

```javascript
// schemas/Role
const roleSchema = {
  name: 'Role',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      unique: true,
    },
    addedOn: {
      type: 'timestamp',
    },
  },
};

module.exports = roleSchema;
```

Don't forget to add schemas to your database config, example below:

```javascript
// config/db.js
const userSchema = require('../schemas/User');
const roleSchema = require('../schemas/Role');

const connection = {
  name: 'mysql-connection',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'my-secret-pw',
  database: 'done-it',
  entitySchemas: [roleSchema, userSchema],
  synchronize: true,
};

module.exports = connection,
```

Now you need to prepare your Hadron configuration file where you can add secured routes, for example:

```javascript
// index.js
const config = {
  routes: {
    helloWorldRoute: {
      path: '/',
      methods: ['GET'],
      callback: () => 'Hello World',
    },
    adminRoute: {
      path: '/admin',
      methods: ['GET'],
      callback: () => 'Hello Admin',
    },
    userRoute: {
      path: '/user',
      methods: ['GET'],
      callback: () => 'Hello User',
    },
  },
  securedRoutes: [
    {
      path: '/admin/*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      roles: 'Admin',
    },
    {
      path: '/user/*',
      roles: ['Admin', 'User'],
    },
  ],
};
```

Finally you need to add **hadron-auth** to the Hadron initialization method:

```javascript
const hadron = require('@brainhubeu/hadron-core').default;
const hadronExpress = require('@brainhubeu/hadron-express');
const hadronTypeOrm = require('@brainhubeu/hadron-typeorm');
const hadronAuth = require('@brainhubeu/hadron-auth');
const express = require('express');

const expressApp = express();

const hadronInit = async () => {
  const config = {
    routes: {
      helloWorldRoute: {
        path: '/',
        methods: ['GET'],
        callback: () => 'Hello World',
      },
      adminRoute: {
        path: '/admin',
        methods: ['GET'],
        callback: () => 'Hello Admin',
      },
      userRoute: {
        path: '/user',
        methods: ['GET'],
        callback: () => 'Hello User',
      },
    },
    securedRoutes: [
      {
        path: '/admin/*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        roles: 'Admin',
      },
      {
        path: '/user/*',
        roles: ['Admin', 'User'],
      },
    ],
  };

  const container = await hadron(
    expressApp,
    [hadronAuth, hadronExpress, hadronTypeOrm],
    config,
  );
};
```

---

> **Warning:** You should include hadronAuth first to the Hadron packages array.

Now your routes are secured. By default, **hadron-auth** authorizes users by a **JSON web woken**, passed as `Authorization` header.

### Creating a custom auth middleware

You can pass your own function in the Hadron configuration to check if a user is authorized to the secured route.
Here is the skeleton for the authorization middleware:

```javascript
const authorizationMiddleware = (container) => {
  return (req, res, next) => {};
};
```

**hadron-auth** provides the `isAllowed` function, to check if a user is allowed to access a specific route:

```javascript
isAllowed(path, method, user, allRoles);
```

Where:

* `path` - path to a secured route, for example `/api/admin/`
* `method` - HTTP method
* `user` - User object, which has to contain roles
* `allRoles` - All roles stored in the database (only role names).

Here is an example of the authorization middleware:

```javascript
const jwt = require('jsonwebtoken');
const { isRouteNotSecure, isAllowed } = require('@brainhubeu/hadron-auth');

const errorResponse = {
  message: 'Unauthorized',
};

const expressMiddlewareAuthorization = (container) => {
  return async (req, res, next) => {
    try {
      if (isRouteNotSecure(req.path)) {
        return next();
      }

      const userRepository = container.take('userRepository');
      const roleRepository = container.take('roleRepository');

      const token = req.headers.authorization;

      const decoded: any = jwt.decode(token);

      const user = await userRepository.findOne({
        where: { id: decoded.id },
        relations: ['roles'],
      });

      if (!user) {
        return res.status(403).json({ error: errorResponse });
      }

      const allRoles = await roleRepository.find();

      if (
        isAllowed(req.path, req.method, user, allRoles.map((role) => role.name))
      ) {
        return next();
      }

      return res.status(403).json({ error: errorResponse });
    } catch (error) {
      return res.status(403).json({ error: errorResponse });
    }
  };
};

module.exports = expressMiddlewareAuthorization;
```

To use it, you need to pass an expressMiddlewareAuthorization function as `authorizationMiddleware` key in hadron config.

```javascript
const config = {
  authorizationMiddleware: YourCustomFunction,
};
```

### Usage:

```javascript
const securedRoutes = [
  {
    path: '/api/**',
    methods: ['GET'],
    roles: ['Admin', 'User'],
  },
  {
    path: '/api/**',
    methods: ['POST', 'PUT', 'DELETE'],
    roles: 'Admin',
  },
  {
    path: '/admin/*',
    roles: 'Admin',
  },
  {
    path: 'product/info',
    methods: ['GET'],
    roles: [['Admin', 'User'], 'Manager'],
  },
];
```

* `path` - here we can specify the route path we want to secure, we can use a static path like `/api/admin/tasks` or by pattern:
  * `/api/admin/*` - route after `/api/admin/` is secure, for example `/api/admin/tasks` is secure, but `/api/admin/tasks/5` will be not secure
  * `/api/admin/**` - every route after `/api/admin` is secure
* `methods` - an array of strings, where you can pass role names. If you don't provide any roles, the route will be secure but a user with **any** role. If the user has no roles, he or she will not be authorized.
* `roles` - here you can pass a single role name, an array of role names or an array of arrays of strings, which add some logic functionality. For example, if we declare:

```javascript
roles[(['Admin', 'User'], 'Manager')];
```

The user needs the **Admin and User** roles or the **Manager** role to access the route.
