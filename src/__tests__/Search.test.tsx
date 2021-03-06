import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import {
  mockPush,
  MockNextRouterContextProvider,
} from "./testUtils/MockNextRouter";
import SearchResults from "../components/Search/Search";
import { FacetItem, SearchField } from "../types/DataModel";
import { ApiSearchResult, SearchQuery } from "../types/SearchQuery";
import { resizeWindow } from "./testUtils/screen";
import {
  searchFormRenderTests,
  searchFormTests,
} from "./componentHelpers/SearchForm";
import { FilterYearsTests } from "./componentHelpers/FilterYears";
import { PLACEHOLDER_COVER_LINK } from "../constants/editioncard";
import userEvent from "@testing-library/user-event";
import { FilterLanguagesCommonTests } from "./componentHelpers/FilterLanguages";
import { FilterFormatTests } from "./componentHelpers/FilterFormats";
import { findFiltersForField } from "../util/SearchQueryUtils";
import filterFields from "../constants/filters";
const searchResults: ApiSearchResult = require("./fixtures/results-list.json");
const searchQuery: SearchQuery = {
  queries: [{ field: SearchField.Keyword, query: "Animal Crossing" }],
};
const emptySearchResults: ApiSearchResult = {
  status: 200,
  data: {
    totalWorks: 0,
    paging: {
      currentPage: 1,
      firstPage: 1,
      lastPage: 1,
      nextPage: 1,
      previousPage: 0,
      recordsPerPage: 10,
    },
    facets: { formats: [], languages: [] },
    works: [],
  },
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

  test("Digital Research Books Beta links to homepage", () => {
    const homepagelinks = screen.getAllByRole("link", {
      name: "Digital Research Books Beta",
    });
    homepagelinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/");
    });
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
      expect(
        screen.getByRole("combobox", { name: "Items Per Page" })
      ).toHaveValue("10");
      expect(screen.getByRole("combobox", { name: "Sort By" })).toHaveValue(
        "Relevance"
      );
      expect(
        screen.getByRole("checkbox", { name: "Available Online" })
      ).toBeChecked();
      const languages = screen.getByRole("group", { name: "Languages" });
      expect(languages).toBeInTheDocument();
      // expect(
      //   within(languages).getByRole("checkbox", { name: "Filter Languages" })
      // ).not.toBeChecked();
      FilterFormatTests();
      const pubYear = screen.getByRole("group", { name: "Publication Year" });
      expect(pubYear).toBeInTheDocument();
      expect(
        within(pubYear).getByRole("spinbutton", {
          name: "To",
        })
      ).toHaveValue(null);
      expect(
        within(pubYear).getByRole("spinbutton", {
          name: "From",
        })
      ).toHaveValue(null);

      const backButton = screen.getByRole("button", { name: "Go Back" });
      expect(backButton).toBeInTheDocument();
    });
  });
  describe("Filters interactions in narrow view", () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText("Filters (0)"));
    });
    describe("Per Page filters", () => {
      test("Changes Sort By sends new search", () => {
        const allSorts = screen.getAllByLabelText("Items Per Page");
        const wideSorts = allSorts[0];
        expect(wideSorts).not.toBeVisible();
        const modalSorts = allSorts[1];
        expect(modalSorts).toBeVisible();
        fireEvent.change(modalSorts, { target: { value: 20 } });
        expect(modalSorts).toHaveValue("20");
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            query: "keyword:Animal Crossing",
            size: "20",
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
        const allSorts = screen.getAllByLabelText("Sort By");
        const wideSorts = allSorts[0];
        expect(wideSorts).not.toBeVisible();
        const sortBy = allSorts[1];
        expect(sortBy).toBeVisible();
        fireEvent.change(sortBy, { target: { value: "Title A-Z" } });
        expect(sortBy).toHaveValue("Title A-Z");
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            query: "keyword:Animal Crossing",
            sort: "title:ASC",
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
        const modalCheckbox = screen.getByRole("checkbox", {
          name: "Available Online",
        });
        fireEvent.click(modalCheckbox);
        expect(modalCheckbox).not.toBeChecked;
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            query: "keyword:Animal Crossing",
            showAll: "true",
          },
        });
        fireEvent.click(screen.getByRole("button", { name: "Go Back" }));
        expect(
          screen.getByRole("button", { name: "Filters (1)" })
        ).toBeInTheDocument();
      });
    });
    describe("Languages filter", () => {
      const availableLanguages: FacetItem[] =
        searchResults &&
        searchResults.data.facets &&
        searchResults.data.facets.languages;

      FilterLanguagesCommonTests(screen, availableLanguages, true);

      test("Clicking new language sends new search", () => {
        const languages = screen.getByRole("group", { name: "Languages" });

        const englishCheckbox = within(languages).getByRole("checkbox", {
          name: "English (6)",
        });

        fireEvent.click(englishCheckbox);
        expect(mockPush).toBeCalledWith({
          pathname: "/search",
          query: {
            filter: "language:English",
            query: "keyword:Animal Crossing",
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
            filter: "format:epub_zip",
            query: "keyword:Animal Crossing",
          },
        });
        fireEvent.click(screen.getByRole("button", { name: "Go Back" }));
        expect(
          screen.getByRole("button", { name: "Filters (1)" })
        ).toBeInTheDocument();
      });
    });
    describe("Publication Year", () => {
      FilterYearsTests(
        true,
        findFiltersForField([], filterFields.startYear)[0],
        findFiltersForField([], filterFields.endYear)[0],
        mockPush
      );
    });
  });
  describe("Search Results", () => {
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
      test("subtitle displays", () => {
        expect(screen.getByText("Cute Tables Subtitle")).toBeInTheDocument();
      });
      test("Author links to author search", () => {
        expect(screen.getByText("Nook, Timmy").closest("a").href).toContain(
          "http://localhost/search?query=author%3ANook%2C+Timmy"
        );
        expect(screen.getByText("Nook, Tammy").closest("a").href).toContain(
          "http://localhost/search?query=author%3ANook%2C+Tammy"
        );
      });

      test("Shows Year as Link in header", () => {
        expect(screen.getByText("1915 Edition").closest("a").href).toContain(
          "/edition/1453292"
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
          screen.getByAltText("Cover for 1915 Edition").closest("img").src
        ).toEqual("https://test-cover-2/");
      });
      test("Shows download as link", () => {
        expect(screen.getAllByText("Download")[0].closest("a").href).toEqual(
          "https://test-link-url-3/"
        );
      });
      test("Shows 'read online' as link", () => {
        expect(
          screen.getAllByText("Read Online")[0].closest("a").href
        ).toContain("read/3330416");
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
        ).toContain("/edition/1172733");
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
    describe("Third result has maximal data", () => {
      test("Title is truncated on full word and links to work page", () => {
        expect(
          screen.getByText("Happy Home Companion: super super super...")
        ).toBeInTheDocument();
        expect(
          screen
            .getByText("Happy Home Companion: super super super...")
            .closest("a").href
        ).toContain("/work/test-uuid-3");
      });

      test("Subtitle displays truncated", () => {
        expect(
          screen.getByText(
            "super long super long super long super long super long super long super long super long super long super long super..."
          )
        ).toBeInTheDocument();
      });
      test("All authors are shown and duplicate authors are not filtered", () => {
        expect(
          screen.getAllByText("Nook, Tom", { exact: false }).length
        ).toEqual(12);
      });

      test("Shows Year as Link in header", () => {
        expect(screen.getByText("1945 Edition").closest("a").href).toContain(
          "/edition/1453292"
        );
      });
      test("Truncates publisher place and first full publisher name", () => {
        expect(
          screen.getByText(
            "Published in Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuaki... by Nook Industries Nook Industries Nook Industries Nook Industries Nook... + 4 more"
          )
        ).toBeInTheDocument();
      });
      test("Shows Full list of languages in edition", () => {
        expect(
          screen.getByText(
            "Languages: Lang1, Lang2, Lang3, Lang4, Lang5, Lang6, Lang7, Lang8, Lang9, Lang10, Lang11, Lang12, Lang13, Lang14, Lang15, Lang16, Lang17"
          )
        ).toBeInTheDocument();
      });
      test("Shows license for first item with no truncation", () => {
        expect(
          screen
            .getByText(
              "License: Public Domain Public Domain Public Domain Public Domain Public Domain Public Domain Public Domain Public Domain Public Domain"
            )
            .closest("a").href
        ).toContain("/license");
      });
      test("Shows cover", () => {
        expect(
          screen.getByAltText("Cover for 1945 Edition").closest("img").src
        ).toEqual("https://test-cover-2/");
      });
      test("Does not show download link", () => {
        // The found `download` link is from the first result
        expect(screen.getAllByText("Download")[1]).not.toBeDefined();
      });
      test("Shows 'read online' as link", () => {
        expect(
          screen.getAllByText("Read Online")[1].closest("a").href
        ).toContain("read/3234");
      });
      test("Shows number of editions as link to edition page", () => {
        expect(
          screen.getByText("View All 5 Editions").closest("a").href
        ).toContain("/work/test-uuid-3?showAll=true#all-editions");
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
          page: 2,
          query: "keyword:Animal Crossing",
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
          page: 2,
          query: "keyword:Animal Crossing",
        },
      });
    });
  });
});

