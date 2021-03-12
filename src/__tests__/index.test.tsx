import React from "react";
import { render, screen } from "@testing-library/react";
import Subjects from "~/config/subjectListConfig";
import LandingPage from "../pages/index";
import {
  mockPush,
  MockNextRouterContextProvider,
} from "./testUtils/MockNextRouter";
import { searchFormRenderTests, searchFormTests } from "./componentHelpers/SearchForm";
describe("Renders Index Page", () => {
  beforeEach(async () => {
    render(
      <MockNextRouterContextProvider>
        <LandingPage />
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

  describe("Landing Page Searchbar", () => {
    searchFormRenderTests();
  });

  test("Shows Search Examples", () => {
    expect(screen.getByText("Search Examples")).toBeInTheDocument();
    Subjects.forEach((sub) => {
      expect(screen.getByText(sub.text)).toBeInTheDocument();
      expect(screen.getByText(sub.text).closest("a").href).toContain(
        "/search?queries="
      );
    });
  });
  test("Renders NYPL footer", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

describe("Search using Landing Page Searchbar", () => {
  beforeEach(async () => {
    render(
      <MockNextRouterContextProvider>
        <LandingPage />
      </MockNextRouterContextProvider>
    );
    // Wait for page to be loaded
    await screen.findByRole("heading", {
      name: "Digital Research Books Beta",
    });
  });
  searchFormTests(mockPush);
});
