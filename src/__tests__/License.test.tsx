import React from "react";
import { render, screen } from "@testing-library/react";
import LicensePage from "../pages/license";
import { MockNextRouterContextProvider } from "./testUtils/MockNextRouter";

describe("Renders License Page", () => {
  beforeEach(async () => {
    render(
      <MockNextRouterContextProvider>
        <LicensePage />
      </MockNextRouterContextProvider>
    );

    // Wait for page to be loaded
    await screen.findByRole("heading", {
      name: "Digital Research Books Beta",
    });
  });
  // test("Renders NYPL header", () => {});
  test("Breadcrumbs link to homepage", () => {
    expect(
      screen.getByRole("link", { name: "Digital Research Books Beta" })
    ).toHaveAttribute("href", "/");
  });
  test("Shows Heading", () => {
    expect(
      screen.getByRole("heading", { name: "Digital Research Books Beta" })
    ).toBeInTheDocument();
  });
  test("matches snapshot", () => {
    expect(screen).toMatchInlineSnapshot();
  });
});
