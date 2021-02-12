import React from "react";
import Landing from "./Landing";
import "@testing-library/jest-dom/extend-expect";
import {
  getAllByRole,
  getByRole,
  prettyDOM,
  render,
  screen,
  within,
} from "@testing-library/react";
import { breadcrumbTitles, inputTerms } from "~/src/constants/labels";
import { searchFields } from "~/src/constants/fields";

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
    expect(
      screen.getByRole("heading", { name: breadcrumbTitles.home })
    ).toBeInTheDocument();
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
  test("Shows Search Examples", () => {
    expect(screen.getByText("Search Examples")).toBeInTheDocument();
    expect()
  });
});
