import React from "react";
import { shallow } from "enzyme";
import License from "./License";

test("renders License page correctly", () => {
  const about = shallow(<License />);
  expect(about).toMatchSnapshot();
});
