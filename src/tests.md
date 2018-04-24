## Unit testing

You can write unit tests using standard testing frameworks like Mocha + Chai, Jest etc.

There is nothing special about testing application logic so we won't address this topic.

### Testing controllers (route callbacks)

Hadron makes it easy to unit test your controllers - your input request data is just a data structure, as well as returned request specification (optionally wrapped in promise). You can also easily stub your dependencies by providing fake dependencies as object as a second argument of the controller.

_Note: For our examples we will use Mocha + Chai_

---

Let's start with a simple controller with no external dependencies and no request specific data - for example request for a specific view i.e. `/about`.

Code under test:

```javascript
const getAboutPage = () => {
  return {
    view: {
      name: "about"
    }
  };
};
```

Test code:

```javascript
import { expect } from "chai";
import { getAboutPage } from "./staticViewHandlers";

describe("getAboutPage request handler", () => {
  it("returns response spec with proper view", () => {
    const expected = {
      view: {
        name: "about"
      }
    };

    const actual = getAboutPage();
    expect(actual).to.equal(expected);
  });
});
```

---

On next simple example we test dumb handler that echos request parameters. To test it in isolation all we need to do is to pass fake request structure and compare the result.

Code under test:

```javascript
const echo = ({ params, query }) => {
  return {
    body: { params, query }
  };
};
```

Test code:

```javascript
import { expect } from "chai";
import { echo } from "./dumbHandlers";

describe("echo request handler", () => {
  it("returns response spec with proper view", () => {
    const request = {
      params: {
        foo: "bar"
      },
      query: {
        baz: "bat"
      }
    };

    const expected = {
      body: {
        params: {
          foo: "bar"
        },
        query: {
          baz: "bat"
        }
      }
    };

    const actual = echo(request);
  });

  expect(actual).to.equal(expected);
});
```

## Integration tests

## End-to-end tests

To run end to end tests, use this command in terminal:

```sh
npm run test:e2e
```

### Scenarios

* **Given**

Setting header values

```feature
Given I set header "header-name" with value "header-value"

ex.
Given I set header "content-type" with value "application/json"
```

* **When**

Sending request

```feature
When I send a "METHOD" request to "/path"

ex.
When I send a "GET" request to "/"
When I send a "post" request to "/post/"
```

Sending request with body

```feature
When I send a "METHOD" request to "/path" with body:
  """
  {
    "name": "Wonderful coffee",
    "project": {
      "name": "Coffee"
    }
  }
  """

ex.
When i send a "PUT" request to "/users/add"
  """
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
  """
```

* **Then**

Checking response code

```feature
Then the response code should be 200
```

Checking response body

```feature
Then the JSON should match pattern
  """
  {
    "name": "Wonderful coffee",
    "project": {
      "name": "Coffee"
    }
  }
  """
```

Example e2e tests:

```feature
Feature: Feature name

  Feature description

  Scenario: Simple GET request
    When I send a "GET" request to "/"
    Then the response code should be 200
```
