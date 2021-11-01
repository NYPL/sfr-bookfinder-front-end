import React from "react";
import LicensePage from "../pages/license";
import renderer from "react-test-renderer";

jest.mock("next/router", () => require("next-router-mock"));

it("renders License page unchanged", () => {
  const tree = renderer.create(<LicensePage />).toJSON();
  expect(tree).toMatchSnapshot();
});
