**Hadron's purpose is to facilitate the building of Node.js applications:**

### Low-level framework-agnostic

Your application is built independently from other frameworks (Express, Koa). Hadron creates a layer between HTTP requests and your app written in plain Javascript.

Hadron abstracts away underlying request and response objects, providing simple data structures as input/output of your routes' handlers, making them simple to test and easy to deal with.

### Dependency injection

The dependency injection pattern enables you to easily change interface implementation. Hadron gives us the power to create SOLID applications.

Containers as a dependency management solution provides a convenient way to access all dependencies in functions.

### Modular structure

The modular structure enables you to add/remove packages or create your own extensions. Hadron provides a complete solution for request processing using separate packages.

Current packages:
* security management
* input validation
* database integration (through TypeORM)
* data serialization
* logging
* events handling
* CLI tool

Built with TypeScript, but it's primary target is JavaScript apps. Hadron’s API embraces current ECMAScript standards, with the cherry of good IDE support via codebase types declarations on top.
