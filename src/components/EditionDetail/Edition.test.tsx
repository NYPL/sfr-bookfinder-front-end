import React from "react";
import Edition from "./Edition";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, within, fireEvent } from "@testing-library/react";
import { breadcrumbTitles } from "~/src/constants/labels";
import { searchFields } from "~/src/constants/fields";
import {
  mockPush,
  MockNextRouterContextProvider,
} from "~/src/__tests__/testUtils/MockNextRouter";
import { EditionResult } from "~/src/types/EditionQuery";
const apiEdition: EditionResult = require("../../__tests__/fixtures/edition-detail.json");

describe("Renders edition component when given valid edition", () => {
  beforeEach(() => {
    render(
      <MockNextRouterContextProvider>
        <Edition editionResult={apiEdition} />
      </MockNextRouterContextProvider>
    );
  });
  test("Breadcrumbs link to homepage and work page", () => {
    const nav = screen.getByRole("navigation");
    expect(
      within(nav).getByRole("link", { name: breadcrumbTitles.home })
    ).toHaveAttribute("href", "/");
    expect(
      (within(nav).getByRole("link", {
        name: apiEdition.data.title,
      }) as HTMLAnchorElement).href
    ).toContain("/work/");
  });
  test("Shows Header with Searchbar", () => {
    expect(
      screen.getByRole("heading", { name: breadcrumbTitles.home })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue(searchFields[0]);
    expect(screen.getByRole("textbox")).toBeInTheDocument;
    expect(screen.getByText("Advanced Search").closest("a").href).toContain(
      "/advanced-search"
    );
  });
  test("Shows edition Title in Heading", () => {
    expect(
      screen.getByRole("heading", { name: apiEdition.data.title })
    ).toBeInTheDocument();
  });
  test("Shows edition Subtitle", () => {
    expect(screen.getByText(apiEdition.data.sub_title)).toBeInTheDocument();
  });

  test("Featured Copy Card shows up twice in page", () => {
    expect(
      screen.getByRole("heading", { name: "Featured Copy" })
    ).toBeInTheDocument();
    const featuredEditionHeadings = screen.getAllByRole("heading", {
      name: "1923",
    });
    expect(featuredEditionHeadings.length).toEqual(2);
    expect(screen.getAllByAltText("Cover").length).toBe(2);
    expect(
      screen.getAllByText("Published in Paris, France by Miller,").length
    ).toBe(2);
    expect(
      screen
        .getAllByText("License: Public Domain when viewed in the US")[0]
        .closest("a").href
    ).toContain("/license");
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

describe("All Copies Toggle", () => {
  describe("edition with no showAll query passed", () => {
    beforeEach(() => {
      render(
        <MockNextRouterContextProvider>
          <Edition editionResult={apiEdition} />
        </MockNextRouterContextProvider>
      );
    });

    test("Copy Toggle defaults to empty", () => {
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

      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith({
        pathname: "",
        query: { showAll: true },
      });
    });
  });

  describe("copy with showAll=true", () => {
    beforeEach(() => {
      render(
        <MockNextRouterContextProvider routerQuery={{ showAll: "true" }}>
          <Edition editionResult={apiEdition} />
        </MockNextRouterContextProvider>
      );
    });

    test("Copy Toggle defaults to checked", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      expect(toggle).toBeInTheDocument;
      expect(toggle).not.toBeChecked();
    });
    test("clicking the copy toggle sends a new query", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      fireEvent.click(toggle);

      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith({
        pathname: "",
        query: { showAll: false },
      });
    });
  });
});
