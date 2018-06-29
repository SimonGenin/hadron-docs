### User Service:

#### Imports:
```javascript
import { userError, serverError, notFound, unauthorized } from './responses';
import validate from '../validation/validate';
import bcrypt from 'bcrypt';
```

#### Insert:
```javascript
export const save = async (req, { userRepository }) => {
    try {
        const data = await validate('insertUser', req.body);

        const user = await userRepository.findOne({ where: { username: data.username } });

        if (user) {
            return userError(`User with username: "${data.username}" already exists.`);
        }

        data.password = await bcrypt.hash(data.password, 10);

        const savedUser = await userRepository.save(data);

        return {
            status: 201,
            body: {
                savedUser,
            },
        };

    } catch (error) {
        return userError(error.message);
    }
};
```

### Update:
```javascript
export const update = async (req, { userRepository }) => {
    try {
        const data = await validate('updateUser', req.body);

        const user = await userRepository.findOne({ where: { id: req.params.id } });

        if (!user) {
            return userError(`User with id: "${req.params.id}" does not exists.`);
        }

        const validPassword = await bcrypt.compare(data.oldPassword, user.passwordHash);

        if (!validPassword) {
            return unauthorized();
        }

        user.passwordHash = await bcrypt.hash(data.newPassword, 10);

        const updatedUser = await userRepository.save(user);

        return {
            status: 201,
            body: {
                updatedUser,
            },
        };
    } catch (error) {
        return userError(error.message);
    }
};
```

### Find One By Id:
```javascript
export const findOneById = async (req, { userRepository }) => {
    try {
        const user = await userRepository.findOne({ where: { id: req.params.id }, relations: ['roles'] });

        if (!user) {
            return notFound(`User with id: "${req.params.id}" does not exists.`);
        }

        return {
            status: 200,
            body: {
                user,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

### Find One By Username:
```javascript
export const findOneByUsername = async (req, { userRepository }) => {
    try {
        const user = await userRepository.findOne({ where: { username: req.params.username }, relations: ['roles'] });

        if (!user) {
            return notFound(`User with username: "${req.params.username}" does not exists.`);
        }

        return {
            status: 200,
            body: {
                user,
            },
        };

    } catch (error) {
        return serverError(error.message);
    }
};
```

### Find All:
```javascript
export const findAll = async (req, { userRepository }) => {
    try {
        const users = await userRepository.find({ relations: ['roles'] });

        return {
            status: 200,
            body: {
                users,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

### Remove:
```javascript
export const remove = async (req, { userRepository }) => {
    try {
        const user = await userRepository.findOne({ id: req.params.id });

        if (!user) {
            return notFound(`User with id: "${req.params.id}" does not exists`);
        }

        await userRepository.removeById(user.id);

        return {
            status: 201,
            body: {
                removedUserId: user.id,
            },
        };

    } catch (error) {
        return serverError(error.message);
    }
};
```

### Routes:
```javascript
import * as userService from '../services/userService';

const userRoutes = () => {
    return {
        insertUser: {
            path: '/api/user',
            methods: ['POST'],
            callback: userService.save,
        },
        updateUser: {
            path: '/api/user/:id',
            methods: ['PUT'],
            callback: userService.update
        },
        findOneById: {
            path: '/api/user/:id',
            methods: ['GET'],
            callback: userService.findOneById,
        },
        findOneByUsername: {
            path: '/api/user/byUsername/:username',
            methods: ['GET'],
            callback: userService.findOneByUsername,
        },
        findAllUsers: {
            path: '/api/user',
            methods: ['GET'],
            callback: userService.findAll,
        },
        removeUser: {
            path: '/api/user/:id',
            methods: ['DELETE'],
            callback: userService.remove,
        }
    };
};

module.exports = userRoutes;
```

[Go back](/tutorial)