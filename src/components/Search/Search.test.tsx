import React from "react";
import SearchResults from "./Search";
import { SearchQuery } from "~/src/types/SearchQuery";
import { ApiSearchResult } from "~/src/types/DataModel";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, within } from "@testing-library/react";

const searchResults: ApiSearchResult = require("../../__tests__/fixtures/results-list.json");
// const emptyResults: ApiSearchResult = require("../../__tests__/fixtures/results-list-empty.json");
const searchQuery: SearchQuery = {
  filterYears: { end: 2000, start: 1800 },
  filters: [{ field: "language", value: "Spanish" }],
  page: 0,
  perPage: 10,
  queries: [{ field: "keyword", query: '"Civil War" OR Lincoln' }],
  showAll: false,
  sort: { dir: "asc", field: "title" },
};

describe("Search Query Queries correctly prepopulate content", () => {
  test("Simple Search displays correct search heading", () => {
    render(
      <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
    );
    expect(screen.getByLabelText(""));
    // expect(screen.find(SearchForm).find("select").props().value).toEqual(
    //   "keyword"
    // );
    expect(
      screen.getByText('Search results for keyword: "Civil War" OR Lincoln')
    ).toBeInTheDocument();
  });

  test("Search with multiple queries", () => {
    const multipleQuerySearch = Object.assign({}, searchQuery, {
      queries: [
        { field: "keyword", query: "happy" },
        { field: "author", query: "Isabelle" },
        { field: "subject", query: "islands" },
        { field: "title", query: "animal" },
      ],
    });

    const search = render(
      <SearchResults
        searchQuery={multipleQuerySearch}
        searchResults={searchResults}
      />
    );
    // expect(search.find(SearchForm).find("input").props().value).toEqual("");
    // expect(search.find(SearchForm).find("select").props().value).toEqual(
    //   "keyword"
    // );
    expect(
      search.getByText(
        "Search results for keyword: happy and author: Isabelle and subject: islands and title: animal"
      )
    ).toBeInTheDocument();
  });

  //TODO
  // test("viaf or lcnaf display", () => {
  //expect author lookup to be called
  //expect query to have viaf
  //expect search field to have
  // });
});

test("Sorts correctly prepopualte", () => {
  const searchQueryWithSorts = Object.assign({}, searchQuery, {
    sort: { field: "author", dir: "ASC" },
    perPage: "20",
  });

  const search = render(
    <SearchResults
      searchQuery={searchQueryWithSorts}
      searchResults={searchResults}
    />
  );

  expect(search.getByText("Viewing 1 - 20 of 26 items")).toBeInTheDocument();

  const sortInput = search.getByLabelText("Sort By") as HTMLInputElement;
  expect(sortInput.value).toEqual("Author A-Z");

  const perpageInput = search.getByLabelText(
    "Items Per Page"
  ) as HTMLInputElement;
  expect(perpageInput.value).toEqual("20");
});

describe("Filters correctly prepopulate", () => {
  test("showAll filter ", () => {
    const searchQueryShowAll = Object.assign({}, searchQuery, {
      filters: [{ showAll: false }],
    });

    const search = render(
      <SearchResults
        searchQuery={searchQueryShowAll}
        searchResults={searchResults}
      />
    );

    const availOnline = search.getByLabelText(
      "Available Online"
    ) as HTMLInputElement;
    expect(availOnline.checked).toBeTruthy();
  });

  test("Language filter", () => {
    const searchQueryLanguages = Object.assign({}, searchQuery, {
      filters: [{ field: "language", value: "English" }],
    });

    const search = render(
      <SearchResults
        searchQuery={searchQueryLanguages}
        searchResults={searchResults}
      />
    );

    const accordion = search.getByRole("group", { name: /Languages/i });
    const languages = within(accordion).getByRole("list");

    const items = within(languages).getAllByRole("listitem");
    expect(items.length).toEqual(16);

    const englishCheckbox = within(languages).getByLabelText(
      "English (14)"
    ) as HTMLInputElement;
    expect(englishCheckbox.checked).toBeTruthy();
  });

  test("format filter", () => {
    const searchQueryFormats = Object.assign({}, searchQuery, {
      filters: [{ field: "format", value: "pdf" }],
    });

    const search = render(
      <SearchResults
        searchQuery={searchQueryFormats}
        searchResults={searchResults}
      />
    );
    const pdfLabel = search.getByLabelText("PDF") as HTMLInputElement;
    expect(pdfLabel.checked).toBeTruthy();
  });

  test("year filter", () => {
    const searchQueryYears = Object.assign({}, searchQuery, {
      filterYears: { start: 2000, end: 3000 },
    });
    // Expect years to be prefilled
    const search = render(
      <SearchResults
        searchQuery={searchQueryYears}
        searchResults={searchResults}
      />
    );

    const fromLabel = search.getByLabelText("From") as HTMLInputElement;
    const toLabel = search.getByLabelText("To") as HTMLInputElement;

    expect(fromLabel.value).toEqual("2000");
    expect(toLabel.value).toEqual("3000");
  });

  // test("Filter count is shown in narrow view", () => {});

  // test("Filter count treats 'show_all' as a negative filter", () => {});
});

describe("search results display", () => {
  test("empty search results", () => {
    //Header shows "viewing 0 items"
    //Pagination
  });
  test("Many search results", () => {
    //Header
    //pagination
  });
});

describe("Changing filters", () => {
  test("Changing filters applies right away", () => {
    //expect checkbox click to be called
  });
  test("Changing date does not apply right away", () => {
    //Expect date change not to call submit
  });
  test("Date changes are applied on submit", () => {
    // expect submit to be called on apply button click
  });
  test("Error is shown when dates are invalid", () => {
    //expect there to be an error
  });
});
