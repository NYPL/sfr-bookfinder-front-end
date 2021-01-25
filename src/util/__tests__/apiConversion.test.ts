/* eslint-env mocha */
import React from "react";
import {
  ApiSearchQuery,
  DateRange,
  SearchQuery,
} from "~/src/types/SearchQuery";
import { toApiQuery, toSearchQuery } from "../apiConversion";

// Use require instead of import so that it will cast correctly to `ApiSearchQuery`
// https://github.com/microsoft/TypeScript/issues/11152

const apiQuery: ApiSearchQuery = require("../../__tests__/fixtures/search-query.json");
const emptyApiQuery: ApiSearchQuery = require("../../__tests__/fixtures/search-query-missing-query.json");

/**
 * Unit tests for `ApiConversion.ts`
 * Because ApiQuery is user-editable (based on what a user types in the URL)
 * all of the edge cases must be tested.
 */

const searchQuery: SearchQuery = {
  filterYears: { end: 2000, start: 1800 },
  filters: [{ field: "language", value: "Spanish" }],
  page: 0,
  perPage: 10,
  queries: [{ field: "keyword", query: '"Civil War" OR Lincoln' }],
  showAll: false,
  sort: { dir: "asc", field: "title" },
};

describe("Converting api query to search query", () => {
  test("converts api query with maximal searchquery information", () => {
    expect(toSearchQuery(apiQuery)).toEqual(searchQuery);
  });

  test("Takes the first filterYears value when passed more than one year filter", () => {
    const searchQueryExtraYears = Object.assign({}, apiQuery, {
      filters: [
        ...apiQuery.filters,
        { field: "years", value: { start: "1900", end: "2010" } },
      ],
    });
    expect(toSearchQuery(searchQueryExtraYears).filterYears).toEqual(
      searchQuery.filterYears
    );
  });

  test("Takes the first show_all value when passed more than one show_all", () => {
    const searchQueryExtraShowAll = Object.assign({}, apiQuery, {
      filters: [...apiQuery.filters, { field: "show_all", value: true }],
    });
    expect(toSearchQuery(searchQueryExtraShowAll).showAll).toEqual(
      searchQuery.showAll
    );
  });

  test("Converts all 'format' and 'language' filters", () => {
    const apiQueryExtraFilters = Object.assign({}, apiQuery, {
      filters: [
        [
          { field: "language", value: "english" },
          { field: "format", value: "epub" },
          { field: "format", value: "pdf" },
        ],
        ...apiQuery.filters,
      ],
    });
    const searchQueryExtraFilters = Object.assign({}, searchQuery, {
      filters: [
        [
          { field: "language", value: "english" },
          { field: "format", value: "epub" },
          { field: "format", value: "pdf" },
        ],
        ...searchQuery.filters,
      ],
    });
    expect(toSearchQuery(apiQueryExtraFilters).filters).toEqual(
      searchQueryExtraFilters.filters
    );
  });

  test("Throws error when empty api query is passed", () => {
    expect(() => {
      toSearchQuery(emptyApiQuery);
    }).toThrowError("Mising param `queries` in search request");
  });

  test("converts api query with the minimal information", () => {
    const minimalApiQuery: ApiSearchQuery = {
      queries: [
        {
          field: "keyword",
          query: '"Civil War" OR Lincoln',
        },
      ],
    };

    const minimalSearchQuery: SearchQuery = {
      queries: [
        {
          field: "keyword",
          query: '"Civil War" OR Lincoln',
        },
      ],
    };

    expect(toSearchQuery(minimalApiQuery)).toEqual(minimalSearchQuery);
  });
  test("converts api query with no SearchQuery filters", () => {
    const minimalApiQueryWithYear: ApiSearchQuery = {
      queries: [
        {
          field: "keyword",
          query: '"Civil War" OR Lincoln',
        },
      ],
      filters: [{ field: "years", value: { start: "1900", end: "2010" } }],
    };

    const filterYears: DateRange = { start: 1900, end: 2010 };
    expect(toSearchQuery(minimalApiQueryWithYear).filters).toBeUndefined;
    expect(toSearchQuery(minimalApiQueryWithYear).filterYears).toEqual(
      filterYears
    );
  });
});

describe("Converting search query to api query", () => {
  test("converts searchQuery to apiQuery with maximal information", () => {
    const expectedApiQuery: ApiSearchQuery = {
      filters: [
        { field: "language", value: "Spanish" },
        { field: "years", value: { end: 2000, start: 1800 } },
        { field: "show_all", value: false },
      ],
      per_page: 10,
      queries: [{ field: "keyword", query: '"Civil War" OR Lincoln' }],
      sort: [{ dir: "asc", field: "title" }],
    };

    expect(toApiQuery(searchQuery)).toEqual(expectedApiQuery);
  });

  test("converts throws an error when trying to convert searchQuery without queries", () => {
    const emptySearchQuery = Object.assign({}, searchQuery, { queries: [] });
    expect(() => {
      toApiQuery(emptySearchQuery);
    }).toThrow("cannot convert searchQuery with no queries");
  });

  test("converts searchQuery to apiQuery with minimal information", () => {
    const minimalApiQuery: ApiSearchQuery = {
      queries: [{ field: "keyword", query: "cat" }],
    };
    expect(
      toApiQuery({ queries: [{ field: "keyword", query: "cat" }] })
    ).toEqual(minimalApiQuery);
  });
});
