Hodron is a high level Node.js framework on top of Express microframework (with other microframeworks support coming in the future).

It abstracts away underlying request and response objects, providing simple data structures as input and output of your routes' handlers, making them trivial to test and easy to deal with.

It uses dependency injection container as a central dependency management solution. It provides convenient way to access all dependencies in handler functions.

Hadron has a modular structure, in addition to core functionalities mentioned above we provide complete solution for requests processing via separate packages:

- security management
- input validation
- database integration (through Typeorm)
- data serialization
- logging
- events handling
- cli commands

Hadron is built with TypeScript, but it's primary target are JS apps - we build our API to embrace current EcmaScript standards, with cherry on top in the form of good IDE support via codebase types declarations.