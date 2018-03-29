**WIP**

- **We cannot import hadron-typeorm, we need to require it inside an array of sub packages inside constructor**
- **Also events aren't included in this section so logging into the console is done using setTimeout!**
---


### TypeORM installation
Install **hadron-typeorm** package using npm
```bash
$ npm install --save hadron-typeorm
```

Import **hadron-typeorm** package into our *index.js* file and include it inside hadron constructor:
```javascript
// index.js

// [...]

hadron(app, [
  import('../hadron-typeorm'),
], config).then(container => {
  console.log('Hadron with typeORM initialized')
})
```

### Connecting to database
You can set up a new connection using **createDatabaseConnection** helper function which is available in hadron-typeorm package. Instead you can simply use [connection object](https://github.com/typeorm/typeorm/blob/master/docs/connection.md#creating-a-new-connection).
```none
createDatabaseConnection()
  connectionName: string, 
  databaseType: string,
  host: string, 
  port: number,
  user: string, 
  password: string, 
  databaseName: string,
)
```
So setting up a mysql conection would look something like that:
```javascript
import { createDatabaseConnection } from 'hadron-typeorm'

const connection = createDatabaseConnection(
    'mysqlConn', 'mysql', 'localhost', 3306, 'root', 'my-secret-pw', 'test'
  );
```
#### Including database connection in hadron
Since we have our connection, we need to include it inside our hadron constructor's config object. It actually accepts array of connections.
```javascript
const config = {
  connections: [connection]
}

hadron(app, [
  hadronTypeORM
], config).then(container => {
  console.log('Number of connections stored in container:');

  setTimeout(() => {
    console.log(container.take('connections').length);
  }, 500);
})
```


### Entities
Let's assume we want to have a simple table **user**

| Field      | Type    |
| ---------- | ------- |
| 🔑 id      | int     |
| firstName  | varchar |
| lastName   | varchar |

We can define our *entity*, like this:
```javascript
// entity/User.js
module.exports = {
  name: "User",
  columns: {
    id: {
        primary: true,
        type: "int",
        generated: true
    },
    firstName: {
        type: "string"
    },
    lastName: {
      type: "string"
    },
  },
};
```

##### Injecting entities into hadron
To include our entities in hadron, we simply need to include them in our config object.
Let's modify the code that we were using to initialize hadron:
```javascript
import User from './entity/User';

const config = {
  connections: [connection],
  entities: [User],
}

hadron(app, [
  hadronTypeORM
], config).then(container => {
  console.log('userRepository available:');
  // User entity should be declared under userRepository key and
  // will be available as a typeORM repository
  setTimeout(() => {
    console.log(container.take('userRepository') !== null);
  }, 500);
})
```