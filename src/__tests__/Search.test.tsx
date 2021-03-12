import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import {
  mockPush,
  MockNextRouterContextProvider,
} from "./testUtils/MockNextRouter";
import SearchResults from "../components/Search/Search";
import { ApiSearchResult } from "../types/DataModel";
import { SearchQuery } from "../types/SearchQuery";
import { resizeWindow } from "./testUtils/screen";
import {
  searchFormRenderTests,
  searchFormTests,
} from "./componentHelpers/SearchForm";
import { FilterYearsTests } from "./componentHelpers/FilterYears";
import { PLACEHOLDER_COVER_LINK } from "../constants/editioncard";
import userEvent from "@testing-library/user-event";
const searchResults: ApiSearchResult = require("./fixtures/results-list.json");
const searchQuery: SearchQuery = {
  queries: [{ field: "keyword", query: "Animal Crossing" }],
};

describe("Renders Search Results Page", () => {
  beforeEach(() => {
    render(
      <MockNextRouterContextProvider>
        <SearchResults
          searchQuery={searchQuery}
          searchResults={searchResults}
        />
      </MockNextRouterContextProvider>
    );
    act(() => {
      resizeWindow(300, 1000);
    });
  });

  test("Breadcrumbs link to homepage", () => {
    expect(
      screen.getByRole("link", { name: "Digital Research Books Beta" })
    ).toHaveAttribute("href", "/");
  });
  test("DRB Header is shown", () => {
    expect(
      screen.getByRole("heading", { name: "Digital Research Books Beta" })
    ).toBeInTheDocument();
  });
  describe("Header search Functionality", () => {
    searchFormRenderTests(searchQuery);

    searchFormTests(mockPush);
  });
  test("Main Content shows the current search query", () => {
    expect(
      screen.getByText("Search results for keyword: Animal Crossing")
    ).toBeInTheDocument();
  });
  test("Item Count shows correctly", () => {
    expect(screen.getByText("Viewing 1 - 10 of 26 items")).toBeInTheDocument();
  });
  describe("Filters modal show and hide", () => {
    test("Filters button appears", () => {
      expect(
        screen.getByRole("button", { name: "Filters (0)" })
      ).toBeInTheDocument();
    });
    test("clicking 'filters' button shows filters contents", () => {
      fireEvent.click(screen.getByText("Filters (0)"));
      expect(screen.getByLabelText("Items Per Page")).toHaveValue("10");
      expect(screen.getByLabelText("Sort By")).toHaveValue("Relevance");
      expect(screen.getByLabelText("Available Online")).toBeChecked();
      const languages = screen.getByRole("group", { name: "Languages" });
      expect(languages).toBeInTheDocument();
      expect(
        within(languages).getByRole("checkbox", { name: "Filter Languages" })
      ).not.toBeChecked();
      const formats = screen.getByRole("group", { name: "Format" });
      expect(formats).toBeInTheDocument();
      expect(
        within(formats).getByRole("checkbox", { name: "ePub" })
      ).not.toBeChecked();
      expect(
        within(formats).getByRole("checkbox", { name: "PDF" })
      ).not.toBeChecked();
      expect(
        within(formats).getByRole("checkbox", { name: "Html" })
      ).not.toBeChecked();
      const pubYear = screen.getByRole("group", { name: "Publication Year" });
      expect(pubYear).toBeInTheDocument();
      expect(within(pubYear).getByLabelText("To")).toHaveValue(null);
      expect(within(pubYear).getByLabelText("From")).toHaveValue(null);

      const backButton = screen.getByRole("button", { name: "Go Back" });
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
      expect(screen.queryByLabelText("Items Per Page")).not.toBeInTheDocument();
    });
  });
  describe("Filters interactions in narrow view", () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText("Filters (0)"));
    });
    describe("Per Page filters", () => {
      test("Changes Sort By sends new search", () => {
        const sorts = screen.getByLabelText("Items Per Page");
        fireEvent.change(sorts, { target: { value: 20 } });
        expect(sorts).toHaveValue("20");
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            filters: '[{"field":"show_all","value":false}]',
            per_page: '"20"',
            queries: '[{"field":"keyword","query":"Animal Crossing"}]',
            sort: "[]",
          },
        });
        fireEvent.click(screen.getByRole("button", { name: "Go Back" }));
        expect(
          screen.getByRole("button", { name: "Filters (0)" })
        ).toBeInTheDocument();
      });
    });
    describe("Sorts filters", () => {
      test("Changing items sends new search ", () => {
        const sortBy = screen.getByLabelText("Sort By");
        fireEvent.change(sortBy, { target: { value: "Title A-Z" } });
        expect(sortBy).toHaveValue("Title A-Z");
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            filters: '[{"field":"show_all","value":false}]',
            sort: '[{"field":"title","dir":"ASC"}]',
            queries: '[{"field":"keyword","query":"Animal Crossing"}]',
            per_page: "10",
          },
        });

        fireEvent.click(screen.getByRole("button", { name: "Go Back" }));
        expect(
          screen.getByRole("button", { name: "Filters (0)" })
        ).toBeInTheDocument();
      });
    });
    describe("Available Online", () => {
      test("Changing checkbox sends new search", () => {
        const onlineCheckbox = screen.getByLabelText("Available Online");
        fireEvent.click(onlineCheckbox);
        expect(onlineCheckbox).not.toBeChecked;
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            filters: '[{"field":"show_all","value":true}]',
            queries: '[{"field":"keyword","query":"Animal Crossing"}]',
            per_page: "10",
            sort: "[]",
          },
        });
        fireEvent.click(screen.getByRole("button", { name: "Go Back" }));
        expect(
          screen.getByRole("button", { name: "Filters (1)" })
        ).toBeInTheDocument();
      });
    });
    describe("Languages filter", () => {
      test("Clicking new language sends new search", () => {
        const languages = screen.getByRole("group", { name: "Languages" });
        const accordionControl = within(languages).getByRole("checkbox", {
          name: "Filter Languages",
        });
        const englishCheckbox = within(languages).getByRole("checkbox", {
          name: "English (14)",
        });
        fireEvent.click(accordionControl);
        expect(accordionControl).toBeChecked();

        fireEvent.click(englishCheckbox);
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            filters:
              '[{"field":"language","value":"English"},{"field":"show_all","value":false}]',
            queries: '[{"field":"keyword","query":"Animal Crossing"}]',
            per_page: "10",
            sort: "[]",
          },
        });

        expect(englishCheckbox).toBeChecked();

        fireEvent.click(screen.getByRole("button", { name: "Go Back" }));
        expect(
          screen.getByRole("button", { name: "Filters (1)" })
        ).toBeInTheDocument();
      });
    });
    describe("Format filter", () => {
      test("Clicking new format sends new search", () => {
        const formats = screen.getByRole("group", { name: "Format" });
        const epub = within(formats).getByRole("checkbox", { name: "ePub" });
        fireEvent.click(epub);
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            filters:
              '[{"field":"format","value":"epub"},{"field":"show_all","value":false}]',
            queries: '[{"field":"keyword","query":"Animal Crossing"}]',
            per_page: "10",
            sort: "[]",
          },
        });
        fireEvent.click(screen.getByRole("button", { name: "Go Back" }));
        expect(
          screen.getByRole("button", { name: "Filters (1)" })
        ).toBeInTheDocument();
      });
    });
    describe("Publication Year", () => {
      FilterYearsTests(true, searchQuery.filterYears, mockPush);
    });
  });
  describe.only("Search Results", () => {
    describe("First result has full data", () => {
      test("Title links to work page", () => {
        expect(
          screen.getByText("Happy Home Companion: Cute Tables")
        ).toBeInTheDocument();
        expect(
          screen.getByText("Happy Home Companion: Cute Tables").closest("a")
            .href
        ).toContain("/work/test-uuid-1");
      });
      test("Author links to author search", () => {
        expect(screen.getByText("Nook, Timmy").closest("a").href).toContain(
          "query%22%3A%22Nook%2C+Timmy%22%2C%22field%22%3A%22author"
        );
        expect(screen.getByText("Nook, Tommy").closest("a").href).toContain(
          "query%22%3A%22Nook%2C+Tommy%22%2C%22field%22%3A%22author"
        );
      });

      test("Shows Year as Link in header", () => {
        expect(screen.getByText("2020 Edition").closest("a").href).toContain(
          "/edition/2362158"
        );
      });
      test("Shows Full Publisher", () => {
        expect(
          screen.getByText("Published in Island Getaway by Nook Industries")
        ).toBeInTheDocument();
      });
      test("Shows Full list of languages", () => {
        expect(
          screen.getByText("Languages: English, Spanish")
        ).toBeInTheDocument();
      });
      test("Shows license with links", () => {
        expect(
          screen.getByText("License: Public Domain").closest("a").href
        ).toContain("/license");
      });
      test("Shows cover", () => {
        expect(
          screen.getByAltText("Cover for 2020 Edition").closest("img").src
        ).toEqual("https://test-cover-2/");
      });
      test("Shows download as link", () => {
        expect(screen.getByText("Download").closest("a").href).toEqual(
          "https://test-link-url-2/"
        );
      });
      test("Shows 'read online' as link", () => {
        expect(screen.getByText("Read Online").closest("a").href).toContain(
          "/edition/2362158/read-local/test-link-url"
        );
      });
      test("Shows number of editions as link to edition page", () => {
        expect(
          screen.getByText("View All 3 Editions").closest("a").href
        ).toContain("/work/test-uuid-1?showAll=true#all-editions");
      });
    });
    describe("Second result has no data", () => {
      test("Shows Unknown Year as Link in header", () => {
        expect(
          screen.getByText("Edition Year Unknown").closest("a").href
        ).toContain("/edition/2543830");
      });
      test("Shows Unknown Publisher", () => {
        expect(
          screen.getByText("Publisher and Location Unknown")
        ).toBeInTheDocument();
      });
      test("Shows Unknown languages", () => {
        expect(screen.getByText("Languages: Undetermined")).toBeInTheDocument();
      });
      test("Shows Unknown license with links", () => {
        expect(
          screen.getByText("License: Unknown").closest("a").href
        ).toContain("/license");
      });
      test("Shows Placeholder cover", () => {
        expect(
          screen.getByAltText("Placeholder Cover").closest("img").src
        ).toEqual(PLACEHOLDER_COVER_LINK);
      });
      test("Not available ctas", () => {
        expect(screen.getByText("Not yet available")).toBeInTheDocument();
      });
    });
  });
  describe("Pagination appears", () => {
    test("Previous page button appears and is disabled", () => {
      const previousButton = screen.getByRole("button", {
        name: "Previous page",
      });
      expect(previousButton).toBeInTheDocument();
      userEvent.click(previousButton);
      expect(mockPush).not.toBeCalled();
    });
    test("Next page button appears and is clickable", () => {
      const nextButton = screen.getByRole("button", { name: "Next page" });
      expect(nextButton).toBeInTheDocument();
      userEvent.click(nextButton);
      expect(mockPush).toBeCalledWith({
        pathname: "/search",
        query: {
          filters: '[{"field":"show_all","value":false}]',
          page: "1",
          queries: '[{"field":"keyword","query":"Animal Crossing"}]',
          per_page: "10",
          sort: "[]",
        },
      });
    });
    test("Middle numbers are clickable", () => {
      const twoButton = screen.getByRole("button", { name: "2" });
      expect(twoButton).toBeInTheDocument();
      userEvent.click(twoButton);
      expect(mockPush).toBeCalledWith({
        pathname: "/search",
        query: {
          filters: '[{"field":"show_all","value":false}]',
          page: "1",
          queries: '[{"field":"keyword","query":"Animal Crossing"}]',
          per_page: "10",
          sort: "[]",
        },
      });
    });
  });
});
