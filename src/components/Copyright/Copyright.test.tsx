import React from "react";
import { render } from "~/src/__tests__/testUtils/render";
import Copyright from "./Copyright";

it("renders Copyright page unchanged", async () => {
  const tree = render(<Copyright />);
  expect(tree.container.firstChild).toMatchSnapshot();
});
