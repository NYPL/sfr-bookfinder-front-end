import React from "react";
import { shallow, configure } from "enzyme";
import License from "./License";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("renders License page correctly", () => {
  const about = shallow(<License />);
  expect(about).toMatchSnapshot();
});
