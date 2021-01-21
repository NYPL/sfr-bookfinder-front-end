import React from "react";
import { render } from "@testing-library/react";
import About from "../../components/About/About";

describe("renders About page correctly", () => {
  test("renders breadcrumbs", () => {
    const about = render(<About />);
    expect(about).toMatchSnapshot();
  });
});
