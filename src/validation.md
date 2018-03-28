#Validation Layer

##Installation
Install **hadron-validation** module from npm (TODO)
```bash
    $npm install --save hadron-json-provider
```
##Usage
To use validation layer first you need to provide some schemas.
When your schemas are ready you need to build object from them, where **key name** is a name of the schema.
After you create schemas object you can create validate function from **hadron validator factory**.

#### Example schema
insertUser.json
```json
    {
        "type": "object",
        "properties": {
            "id": {
            "type": "number"
            },
            "name": {
            "type": "string"
            },
            "team": {
                "$ref": "team"
            },
        },
        "required": ["name", "team"],
        "additionalProperties": false
    }
```
Full documentation about schema keyword: [Ajv documentation](https://epoberezkin.github.io/ajv/)

#### Schemas creation
```js
    //schemas.js
    const insertTeam = require('./team/insertTeam.json');
    const updateTeam = require('./team/updateTeam.json');
    const insertUser = require('./user/insertUser.json');
    const updateUser = require('./user/updateUser.json');

    const schemas = {
        insertTeam,
        updateTeam,
        insertUser,
        updateUser,
    };

    module.exports = schemas;
```

#### Validate function
```js
    //validate.js
    const validatorFactory = require('hadron/validation');
    const schemas = require('./schemas');

    module.exports = validatorFactory(schemas);

```

## Example
After you created validate function with **hadron validator factory** you can use it to validate object by schemas you provide.
```js
    const validObject = {
        name: 'Max',
        age: 22
    };

    validate('schemaName', objectToValidate).then(validObject => {
        console.log('I am a valid object', validObject);
    }).catch(error => {
        console.log('Object is invalid', error);
    });
```
Validate function passes valid object, otherwise it throws an error.


