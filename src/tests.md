#unit testing
#integration tests
#end-to-end tests
To run end to end tests, use this command in terminal:
```
$ npm run test:e2e
```

**Scenarios**

* **Given**

Setting header values
```
Given I set header "header-name" with value "header-value"

ex.
Given I set header "content-type" with value "application/json"
```

* **When**

Sending request
```
When I send a "METHOD" request to "/path"

ex.
When I send a "GET" request to "/"
When I send a "post" request to "/post/"
```

Sending request with body
```
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
```
Then the response code should be 200
```

Checking response body
```
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
```
Feature: Feature name

  Feature description

  Scenario: Simple GET request
    When I send a "GET" request to "/"
    Then the response code should be 200
```