import React from "react";
import { render, screen } from "@testing-library/react";
import AboutPage from "../pages/about";
import { MockNextRouterContextProvider } from "./testUtils/MockNextRouter";

describe("Renders About Page", () => {
  beforeEach(async () => {
    render(
      <MockNextRouterContextProvider>
        <AboutPage />
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
});
