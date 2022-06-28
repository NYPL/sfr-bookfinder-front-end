import React from "react";
import Edition from "./Edition";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, within, fireEvent } from "@testing-library/react";
import { breadcrumbTitles, inputTerms } from "~/src/constants/labels";
import { EditionResult } from "~/src/types/EditionQuery";
const apiEdition: EditionResult = require("../../__tests__/fixtures/edition-detail.json");
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const backUrl = "/search?query=author%3AEdgar%2C+John%2C+1876-";

describe("Renders edition component when given valid edition", () => {
  beforeEach(() => {
    render(<Edition editionResult={apiEdition} />);
  });
  test("Breadcrumbs link to nypl homepage and drb homepage", () => {
    const nav = screen.getByRole("navigation");
    expect(
      within(nav).getByRole("link", { name: breadcrumbTitles.home })
    ).toHaveAttribute("href", "https://www.nypl.org");
    expect(
      within(nav).getByRole("link", { name: breadcrumbTitles.drb })
    ).toHaveAttribute("href", "/");
  });
  test("Shows Header with Searchbar", () => {
    expect(
      screen.getByRole("heading", { name: breadcrumbTitles.drb })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue(inputTerms[0].key);
    expect(screen.getByRole("textbox")).toBeInTheDocument;
    expect(screen.getByText("Advanced Search").closest("a").href).toContain(
      "/advanced-search"
    );
  });
  test("Shows work work Title in Heading", () => {
    expect(
      screen.getByRole("heading", { name: apiEdition.data.work_title })
    ).toBeInTheDocument();
  });
  test("Shows edition Subtitle", () => {
    expect(screen.getByText(apiEdition.data.sub_title)).toBeInTheDocument();
  });
  test("Shows Author name in Link", () => {
    apiEdition.data.work_authors.forEach((author) =>
      expect(screen.getByText(author.name)).toBeInTheDocument()
    );
  });
  describe("Author links redirect to correct search query", () => {
    test("Author without viaf", () => {
      const authorElement = screen.getByText("Edgar, John, 1876-");
      expect(authorElement.closest("a").href).toContain(
        "query=author%3AEdgar%2C+John%2C+1876-"
      );
    });
    test("Author with viaf", () => {
      const authorElementWithViaf = screen.getByText(
        "Shakespeare, William- ()"
      );
      expect(authorElementWithViaf.closest("a").href).toContain(
        "query=viaf%3A96994048&display=author%3AShakespeare%2C+William-+%28%29"
      );
    });
  });
  test("Three cards show up in page", () => {
    expect(
      screen.getByRole("heading", { name: "Featured Copy" })
    ).toBeInTheDocument();
    const featuredEditionHeadings = screen.getAllByRole("heading", {
      name: "1923",
    });
    expect(featuredEditionHeadings.length).toEqual(3);
    expect(screen.getAllByAltText("Cover").length).toBe(3);
    expect(
      screen
        .getAllByText("License: Public Domain when viewed in the US")[0]
        .closest("a").href
    ).toContain("/license");
  });

  test("Featured Card, which has publisher 'Miller', shows up twice", () => {
    expect(
      screen.getAllByText("Published in Paris, France by Miller,", {
        selector: "div",
      }).length
    ).toBe(2);
  });
  test("Shows Details Table", () => {
    expect(
      screen.getByRole("heading", { name: "Details" })
    ).toBeInTheDocument();
  });

  // getByRole "term" doesn't work
  // https://github.com/testing-library/dom-testing-library/issues/703
  // describe("Details Table Content", () => {
  // test("shows terms", () => {
  //   expect(screen.getAllByRole("term")).toHaveLength(1);
  // });
  //});
});

describe("Breadcrumb truncates on long title", () => {
  beforeEach(() => {
    render(
      <Edition
        editionResult={{
          data: {
            instances: [],
            title:
              "super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super long title",
          },
        }}
      />
    );
  });
  test("title shows up truncated in breadcrumb", () => {
    const nav = screen.getByRole("navigation");
    expect(
      within(nav).getByRole("link", { name: breadcrumbTitles.drb })
    ).toHaveAttribute("href", "/");
    expect(
      within(nav).getByText(
        "super super super super super super super super super super super super..."
      )
    ).toBeInTheDocument();
  });
});

describe("All Copies Toggle", () => {
  describe("edition with no showAll query passed", () => {
    beforeEach(() => {
      render(<Edition editionResult={apiEdition} />);
    });

    test("Edition Toggle defaults to checked", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      expect(toggle).toBeInTheDocument;
      expect(toggle).not.toBeChecked();
    });

    test("clicking the edition toggle sends a new query", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      fireEvent.click(toggle);

      expect(mockRouter).toMatchObject({
        pathname: "",
        query: { showAll: false },
      });
    });
  });

  describe("copy with showAll=false", () => {
    beforeEach(() => {
      mockRouter.push("?showAll=false");
      render(<Edition editionResult={apiEdition} />);
    });

    test("Item Toggle is checked", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      expect(toggle).toBeInTheDocument;
      expect(toggle).toBeChecked();
    });

    test("clicking the edition toggle sends a new query", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      fireEvent.click(toggle);

      expect(mockRouter).toMatchObject({
        pathname: "",
        query: { showAll: true },
      });
    });
  });

  describe("copy with featured id", () => {
    beforeEach(() => {
      mockRouter.push("?featured=1234567");
      render(<Edition editionResult={apiEdition} />);
    });

    test("Featured Card, which has publisher 'Publisher 1', shows up twice", () => {
      expect(
        screen.getAllByText("Published in Paris, France by Publisher 1", {
          selector: "div",
        }).length
      ).toBe(2);
    });
  });
});

describe("Edition - Back to search results link", () => {
  describe("Show back to search results link with backUrl provided", () => {
    beforeEach(() => {
      render(<Edition editionResult={apiEdition} backUrl={backUrl} />);
    });

    test("Shows back to search results link", () => {
      expect(
        screen.getByRole("link", { name: "Back to search results" })
      ).toBeInTheDocument();
    });
    test("Back to search results links to search page", () => {
      expect(
        screen.getByRole("link", { name: "Back to search results" })
      ).toHaveAttribute(
        "href",
        "/search?query=author%3AEdgar%2C+John%2C+1876-"
      );
    });
  });

  describe("Does not show back to search results link", () => {
    beforeEach(() => {
      render(<Edition editionResult={apiEdition} />);
    });

    test("Does not show back to search results link", () => {
      expect(
        screen.queryByRole("link", { name: "Back to search results" })
      ).not.toBeInTheDocument();
    });
  });
});
