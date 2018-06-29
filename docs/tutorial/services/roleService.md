### Role Service:

#### Imports:
```javascript
import { notFound, userError, serverError } from './responses';
import validate from '../validation/validate';
```

#### Insert:
```javascript
export const save = async (req, { roleRepository }) => {
    try {
        const data = await validate('insertRole', req.body);
        const role = await roleRepository.findOne({ where: { name: data.name } });

        if (role) {
            return userError(`Role: "${data.name}" already exists.`);
        }

        const savedRole = await roleRepository.save(data);

        return {
            status: 200,
            body: {
                savedRole,
            },
        };

    } catch (error) {
        return userError(error.message);
    }
};
```

#### Update:
```javascript
export const update = async (req, { roleRepository }) => {
    try {
        const data = await validate('insertRole', req.body);
        
        const role = await roleRepository.findOne({ where: { id: req.params.id } });

        if (!role) {
            return notFound(`Role with id: "${req.params.id}" does not exists.`);
        }

        role.name = data.name;

        const updatedRole = await roleRepository.save(role);

        return {
            status: 201,
            body: {
                updatedRole,
            },
        };

    } catch (error) {
        return userError(error.message);
    }
};
```

#### Find One By Id:
```javascript
export const findOneById = async (req, { roleRepository }) => {
    try {
        const role = await roleRepository.findOne({ where: { id: req.params.id } });

        if (!role) {
            return notFound(`Role with id: "${req.params.id}" does not exists.`);
        }

        return {
            status: 200,
            body: {
                role,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

#### Find One By Name:
```javascript
export const findOneByName = async (req, { roleRepository }) => {
    try {
        const role = await roleRepository.findOne({ where: { name: req.params.name } });

        if (!role) {
            return notFound(`Role with name: "${req.params.name}" does not exists.`);
        }

        return {
            status: 200,
            body: {
                role,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

#### Find All
```javascript
export const findAll = async (req, { roleRepository }) => {
    try {
        const roles = await roleRepository.find();

        return {
            status: 200,
            body: {
                roles,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
};
```

#### Remove:
```javascript
export const remove = async (req, { roleRepository }) => {
    try {
        const role = await roleRepository.findOne({ where: { id: req.params.id } });

        if (!role) {
            return notFound(`Role with id: "${req.params.id}" does not exists.`);
        }

        await roleRepository.removeById(role.id);

        return {
            status: 201,
            body: {
                removedRoleId: role.id,
            },
        };
    } catch (error) {
        return serverError(error.message);
    }
}
```

### Routes:
```javascript
import * as roleService from '../services/roleService';

const roleRoutes = () => {
    return {
        saveRole: {
            path: '/api/role',
            methods: ['POST'],
            callback: roleService.save,
        },
        updateRole: {
            path: '/api/role/:id',
            methods: ['PUT'],
            callback: roleService.update,
        },
        findRoleById: {
            path: '/api/role/:id',
            methods: ['GET'],
            callback: roleService.findOneById,
        },
        findRoleByName: {
            path: '/api/role/byName/:name',
            methods: ['GET'],
            callback: roleService.findOneByName,
        },
        findAllRoles: {
            path: '/api/role',
            methods: ['GET'],
            callback: roleService.findAll,
        },
        remove: {
            path: '/api/role/:id',
            methods: ['DELETE'],
            callback: roleService.remove,
        },
    };
};

module.exports = roleRoutes;
```

[Go back](/tutorial)