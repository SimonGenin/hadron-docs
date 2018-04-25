import { expect } from "chai";
import { echo } from "./dumbHandlers";

describe("echo request handler", () => {
  it("returns response spec provided params", () => {
    const requestStub = {
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

    const actual = echo(requestStub);

    expect(actual).to.deep.equal(expected);
  });
});
