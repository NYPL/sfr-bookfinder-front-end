import React from "react";
import AboutPage from "../pages/about";
import renderer from "react-test-renderer";
jest.mock("next/router", () => require("next-router-mock"));

it("renders about unchanged", () => {
  const tree = renderer.create(<AboutPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
