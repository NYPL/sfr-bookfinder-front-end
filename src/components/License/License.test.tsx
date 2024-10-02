import React from "react";
import { render } from "~/src/__tests__/testUtils/render";
import License from "./License";

it("renders License page unchanged", async () => {
  const tree = render(<License />);
  expect(tree.container.firstChild).toMatchSnapshot();
});
