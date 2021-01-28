import React from "react";
import { mount, shallow } from "enzyme";
import SearchResults from "./Search";
import { SearchQuery } from "~/src/types/SearchQuery";
import { ApiSearchResult } from "~/src/types/DataModel";
import { resizeWindow } from "~/src/testUtils/screen";
import SearchForm from "../SearchForm/SearchForm";
import ResultsSorts from "../ResultsSorts/ResultsSorts";

const searchResults: ApiSearchResult = require("../../__tests__/fixtures/results-list.json");
const emptyResults: ApiSearchResult = require("../../__tests__/fixtures/results-list-empty.json");
const searchQuery: SearchQuery = {
  filterYears: { end: 2000, start: 1800 },
  filters: [{ field: "language", value: "Spanish" }],
  page: 0,
  perPage: 10,
  queries: [{ field: "keyword", query: '"Civil War" OR Lincoln' }],
  showAll: false,
  sort: { dir: "asc", field: "title" },
};

describe("Snapshot tests", () => {
  test("Renders well formed query and search results", () => {
    const search = shallow(
      <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
    );
    expect(search).toMatchSnapshot();
  });

  test("Empty search results render", () => {
    const search = shallow(
      <SearchResults searchQuery={searchQuery} searchResults={emptyResults} />
    );
    expect(search).toMatchSnapshot();
  });

  test("Narrow window render", () => {
    const search = shallow(
      <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
    );
    resizeWindow(300, 500);
    expect(search).toMatchSnapshot();
  });

  //TODO: Enzyme doesn't call the hook unless it's mounted, and I don't want to test literally everything here.
  //   test.only("Narrow window filters render", () => {
  //     Object.defineProperty(window, "innerHeight", {
  //       writable: true,
  //       configurable: true,
  //       value: 150,
  //     });
  //     window.dispatchEvent(new Event("resize"));

  //     const search = shallow(
  //       <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
  //     );
  //     console.log("search debug", search.debug());

  //     expect(window.innerHeight).toEqual(150);
  //     expect(search).toMatchSnapshot();
  //   });
});

describe("Search Query Queries correctly prepopulate in content", () => {
  test.only("Simple Search populates searchForm and displays correct search heading", () => {
    const search = shallow(
      <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
    );

    const searchForm = search.find(SearchForm).dive();
    console.log("searchForm", searchForm.html());

    expect(search.find(SearchForm).find("input").props().value).toEqual(
      '"Civil War" OR Lincoln'
    );
    expect(search.find(SearchForm).find("select").props().value).toEqual(
      "keyword"
    );

    expect(search.find("#page-title-heading").text()).toEqual(
      "Search Results for "
    );
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

    const search = mount(
      <SearchResults
        searchQuery={multipleQuerySearch}
        searchResults={searchResults}
      />
    );
    expect(search.find(SearchForm).find("input").props().value).toEqual("");
    expect(search.find(SearchForm).find("select").props().value).toEqual(
      "keyword"
    );
    expect(search.find("#page-title-heading").text()).toEqual(
      "Search Results for "
    );
  });

  //TODO
  test("viaf or lcnaf display", () => {
    //expect author lookup to be called
    //expect query to have viaf
    //expect search field to have
  });
});

test("Sorts correctly prepopualte", () => {
  const searchQueryWithSorts = Object.assign({}, searchQuery, {
    sort: { field: "author", dir: "ASC" },
    perPage: 50,
  });

  const search = mount(
    <SearchResults
      searchQuery={searchQueryWithSorts}
      searchResults={searchResults}
    />
  );
  expect(search.find("#page-title-heading").text()).toContain("1 - 50");
  expect(search.find("#sort-by").find("select").props().value).toEqual(
    "Author"
  );
  expect(search.find("#items-per-page").find("select").props().value).toEqual(
    50
  );
});

describe("Filters correctly prepopulate", () => {
  test("showAll filter ", () => {
    const searchQueryShowAll = Object.assign({}, searchQuery, {
      filters: [{ showAll: false }],
    });

    const search = mount(
      <SearchResults
        searchQuery={searchQueryShowAll}
        searchResults={searchResults}
      />
    );
    expect(search.find("#show_all").props().selected).toBeTruthy();
  });

  test("Language filter", () => {
    const searchQueryLanguages = Object.assign({}, searchQuery, {
      filters: [{ field: "language", value: "english" }],
    });

    const search = mount(
      <SearchResults
        searchQuery={searchQueryLanguages}
        searchResults={searchResults}
      />
    );
    const languages = search.find("#languages-list");
    expect(languages.find("li").length).toEqual(10);
    expect(search.find(["checked=true"]).props().value).toEqual("English");
  });

  test("format filter", () => {
    const searchQueryFormats = Object.assign({}, searchQuery, {
      filters: [{ field: "format", value: "pdf" }],
    });

    const search = mount(
      <SearchResults
        searchQuery={searchQueryFormats}
        searchResults={searchResults}
      />
    );
    expect(search.find("#show_all").props().selected).toBeTruthy();
  });

  test("year filter", () => {
    const searchQueryYears = Object.assign({}, searchQuery, {
      filterYears: { start: 2000, end: 3000 },
    });
    // Expect years to be prefilled
    const search = mount(
      <SearchResults
        searchQuery={searchQueryYears}
        searchResults={searchResults}
      />
    );
    expect(search.find("#date-filter-from").hostNodes().props().value).toEqual(
      2000
    );
    expect(search.find("#date-filter-from").hostNodes().props().value).toEqual(
      3000
    );
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
