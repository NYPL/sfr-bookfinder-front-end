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
    expect(screen.getByRole("textbox", { name: "" })).toHaveValue(
      expectedSearchValue
    );
  });
  test("Shows link to Advanced Search", () => {
    expect(
      screen.getByRole("link", { name: "Advanced Search" })
    ).toHaveAttribute("href", "/advanced-search");
  });
};

export const searchFormTests = (mockPush) => {
  describe("Search using Landing Page Searchbar", () => {
    test("Searching with a field and value calls Search api", () => {
      const categoryInput = screen.getByRole("combobox");
      const textInput = screen.getByRole("textbox", { name: "" });
      fireEvent.change(categoryInput, { target: { value: "author" } });
      userEvent.clear(textInput);
      userEvent.type(textInput, "Tom Nook");
      fireEvent.click(screen.getByText("Search"));

      expect(screen.getByRole("combobox")).toHaveValue("author");
      expect(screen.getByRole("textbox", { name: "" })).toHaveValue("Tom Nook");
      expect(
        screen.queryByText("Please enter a search term")
      ).not.toBeInTheDocument();

      expect(mockPush).toBeCalledWith({
        pathname: "/search",
        query: {
          filters: '[{"field":"show_all","value":false}]',
          per_page: "10",
          queries: '[{"query":"Tom Nook","field":"author"}]',
          sort: "[]",
        },
      });
    });

    test("Searching with no search term shows error", () => {
      const textInput = screen.getByRole("textbox", { name: "" });
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
