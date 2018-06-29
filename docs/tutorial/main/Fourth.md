## Authorization with hadron-auth
Installation:
```bash
npm install --save @brainhubeu/hadron-auth
```

To use hadron-auth, all we need to do is to add hadronAuth to hadron core in `src/index.js`:

```javascript
// src/index.js
import express from 'express';
import hadron from '@brainhubeu/hadron-core';
import jsonProvider from '@brainhubeu/hadron-json-provider';
import * as hadronExpress from '@brainhubeu/hadron-express';
import * as hadronAuth from '@brainhubeu/hadron-auth';
import * as hadronTypeOrm from '@brainhubeu/hadron-typeorm';
import db from './config/db';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

const port = process.env.PORT || 4000;
const expressApp = express();

expressApp.use(cors());
expressApp.use(bodyParser.json());

const server = http.createServer(expressApp);

const hadronInit = async () => {
    const routes = await jsonProvider([`${__dirname}/routes/*`], ['js']);

    const config = {
        ...db,
        routes,
    };

    const container = await hadron(expressApp,
            [hadronAuth, hadronTypeOrm, hadronExpress], config);

    expressApp.use((req, res, next) => {
        return res.status(404).json({
            error: {
                message: 'Not Found.',
            },
        });
    });

    server.listen(port, () => {
        expressApp.emit('appStarted');
        console.log(`Listening on http://localhost:${port}`);
    });
};

hadronInit();
```

---
WARNING, don't forget to add `hadronAuth` first in the package array.

---

To secure routes, we need to add the `securedRoutes` key in the config, which is an array of objects, for example:

```javascript
const config = {
        ...db,
        routes,
        securedRoutes: [
            {
                path: '/api/role/**',
                roles: 'Admin',
            },
            {
                path: '/api/task/**',
                methods: ['GET'],
                roles: ['Admin', 'User'],
            },
            {
                path: '/api/task/**',
                methods: ['POST', 'PUT', 'DELETE'],
                roles: 'Admin',
            }
        ]
    };
```

If we don't specify `methods` then all HTTP methods will be secured.

Now let's write a simple middleware for login:

```javascript
import { unauthorized } from '../services/responses';
import validate from '../validation/validate';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || `H4DR0N_S3CUR17Y`;

export const loginMiddleware = async (req, { userRepository }) => {
    try {
        const data = await validate('login', req.data);
        const user = await userRepository.findOne({ where: { username: data.username } });

        if (!user) {
            return unauthorized(`Unauthorized`);
        }

        const validPassword = await bcrypt.compare(data.password, user.passwordHash);

        if (validPassword) {
            const token = jwt.sign({
                id: user.id,
                username: user.username,
            }, secret, { expiresIn: '2h' });

            return {
                status: 200,
                body: {
                    token,
                },
            };
        }

        return unauthorized('Unauthorized');

    } catch (error) {
        return unauthorized(`Unauthorized`);
    }
};

export default loginMiddleware;

```