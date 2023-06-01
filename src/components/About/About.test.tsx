import React from "react";
import AboutPage from "./About";
import { render } from "@testing-library/react";

it("renders about unchanged", async () => {
  const tree = render(<AboutPage />);
  expect(tree.container.firstChild).toMatchSnapshot();
});
