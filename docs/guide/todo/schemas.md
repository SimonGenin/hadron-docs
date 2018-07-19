## Schemas

To actually start interacting with the database you'll have to create a model. TypeORM has two ways of building models: entities with decorators or entity schemas with JSON. Since decorators are not a part of JavaScript yet, they require additional build tools like Babel. Because of that, we'll use entity schemas with JSON.

Let's add a `todoSchema` to our app:

```js
const todoSchema = {
  name: 'todo',
  columns: {
    id: { primary: true, generated: true, type: 'int' },
    content: { type: 'varchar' },
    done: { type: 'tinyint' },
    date: { type: 'timestamp' },
  },
};
```

We also have to include it in the `entitySchemas` key of our config:

```js
  connection: {
    // ...
    entitySchemas: [todoSchema],
    // ...
  },
```

`hadron-typeorm` will automatically create TypeORM repositories and insert them into the dependency injection container. You can retrieve them inside the route callbacks.

