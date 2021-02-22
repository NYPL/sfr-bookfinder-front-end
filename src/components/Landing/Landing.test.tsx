import React from "react";
import Landing from "./Landing";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { breadcrumbTitles } from "~/src/constants/labels";
import { searchFields } from "~/src/constants/fields";
import Subjects from "~/config/subjectListConfig";

describe("renders Landing page correctly", () => {
  beforeEach(() => {
    render(<Landing />);
  });
  test("Breadcrumbs link to homepage", () => {
    expect(
      screen.getByRole("link", { name: breadcrumbTitles.home })
    ).toHaveAttribute("href", "/");
  });
  test("Shows Heading", () => {
    expect(screen.getByRole("heading", { name: "hello" })).toBeInTheDocument();
  });
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
  test("Shows Search Examples", () => {
    expect(screen.getByText("Search Examples")).toBeInTheDocument();
    Subjects.forEach((sub) => {
      expect(screen.getByText(sub.text)).toBeInTheDocument();
      expect(screen.getByText(sub.text).closest("a").href).toContain(
        "/search?queries="
      );
    });
  });
});
