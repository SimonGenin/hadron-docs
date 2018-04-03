# Serializer

## What is Serializer?
Serializer allows You to quickly and easy shape and parse data way You want it. You just need to create schema (in json file, or as simple object) and You are ready to go!

## Installation
Install **Serializer** module from npm
```bash
    $npm install --save @brainhubeu/hadron-serializer
```

and include it to hadron packages

```javascript
  import * as hadronSerializer from '@brainhubeu/hadron-serializer';

  hadron(express, [
    // ...
    hadronSerializer,
  ], config);
```

That way, You should be able to get it from [Container](/core/#dependency-injection) like that:

```javascript
  const serializer = container.take('serializer');
  serializer.addSchema({
    name: 'User',
    properties: [ ... ],
  });

  // ...

  const data = { ... };
  serializer.serialize(data, 'User');
  // or
  const data = new User();
  serializer.serialize(data);
```

You can also use it without Container. Just import `serializerProvider` function from package and pass there Your [schemas](#schema) and parsers.

```javascript
  import serializerProvider from '@brainhubeu/hadron-serializer';

  const serializer = serializerProvider({
    schemas: mySchemas,
    parsers: {
      superParser: (value) => `Super ${value}`,
    },
    // ...
  });

```

## Configuration

If You are using hadron application, You just need to add to it's config schamas and set of parsers:

```javascript
const config = {
  // ...
  serialization: {
    schemas: [ ... ],
    parser: [ ... ],
  }
};
```

If You are using TypeScript, You can just implement exported interface `ISerializerConfig`

```typescript
interface ISerializerConfig {
  parsers?: object;
  schemas?: ISerializationSchema[];
}
```

## Usage

Serializer contain three methods.

- `serialize(data, groups, schemaName)` with three arguments:
    * `data` - object we want to serialize
    * `groups` - optional array of access [groups](#groups), on default `[]`
    * `schemaName` - name of schema, on default name of passed object
- `addSchema(schemaObj)` - [schema](#schema) object we want to add
- `addParser(parser, name)` - adds parser that can be used in schams, where:
    * `parser` is a method
    * `name` is name under which parser will be available

## Schema
<div id="schema" />
Schema is basic structure, that allows You to easily define your desired object. You can porovider them as `json` file. F.e.

```json
{
    "name": "User",
    "properties": [
        { "name": "name", "type": "string" },
        { "name": "address", "type": "string", "groups": ["admin"] },
        { "name": "money", "type": "number", "parsers": ["currency"], "groups": ["admin"]},
        {
            "name": "friends",
            "type": "array",
            "properties": [
                { "name": "name", "type": "string" },
                { "name": "profession", "type": "string", "groups": ["admin"] },
                { "name": "salary", "type": "number", "parsers": ["currency"] }
            ]
        }
    ]
}
```

Each schema should contain `name`, which will be its identifier, and `properties` which should be an array of fields of defined schema.

All properties that are not defined in schema, will be excluded from the serialized data result.

If You are using TypeScript, You can just implement exported interface `ISerializationSchema`

```typescript
interface ISerializationSchema {
  name: string;
  properties: IProperty[];
}
```

## Property
<div id="property" />
Each property should contain such fields:

- `name` - (required) name of the field
- `type` - (required) one of such types:
    * `string`
    * `number`
    * `bool`
    * `array`
    * `object`
- `groups` - array of strings, that will define accessibility to this field ([link](#groups)). If empty, such field if public and will be returned always.
- `parsers` - array of parsers name, that should be run on this field, before it's returned
- `properties` - array of properties, that are required in case of type `object` and `array`
- `serializedName` - name of field after serialization

If You are using TypeScript, You can just implement exported interface `IProperty`

```typescript
interface IProperty {
  name: string;
  type: string;
  serializedName?: string;
  groups?: string[];
  parsers?: string[];
  properties?: IProperty[];
}
```

## Groups
<div id="groups" />
While defining schema, You can add `groups` parameter to properties. That way, while serializing data, You can specify serialization group.

```javascript
const schema = {
  name: 'User',
  properties: [
    // ...
    { name: 'firstname', type: 'string' },
    { name: 'lastname', type: 'string', groups: ['friends'] }
  ],
}
serializer.addSchema(schema);

// ...

const data = {
  firstname: 'John',
  lastname: 'Doe',
  id: 481,
};

console.log(serializer.serialize(data, [], 'User');
// { 'firstname': 'John' }

console.log(serializer.serialize(data, ['friends'], 'User');
// { 'firstname': 'John', 'lastname': 'Doe' }

```
