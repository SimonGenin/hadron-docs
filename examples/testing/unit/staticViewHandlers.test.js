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

    expect(actual).to.deep.equal(expected);
  });
});
