import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { searchFields } from "~/src/constants/fields";
import { SearchQuery } from "~/src/types/SearchQuery";

export const searchFormRenderTests = (query?: SearchQuery) => {
  test("Searchbar select defaults", () => {
    const expectedSearchField =
      query && query.queries ? query.queries[0].field : searchFields[0];
    expect(screen.getByRole("combobox")).toHaveValue(expectedSearchField);
  });
  test("Searchbar has the correct options", () => {
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveValue(searchFields[0]);
    expect(options[1]).toHaveValue(searchFields[1]);
    expect(options[2]).toHaveValue(searchFields[2]);
    expect(options[3]).toHaveValue(searchFields[3]);
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

export const searchFormTests = (mockPush) => {
  describe("Search using Landing Page Searchbar", () => {
    test("Searching with a field and value calls Search api", () => {
      const categoryInput = screen.getByRole("combobox");
      const textInput = screen.getByRole("textbox", { name: "Search" });
      fireEvent.change(categoryInput, { target: { value: "author" } });
      userEvent.clear(textInput);
      userEvent.type(textInput, "Tom Nook");
      fireEvent.click(screen.getByText("Search"));

      expect(screen.getByRole("combobox")).toHaveValue("author");
      expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue(
        "Tom Nook"
      );
      expect(
        screen.queryByText("Please enter a search term")
      ).not.toBeInTheDocument();

      expect(mockPush).toBeCalledWith({
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
      fireEvent.click(screen.getByText("Search"));

      expect(mockPush).not.toBeCalled();
      expect(
        screen.getByText("Please enter a search term")
      ).toBeInTheDocument();
    });
  });
};
