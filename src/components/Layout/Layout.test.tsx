import { render, screen } from "@testing-library/react";
import React from "react";
import Layout from "./Layout";
jest.mock("next/router", () => require("next-router-mock"));

// dgx-global-header is being forced to work with React 16+ and throws
// errors when being rendered in unit tests. At this time (11.10.22),
// errors can be ignored by not rendering the Header component in tests.
describe("Layout component", () => {
  beforeEach(() => {
    render(
      <Layout isTestMode>
        <div>Text in layout body</div>
      </Layout>
    );
  });

  test("should have main content", () => {
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("Text in layout body");
  });
});
