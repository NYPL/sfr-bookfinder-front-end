import React from "react";
import Landing from "./Landing";
import { shallow } from "enzyme";

test("renders Landing page correctly", () => {
  const about = shallow(<Landing />);
  expect(about).toMatchSnapshot();
});
