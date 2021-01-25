import React from "react";
import About from "./About";
import { shallow } from "enzyme";

test("renders About page correctly", () => {
  const about = shallow(<About />);
  expect(about).toMatchSnapshot();
});
