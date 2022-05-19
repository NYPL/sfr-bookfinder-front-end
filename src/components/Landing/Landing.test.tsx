import React from "react";
import { render, screen } from "@testing-library/react";
import Subjects from "~/config/subjectListConfig";
import LandingPage from "./Landing";
import {
  searchFormRenderTests,
  searchFormTests,
} from "../../__tests__/componentHelpers/SearchForm";

jest.mock("next/router", () => require("next-router-mock"));
import mockRouter from "next-router-mock";

describe("Renders Index Page", () => {
  beforeEach(async () => {
    render(<LandingPage />);

    // Wait for page to be loaded
    await screen.findByRole("heading", {
      name: "Digital Research Books Beta",
    });
  });
  test("Current page breadcrumb doesn't have href attribute", () => {
    expect(screen.getByText("Digital Research Books Beta")).not.toHaveAttribute(
      "href"
    );
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
        "/search?query="
      );
    });
  });
});

describe("Search using Landing Page Searchbar", () => {
  beforeEach(async () => {
    render(<LandingPage />);
    // Wait for page to be loaded
    await screen.findByRole("heading", {
      name: "Digital Research Books Beta",
    });
  });
  searchFormTests(mockRouter);
});
