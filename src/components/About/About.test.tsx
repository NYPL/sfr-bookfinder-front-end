import React from "react";
import AboutPage from "./About";
import renderer from "react-test-renderer";
jest.mock("next/router", () => require("next-router-mock"));

it("renders about unchanged", async () => {
  const tree = await renderer.create(<AboutPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
