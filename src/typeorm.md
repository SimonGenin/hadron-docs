## TypeORM

---
ACHTUNG  
**We cannot import hadron-typeorm, we need to require it inside array of subpackages inside constructor**

---

```javascript
// index.js
import * as bodyParser from 'body-parser';
import express from 'express';
import hadron from '../brainhub-framework-app/dist/hadron-core';
import hadronTypeORM from '../brainhub-framework-app/dist/hadron-typeorm';

const port = process.env.PORT || 8080;
const expressApp = express();
expressApp.use(bodyParser.json());

hadron(expressApp, [
  Promise.resolve(hadronTypeORM)
], {}).then(container => {
  console.log('Hadron initialized');
});

expressApp.listen(port);
```

### TypeORM installation
Install **hadron-typeorm** package using npm
```bash
$ npm install --save hadron-typeorm
```

Import **hadron-typeorm** package into our *index.js* file and include it inside hadron constructor:
```javascript
// index.js
import hadronTypeORM from 'hadron-typeorm'

// [...]

hadron(app, [
  hadronTypeORM
], config).then(container => {
  console.log('Hadron with typeORM initialized')
})
```

### Connecting to database using typeORM and hadron
You can set up a new connection using **createDatabaseConnection** helper function which is available in hadron-typeorm package.
```none
createDatabaseConnection()
  connectionName: string, 
  databaseType: string,
  host: string, 
  port: number,
  user: string, 
  password: string, 
  databaseName: string,
  ? pathsToEntities: [string],    // default: []
  ? pathsToMigrations: [string],  // default: []
  ? pathToSubscribers: [string]   // default: []
)
```
So setting up a mysql conection would look something like that:
```javascript
import hadronTypeORM, { createDatabaseConnection } from 'hadron-typeorm'

const connection = createDatabaseConnection(
    'mysqlConn', 'mysql', 'localhost', 3306, 'root', 'my-secret-pw', 'test',
    ['./entity/*.ts'],
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


### hadron-typeORM with entities
