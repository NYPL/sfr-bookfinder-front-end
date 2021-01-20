import React from "react";
import { render } from "@testing-library/react";
import Landing from "../pages/index";

test.only("renders DRB link", () => {
  const { getByText } = render(<Landing />);
  const linkElement = getByText(
    /Instantly deploy your Next\.js site to a public URL with Vercel\./
  );
  expect(linkElement).toBeInTheDocument();
});