describe("Renders correctly when perPage is greater than item count", () => {
  beforeEach(() => {
    render(
      <MockNextRouterContextProvider>
        <SearchResults
          searchQuery={searchQuery}
          searchResults={{
            data: {
              totalWorks: 2,
              facets: { formats: [], languages: [] },
              paging: {
                currentPage: 1,
                firstPage: 1,
                lastPage: 1,
                nextPage: 1,
                previousPage: 1,
                recordsPerPage: 10,
              },
              works: [],
            },
          }}
        />
      </MockNextRouterContextProvider>
    );
  });

  test("Item Count shows correctly", () => {
    expect(screen.getByText("Viewing 1 - 2 of 2 items")).toBeInTheDocument();
  });
});

describe("Renders locale string correctly with large numbers", () => {
  beforeEach(() => {
    render(
      <MockNextRouterContextProvider>
        <SearchResults
          searchQuery={searchQuery}
          searchResults={{
            data: {
              totalWorks: 2013521,
              facets: { formats: [], languages: [] },
              paging: {
                currentPage: 3123,
                firstPage: 0,
                lastPage: 201352,
                nextPage: 3124,
                previousPage: 3122,
                recordsPerPage: 10,
              },
              works: [],
            },
          }}
        />
      </MockNextRouterContextProvider>
    );
  });
  test("Item Count shows correctly", () => {
    expect(
      screen.getByText("Viewing 31,221 - 31,230 of 2,013,521 items")
    ).toBeInTheDocument();
  });
});

