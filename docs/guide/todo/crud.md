## CRUD operations

Let's make some routes. Inside the `routes` object in your config create routes to manipulate todos.

```js
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
```

Before you can send any data to this route you'll need to require Express body parser:

```sh
npm install --save body-parser
```

```js
const bodyParser = require('body-parser');
// ...
app.use(bodyParser.json());
```

Now if you send a request to that endpoint you should receive a created object in return:

```sh
curl http://localhost:8080/todo/create \
-X POST \
-H "Content-Type: application/json" \
-d '{"content": "Walk the dog."}'

> {"content":"Walk the dog.","done":false,"date":"2018-07-18T08:58:17.484Z","id":3}
```

You can also create two routes to retrieve todos: all of them or by id:

```js
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
```
Now if you try to request them you should get data as expected.

```sh
curl http://localhost:8080/todo/getAll

> [{"id":1,"content":"Walk the dog.","done":0,"date":"2018-07-18T08:52:49.000Z"},{"id":2,"content":"Tidy up the office","done":0,"date":"2018-07-18T08:56:20.000Z"}]
```
```sh
curl http://localhost:8080/todo/get/1

> {"id":1,"content":"Walk the dog.","done":0,"date":"2018-07-18T08:52:49.000Z"}
```

Let's create the remaining routes: to update a todo and delete it.

```js
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

        // You don't want to change values that weren't specified.
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
        // Coerce the id into a Number,
        // otherwise typeorm throws an error.
        await todoRepository.remove({ id: Number(id) });
        return { status: 204 };
      },
    },
```

Now you have a working backend for a todo app that you can extend with other Hadron functionalities.

