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
import { ApiEdition, EditionResult } from "~/src/types/EditionQuery";
const apiEdition: ApiEdition = require("../../__tests__/fixtures/edition-detail.json");

describe("Renders edition component when given valid edition", () => {
  beforeEach(() => {
    const edition: EditionResult = { data: apiEdition };
    render(
      <MockNextRouterContextProvider>
        <Edition editionResult={edition} />
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
        name: apiEdition.title,
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
      screen.getByRole("heading", { name: apiEdition.title })
    ).toBeInTheDocument();
  });
  test("Shows edition Subtitle", () => {
    expect(screen.getByText(apiEdition.sub_title)).toBeInTheDocument();
  });

  test("Featured Copy Card shows up twice in page", () => {
    expect(
      screen.getByRole("heading", { name: "Featured Copy" })
    ).toBeInTheDocument();
    const featuredEditionHeadings = screen.getAllByRole("heading", {
      name: "2014",
    });
    expect(featuredEditionHeadings.length).toEqual(2);
    expect(screen.getAllByAltText("Cover").length).toBe(2);
    expect(
      screen.getAllByText(
        "Published in Paris by Paris, Centre National de la Recherche Scientifique + 1 more"
      ).length
    ).toBe(2);
    expect(
      screen
        .getAllByText(
          "License: Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International"
        )[0]
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
      const edition: EditionResult = { data: apiEdition };
      render(
        <MockNextRouterContextProvider>
          <Edition editionResult={edition} />
        </MockNextRouterContextProvider>
      );
    });

    test("Copy Toggle defaults to empty", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      expect(toggle).toBeInTheDocument;
      expect(toggle.getAttribute("aria-checked")).toBe("false");
      expect(toggle).not.toHaveAttribute("checked");
    });
    test("clicking the edition toggle sends a new query", () => {
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

  describe("copy with showAll=false", () => {
    beforeEach(() => {
      const edition: EditionResult = { data: apiEdition };
      render(
        <MockNextRouterContextProvider routerQuery={{ showAll: "false" }}>
          <Edition editionResult={edition} />
        </MockNextRouterContextProvider>
      );
    });

    test("Copy Toggle defaults to checked", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      expect(toggle).toBeInTheDocument;
      expect(toggle.getAttribute("aria-checked")).toBe("true");
      expect(toggle).toHaveAttribute("checked");
    });
    test("clicking the copy toggle sends a new query", () => {
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
});
