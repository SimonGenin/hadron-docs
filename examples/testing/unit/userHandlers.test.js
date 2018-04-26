import { expect } from "chai";
import { fetchUser, fetchUsers } from "./userHandlers";
import { UserNotFoundError } from "./errors";
import sinon from "sinon";

describe("fetchUser request handler", () => {
  it("returns response spec with user data", async () => {
    const requestStub = {
      params: {
        id: 1
      }
    };

    const dependenciesStub = {
      userRepository: {
        byId(id) {
          return Promise.resolve({
            id,
            name: "Stranger"
          });
        }
      }
    };

    const expected = {
      body: {
        id: 1,
        name: "Stranger"
      }
    };

    const actual = await fetchUser(requestStub, dependenciesStub);

    expect(actual).to.deep.equal(expected);
  });

  it("returns response spec with error when there is no user with provided ID", async () => {
    const requestStub = {
      params: {
        id: 1
      }
    };

    const dependenciesStub = {
      userRepository: {
        byId(id) {
          return Promise.reject(new UserNotFoundError());
        }
      }
    };

    const expected = {
      status: 400,
      body: {
        message: "User with id 1 not found"
      }
    };

    const actual = await fetchUser(requestStub, dependenciesStub);

    expect(actual).to.deep.equal(expected);
  });
});

describe("fetchUsers request handler", () => {
  const dependenciesStub = {
    userRepository: {
      all() {
        return Promise.resolve([
          { id: 1, name: "Stranger1" },
          { id: 2, name: "Stranger2" },
          { id: 3, name: "Stranger3" }
        ]);
      }
    },
    logger: {
      info: sinon.spy()
    }
  };

  it("returns response spec with users data", async () => {
    const expected = {
      body: [
        { id: 1, name: "Stranger1" },
        { id: 2, name: "Stranger2" },
        { id: 3, name: "Stranger3" }
      ]
    };

    const actual = await fetchUsers({}, dependenciesStub);

    expect(actual).to.deep.equal(expected);
  });

  it("calls logger with result info", async () => {
    await fetchUsers({}, dependenciesStub);

    expect(dependenciesStub.logger.info.calledWith('Fetched 3 users')).to.be.true;
  });
});
