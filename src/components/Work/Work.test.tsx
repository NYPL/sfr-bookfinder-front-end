import React from "react";
import Work from "./Work";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, within, fireEvent } from "@testing-library/react";
import { breadcrumbTitles } from "~/src/constants/labels";
import { searchFields } from "~/src/constants/fields";
import { ApiWork } from "~/src/types/DataModel";
import { WorkResult } from "~/src/types/WorkQuery";
import {
  mockPush,
  MockNextRouterContextProvider,
} from "~/src/__tests__/testUtils/MockNextRouter";
const apiWork: ApiWork = require("../../__tests__/fixtures/work-detail.json");

describe("Renders Work component when given valid work", () => {
  beforeEach(() => {
    const work: WorkResult = { data: apiWork };
    render(
      <MockNextRouterContextProvider>
        <Work workResult={work} />
      </MockNextRouterContextProvider>
    );
  });
  test("Breadcrumbs link to homepage", () => {
    expect(
      screen.getByRole("link", { name: breadcrumbTitles.home })
    ).toHaveAttribute("href", "/");
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
  test("Shows Work Title in Heading", () => {
    expect(
      screen.getByRole("heading", { name: apiWork.title })
    ).toBeInTheDocument();
  });
  test("Shows Work Subtitle", () => {
    expect(screen.getByText(apiWork.sub_title)).toBeInTheDocument();
  });
  test("Shows Author name twice, both in links", () => {
    const authorElements = screen.getAllByText("Hawthorne, Nathaniel", {
      exact: false,
    });
    expect(authorElements.length).toEqual(2);
    authorElements.forEach((elem) => {
      expect(elem.closest("a").href).toContain("field%22%3A%22author");
    });
  });

  test("Featured Edition Card shows up twice in page", () => {
    expect(
      screen.getByRole("heading", { name: "Featured Edition" })
    ).toBeInTheDocument();
    const featuredEditionHeadings = screen.getAllByRole("heading", {
      name: "1854 Edition",
    });
    expect(featuredEditionHeadings.length).toEqual(2);
    featuredEditionHeadings.forEach((heading) => {
      expect(
        (within(heading).getByRole("link") as HTMLLinkElement).href
      ).toContain("/edition");
    });
    expect(screen.getAllByAltText("Cover for 1854 Edition").length).toBe(2);
    expect(
      screen.getAllByText(
        "Published in London by Chapman & Hall British publishing house + 4 more"
      ).length
    ).toBe(2);
    expect(
      screen.getAllByText("Languages: English, German, Undetermined").length
    ).toBe(2);
    expect(
      screen.getAllByText("License: Unknown")[0].closest("a").href
    ).toContain("/license");
  });
  test("Shows Details Table", () => {
    expect(
      screen.getByRole("heading", { name: "Details" })
    ).toBeInTheDocument();
  });
  test("Shows subjects as links to search", () => {
    expect(screen.getByText("United States").closest("a").href).toContain(
      "/search"
    );
    expect(
      screen.getByText("Collective settlements").closest("a").href
    ).toContain("/search");
    expect(screen.getByText("Collective farms").closest("a").href).toContain(
      "/search"
    );
  });
});

describe("All Editions Toggle", () => {
  describe("Work with no showAll query passed", () => {
    beforeEach(() => {
      const work: WorkResult = { data: apiWork };
      render(
        <MockNextRouterContextProvider>
          <Work workResult={work} />
        </MockNextRouterContextProvider>
      );
    });

    test("Edition Toggle defaults to checked", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      expect(toggle).toBeInTheDocument;
      expect(toggle.getAttribute("aria-checked")).toBe("true");
      expect(toggle).toHaveAttribute("checked");
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

  describe("Work with showAll=false", () => {
    beforeEach(() => {
      const work: WorkResult = { data: apiWork };
      render(
        <MockNextRouterContextProvider routerQuery={{ showAll: "false" }}>
          <Work workResult={work} />
        </MockNextRouterContextProvider>
      );
    });

    test("Edition Toggle defaults to checked", () => {
      const toggle = screen.getByLabelText(
        "Show only items currently available online"
      ) as HTMLInputElement;
      expect(toggle).toBeInTheDocument;
      expect(toggle.getAttribute("aria-checked")).toBe("true");
      expect(toggle).toHaveAttribute("checked");
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
});
