import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { inputTerms } from "~/src/constants/labels";
import { SearchQuery } from "~/src/types/SearchQuery";

export const searchFormRenderTests = (query?: SearchQuery) => {
  test("Searchbar select defaults", () => {
    const expectedSearchField =
      query && query.queries ? query.queries[0].field : inputTerms[0].key;
    expect(screen.getByRole("combobox")).toHaveValue(expectedSearchField);
  });
  test("Searchbar has the correct options", () => {
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveValue(inputTerms[0].key);
    expect(options[1]).toHaveValue(inputTerms[1].key);
    expect(options[2]).toHaveValue(inputTerms[2].key);
    expect(options[3]).toHaveValue(inputTerms[3].key);
  });
  test("Searchbar has correct input", () => {
    const expectedSearchValue =
      query && query.queries ? query.queries[0].query : "";
    expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue(
      expectedSearchValue
    );
  });
  test("Shows link to Advanced Search", () => {
    expect(screen.getByText("Advanced Search").closest("a").href).toContain(
      "/advanced-search"
    );
  });
};

export const searchFormTests = (mockRouter, hasHeader?) => {
  describe("Search using Landing Page Searchbar", () => {
    test("Searching with a field and value calls Search api", () => {
      const categoryInput = screen.getByRole("combobox");
      const textInput = screen.getByRole("textbox", { name: "Search" });
      fireEvent.change(categoryInput, { target: { value: "author" } });
      userEvent.clear(textInput);
      userEvent.type(textInput, "Tom Nook");

      const searchButton = hasHeader
        ? within(screen.getByRole("main")).getByText("Search")
        : screen.getByRole("button", { name: "Search" });
      fireEvent.click(searchButton);

      expect(screen.getByRole("combobox")).toHaveValue("author");
      expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue(
        "Tom Nook"
      );
      expect(
        screen.queryByText("Please enter a search term")
      ).not.toBeInTheDocument();

      expect(mockRouter).toMatchObject({
        pathname: "/search",
        query: {
          query: "author:Tom Nook",
        },
      });
    });

    test("Searching with no search term shows error", () => {
      const textInput = screen.getByRole("textbox", { name: "Search" });
      userEvent.clear(textInput);

      expect(textInput).toHaveValue("");
      const searchButton = hasHeader
        ? within(screen.getByRole("main")).getByText("Search")
        : screen.getByRole("button", { name: "Search" });
      fireEvent.click(searchButton);

      expect(mockRouter).toMatchObject({});
      expect(
        screen.getByText("Please enter a search term")
      ).toBeInTheDocument();
    });
  });
};
