import React from "react";
// import { getPage } from "next-page-tester";
import { render, screen } from "@testing-library/react";
import { breadcrumbTitles } from "../constants/labels";
import { searchFields } from "../constants/fields";
import Subjects from "~/config/subjectListConfig";
import LandingPage from "../pages/index";

describe("Renders Landing Page", () => {
  beforeEach(async () => {
    render(<LandingPage />);
    const blah = await screen.findByText("Digital Research Books Beta");
    console.log("blah", blah);
  });
  // test("Renders NYPL header", () => {});
  test("Breadcrumbs link to homepage", () => {
    expect(
      screen.getByRole("link", { name: breadcrumbTitles.home })
    ).toHaveAttribute("href", "/");
  });
  test("Shows Heading", () => {
    expect(
      screen.getByRole("heading", { name: "Digital Research Books Beta" })
    ).toBeInTheDocument();
  });
  describe("Landing Page Searchbar", () => {
    test("Searchbar select defaults to 'keyword'", () => {
      expect(screen.getByRole("combobox")).toHaveValue(searchFields[0]);
    });
    test("Searchbar has the correct options", () => {
      const options = screen.getAllByRole("option");
      expect(options[0]).toHaveValue(searchFields[0]);
      expect(options[1]).toHaveValue(searchFields[1]);
      expect(options[2]).toHaveValue(searchFields[2]);
      expect(options[3]).toHaveValue(searchFields[3]);
    });
    test("Searchbar has empty input", () => {
      expect(screen.getByRole("textbox")).toBeInTheDocument;
    });
    test("Shows link to Advanced Search", () => {
      expect(screen.getByText("Advanced Search").closest("a").href).toContain(
        "/advanced-search"
      );
    });
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
  test("Renders NYPL footer", () => {});
});

describe("Search using Landing Page Searchbar", () => {
  beforeEach(async () => {
    const { render } = await getPage({ route: "/" });
    render();
  });
  test("Searching with a field and value calls Search api", () => {});
  test("Searching with no search term shows error", () => {});
});
