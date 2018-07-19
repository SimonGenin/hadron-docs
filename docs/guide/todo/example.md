## Complete example

```js
const hadron = require('@brainhubeu/hadron-core').default;
const express = require('express');
const bodyParser = require('body-parser');

const dependencies = [
  require('@brainhubeu/hadron-express'),
  require('@brainhubeu/hadron-typeorm'),
];

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

const todoSchema = {
  name: 'todo',
  columns: {
    id: { primary: true, generated: true, type: 'int' },
    content: { type: 'varchar' },
    done: { type: 'tinyint' },
    date: { type: 'timestamp' },
  },
};

const config = {
  connection: {
    connectionName: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'todos',
    entitySchemas: [todoSchema],
    synchronize: true,
  },
  routes: {
    helloWorld: {
      path: '/',
      methods: ['GET'],
      callback: () => 'Hello world!',
    },
    createTodo: {
      path: '/todo/create',
      methods: ['POST'],
      callback: async (request, { todoRepository }) => {
        const { content } = request.body;
        const todo = {
          content,
          done: false,
          date: new Date(),
        };

        const savedTodo = await todoRepository.save(todo);

        return { status: 201, body: savedTodo };
      },
    },
    getAllTodos: {
      path: '/todo/getAll',
      methods: ['GET'],
      callback: async (request, { todoRepository }) => {
        const todos = await todoRepository.find();
        return { status: 200, body: todos };
      },
    },
    getTodoById: {
      path: '/todo/get/:id',
      methods: ['GET'],
      callback: async (request, { todoRepository }) => {
        const { id } = request.params;
        const todo = await todoRepository.findOne({ id });

        if (!todo) {
          return { status: 404, body: { error: 'Todo not found!' } };
        }

        return { status: 200, body: todo };
      },
    },
    updateTodo: {
      path: '/todo/update/:id',
      methods: ['PUT'],
      callback: async (request, { todoRepository }) => {
        const { id } = request.params;
        const { content, done } = request.body;

        let todo = await todoRepository.findOne({ id });
        if (!todo) {
          return { status: 404, body: { error: 'Todo not found!' } };
        }

        // We don't want to change values that weren't added.
        console.log(content, done);
        todo.content = content !== undefined ? content : todo.content;
        todo.done = done !== undefined ? done : todo.done;

        todo = await todoRepository.save(todo);

        return { status: 200, body: todo };
      },
    },
    deleteTodo: {
      path: '/todo/delete/:id',
      methods: ['DELETE'],
      callback: async (request, { todoRepository }) => {
        const { id } = request.params;
        await todoRepository.remove({ id: Number(id) });
        return { status: 204 };
      },
    },
  },
};

hadron(app, dependencies, config).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
```
