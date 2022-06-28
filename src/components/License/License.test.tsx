import React from "react";
import License from "./License";
import renderer from "react-test-renderer";
import { createSerializer } from "@emotion/jest";

jest.mock("next/router", () => require("next-router-mock"));

expect.addSnapshotSerializer(createSerializer());
it("renders License page unchanged", async () => {
  const tree = await renderer.create(<License />).toJSON();
  expect(tree).toMatchSnapshot();
});
