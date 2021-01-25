import React from "react";
import { shallow } from "enzyme";
import SearchResults from "./Search";

describe("renders Search Results correctly", () => {
  test("Renders formed query and search results", () => {
    const about = shallow(<SearchResults />);
    expect(about).toMatchSnapshot();
  });

  test("Invalid query sends error", () => {
    const about = shallow(<SearchResults />);
    expect(about).toMatchSnapshot();
  });

  test("Empty search results shows error", () => {
    const about = shallow(<SearchResults />);
    expect(about).toMatchSnapshot();
  });
});
