import React from "react";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";
import { SearchQuery, SearchQueryDefaults } from "~/src/types/SearchQuery";
import {
  MockNextRouterContextProvider,
  mockPush,
} from "~/src/__tests__/testUtils/MockNextRouter";
import { render, screen } from "@testing-library/react";
import { FilterLanguagesCommonTests } from "./componentHelpers/FilterLanguages";
import { FilterYearsTests } from "./componentHelpers/FilterYears";
import { FilterFormatTests } from "./componentHelpers/FilterFormats";
import userEvent from "@testing-library/user-event";
import { errorMessagesText } from "../constants/labels";
import filterFields from "../constants/filters";
import { ApiLanguageResponse } from "../types/LanguagesQuery";

const defaultLanguages: ApiLanguageResponse = {
  status: "200",
  data: [
    { language: "english", count: 25 },
    { language: "french", count: 30 },
  ],
};

const complicatedSearchQuery: SearchQuery = {
  perPage: 10,
  page: 1,
  filters: [
    { value: "english", field: filterFields.language },
    { field: filterFields.startYear, value: 1990 },
    { field: filterFields.endYear, value: 1999 },
  ],
  sort: { field: "relevance", dir: "DESC" },
  queries: [{ field: "keyword", query: "cat" }],
  showAll: false,
};

describe("renders advanced search correctly", () => {
  describe("Renders correctly in when passed well-formed query", () => {
    beforeEach(() => {
      render(
        <AdvancedSearch
          searchQuery={SearchQueryDefaults}
          languages={defaultLanguages}
        />
      );
    });

    describe("Search Fields render", () => {
      test("Search fields are empty", () => {
        expect(screen.getByLabelText("Keyword")).toHaveValue("");
        expect(screen.getByLabelText("Author")).toHaveValue("");
        expect(screen.getByLabelText("Title")).toHaveValue("");
        expect(screen.getByLabelText("Subject")).toHaveValue("");
      });
    });
    describe("Language filter is shown", () => {
      FilterLanguagesCommonTests(screen, defaultLanguages.data, false, false);
    });
    describe("Year filter is shown", () => {
      FilterYearsTests(false);
    });
    test("Format filter is shown", () => {
      FilterFormatTests();
    });
    test("Submit and clear buttons are shown", () => {
      expect(
        screen.getByRole("button", { name: "Search" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });
  });

  test("Hides languages when no languages are passed", () => {
    render(
      <AdvancedSearch
        searchQuery={SearchQueryDefaults}
        languages={{ status: "200", data: [] }}
      />
    );
    expect(
      screen.queryByRole("group", { name: "Languages" })
    ).not.toBeInTheDocument();
  });

  test("Prepopulates form input based on search query parameters", () => {
    render(
      <AdvancedSearch
        searchQuery={complicatedSearchQuery}
        languages={defaultLanguages}
      />
    );

    expect(screen.getByLabelText("english")).toBeChecked();
    expect(screen.getByLabelText("From")).toHaveValue(1990);
    expect(screen.getByLabelText("To")).toHaveValue(1999);
    expect(screen.getByLabelText("Keyword")).toHaveValue("cat");
  });
});

describe("Advanced Search submit", () => {
  test("Submits well formed query", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={complicatedSearchQuery}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "language:english,startYear:1990,endYear:1999",
      query: "keyword:cat",
      sort: "relevance:DESC",
    };
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("Submits only year end", () => {
    const searchQueryOneYear = Object.assign({}, SearchQueryDefaults, {
      queries: [{ field: "keyword", query: "cat" }],
      filters: [{ field: filterFields.startYear, value: 1990 }],
    });
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={searchQueryOneYear}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "startYear:1990",
      query: "keyword:cat",
    };
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("shows error on empty query", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={SearchQueryDefaults}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(errorMessagesText.emptySearch)).toBeInTheDocument();
  });

  test("show error on invalid year", () => {
    const invalidYearSearch = Object.assign({}, SearchQueryDefaults, {
      queries: [{ field: "keyword", query: "cat" }],
      filters: [
        { field: filterFields.startYear, value: 1990 },
        { field: filterFields.endYear, value: 1880 },
      ],
    });
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={invalidYearSearch}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );
    userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(errorMessagesText.invalidDate)).toBeInTheDocument();
  });
});

describe("Advanced Search clear", () => {
  test("Clears search", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch
          searchQuery={complicatedSearchQuery}
          languages={defaultLanguages}
        />
      </MockNextRouterContextProvider>
    );

    expect(screen.getByLabelText("english")).toBeChecked();
    expect(screen.getByLabelText("From")).toHaveValue(1990);
    expect(screen.getByLabelText("To")).toHaveValue(1999);
    expect(screen.getByLabelText("Keyword")).toHaveValue("cat");

    userEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByLabelText("english")).not.toBeChecked();
    expect(screen.getByLabelText("From")).toHaveValue(null);
    expect(screen.getByLabelText("To")).toHaveValue(null);
    expect(screen.getByLabelText("Keyword")).toHaveValue("");
  });
});
