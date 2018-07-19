## Database integration

Okay, nice! You have a working http server on Hadron! Now, let's integrate it with a database. Hadron comes with a package called `hadron-typeorm` that integrates our routes with [TypeORM](http://typeorm.io/#/). The simplest way to use it is with a MySQL database. You don't need to know SQL to do basic operations with TypeORM.

You can find details on installing MySQL in the [official docs](https://dev.mysql.com/doc/refman/8.0/en/installing.html), however here's the abridged version:

```sh
# Ubuntu
sudo apt install mysql-server
sudo service mysql start
mysql -u root -p
```

```sh
# macOS
brew install mysql
brew services start mysql
mysql -u root -p
```

Once you've entered the root password and started the `mysql` prompt, create a database and exit the prompt.

```sql
create database todos;
quit;
```

Now add `hadron-typeorm` and `mysql`:

```sh
npm install --save @brainhubeu/hadron-typeorm mysql
```

You also need to include it in your dependencies:

```js
// index.js
const dependencies = [
  require('@brainhubeu/hadron-express'),
  require('@brainhubeu/hadron-typeorm'),
];
```

Now when your server restarts you will get an error informing you that you haven't specified connection options to the database. Let's edit the config object:

```js
const config = {
  connection: {
    connectionName: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'todos',
    entitySchemas: [],
    synchronize: true,
  },
  // ...
};
```

These are the default options for MySQL server and should work. If you configured something differently while setting up the MySQL server you will have to specify that in this config.

