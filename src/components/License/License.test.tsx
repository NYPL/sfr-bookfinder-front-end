import React from "react";
import License from "./License";
import renderer from "react-test-renderer";

jest.mock("next/router", () => require("next-router-mock"));

it("renders License page unchanged", async () => {
  const tree = await renderer.create(<License />).toJSON();
  expect(tree).toMatchSnapshot();
});
