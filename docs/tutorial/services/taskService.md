### Task Service:

#### Imports:
```javascript
import { userError, serverError, notFound } from "./responses";
import validate from "../validation/validate";
```

#### Insert:
```javascript
export const save = async (req, { taskRepository }) => {
    try {
        const data = await validate('insertTask', req.body);

        const savedTask = await taskRepository.save(data);

        return {
            status: 201, 
            body: {
                savedTask,
            },
        };
    } catch (error) {
        return userError(error.message);
    }
};
```

#### Update:
```javascript
export const update = async (req, { taskRepository }) => {
    try {
        const data = await validate('insertTask', req.body);

        const task = await taskRepository.findOne({ where: { id: req.params.id } });

        if (!task) {
            return notFound(`Task with id: "${req.params.id}" does not exists.`);
        }

        task.description = data.description;
        task.userId = data.userId;
        task.completed = data.completed;

        const updatedTask = await taskRepository.save(task);

        return {
            status: 201,
            body: {
                updatedTask,
            }
        }
    } catch (error) {
        return userError(error.message);
    }
};
```

#### Set Task Status
```javascript
export const setTaskStatus = async (req, { taskRepository }) => {
    try {
        const task = await taskRepository.findOne({ where: { id: req.params.id } });

        if (!task) {
            return notFound(`Task with id: "${req.params.id}" does not exists.`);
        }

        task.completed = !task.completed;

        const updatedTask = await taskRepository.save(task);

        return {
            status: 201,
            body: {
                updatedTask,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};

```

#### Find One By Id:

```javascript
export const findOne = async (req, { taskRepository }) => {
    try {
        const task = await taskRepository.findOne({ where: { id: req.params.id } });

        if (!task) {
            return notFound(`Task with id: "${req.params.id}" does not exists.`);
        }

        return {
            status: 200,
            body: {
                task,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

#### Find All By User:

```javascript
export const findAllByUser = async (req, { taskRepository }) => {
    try {
        const tasks = await taskRepository.find({ where: { userId: req.params.userId } });

        return {
            status: 200,
            body: {
                tasks,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

#### Find All
```javascript
export const findAll = async (req, { taskRepository }) => {
    try {
        const tasks = await taskRepository.find();

        return {
            status: 200,
            body: {
                tasks,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

#### Remove:
```javascript
export const remove = async (req, { taskRepository }) => {
    try {
        const task = await taskRepository.findOne({ where: { id: req.params.id } });

        if (!task) {
            return notFound(`Task with id: "${req.params.id} does not exists.`);
        }
        
        await taskRepository.removeById(task.id);

        return {
            status: 201,
            body: {
                removedTaskId: task.id,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

### Routes:
```javascript
import * as taskService from '../services/taskService';

const taskRoutes = () => {
    return {
        saveTask: {
            path: '/api/task',
            methods: ['POST'],
            callback: taskService.save,
        },
        updateTask: {
            path: '/api/task/:id',
            methods: ['PUT'],
            callback: taskService.update,
        },
        setTaskStatus: {
            path: '/api/task/setStatus/:id',
            methods: ['GET'],
            callback: taskService.setTaskStatus,
        },
        findOneTaskById: {
            path: '/api/task/:id',
            methods: ['GET'],
            callback: taskService.findOne,
        },
        findAllTasksByUserId: {
            path: '/api/task/byUser/:id',
            methods: ['GET'],
            callback: taskService.findAllByUser,
        },
        findAllTasks: {
            path: '/api/task',
            methods: ['GET'],
            callback: taskService.findAll,
        },
        removeTask: {
            path: '/api/task/:id',
            methods: ['DELETE'],
            callback: taskService.remove,
        },
    };
}

module.exports = taskRoutes;
```

[Go back](/tutorial)