describe("Renders No Results when no results are shown", () => {
  beforeEach(() => {
    render(
      <MockNextRouterContextProvider>
        <SearchResults
          searchQuery={searchQuery}
          searchResults={emptySearchResults}
        />
      </MockNextRouterContextProvider>
    );
  });

  test("Main Content shows the current search query", () => {
    expect(
      screen.getByText("Search results for keyword: Animal Crossing")
    ).toBeInTheDocument();
  });
  test("Item Count shows correctly", () => {
    expect(screen.getByText("Viewing 0 items")).toBeInTheDocument();
  });
  test("No Results message appears", () => {
    expect(
      screen.getByText(
        "No results were found. Please try a different keyword or fewer filters."
      )
    ).toBeInTheDocument();
  });
  test("Pagination does not appear", () => {
    const previousButton = screen.queryByRole("button", {
      name: "Previous page",
    });
    const nextButton = screen.queryByRole("button", {
      name: "Next page",
    });

    expect(previousButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });
});

describe("Renders seach header correctly when viaf search is passed", () => {
  const viafSearchQuery: SearchQuery = {
    queries: [{ field: SearchField.Viaf, query: "12345" }],
    display: { field: SearchField.Author, query: "display author" },
  };
  beforeEach(() => {
    render(
      <MockNextRouterContextProvider>
        <SearchResults
          searchQuery={viafSearchQuery}
          searchResults={searchResults}
        />
      </MockNextRouterContextProvider>
    );
  });

  test("Main Content shows the viaf query", () => {
    expect(
      screen.getByText("Search results for author: display author")
    ).toBeInTheDocument();
  });

  test("Search bar is prepopulated with the author name", () => {
    expect(screen.getByRole("combobox")).toHaveValue("author");
    expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue(
      "display author"
    );
  });

  test("Author links to viaf search", () => {
    expect(screen.getByText("display author").closest("a").href).toContain(
      "http://localhost/search?query=viaf%3A12345&display=author%3Adisplay+author"
    );
  });
});
