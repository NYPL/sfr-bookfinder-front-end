import React from "react";
import Work from "./Work";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, within, fireEvent } from "@testing-library/react";
import { breadcrumbTitles, inputTerms } from "~/src/constants/labels";
import { WorkResult } from "~/src/types/WorkQuery";
const apiWork: WorkResult = require("../../__tests__/fixtures/work-detail.json");
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

describe("Renders Work component when given valid work", () => {
  beforeEach(() => {
    render(<Work workResult={apiWork} />);
  });
  test("Digital Research Books Beta links to homepage", () => {
    const homepagelinks = screen.getAllByRole("link", {
      name: "Digital Research Books Beta",
    });
    homepagelinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/");
    });
  });
  test("Shows Header with Searchbar", () => {
    expect(
      screen.getByRole("heading", { name: breadcrumbTitles.home })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue(inputTerms[0].key);
    expect(screen.getByRole("textbox")).toBeInTheDocument;
    expect(screen.getByText("Advanced Search").closest("a").href).toContain(
      "/advanced-search"
    );
  });
  test("Shows Work Title in Heading", () => {
    expect(
      screen.getByRole("heading", { name: "Yoruba; intermediate texts" })
    ).toBeInTheDocument();
  });
  test("Shows Work Subtitle", () => {
    expect(screen.getByText("sub title sub title")).toBeInTheDocument();
  });
  test("Shows Author name twice, both in links", () => {
    const authorElements = screen.getAllByText("McClure, H. David. ()", {
      exact: false,
    });
    expect(authorElements.length).toEqual(2);
    authorElements.forEach((elem) => {
      expect(elem.closest("a").href).toContain(
        "query=author%3AMcClure%2C+H.+David.+%28%29"
      );
    });
  });

  test("Featured Edition Card shows up twice in page", () => {
    expect(
      screen.getByRole("heading", { name: "Featured Edition" })
    ).toBeInTheDocument();
    const featuredEditionHeadings = screen.getAllByRole("heading", {
      name: "1967 Edition",
    });
    expect(featuredEditionHeadings.length).toEqual(2);
    featuredEditionHeadings.forEach((heading) => {
      expect(
        (within(heading).getByRole("link") as HTMLLinkElement).href
      ).toContain("/edition");
      expect(
        (within(heading).getByRole("link") as HTMLLinkElement).href
      ).toContain("?featured=1280883");
    });

    expect(screen.getAllByAltText("Cover for 1967 Edition").length).toBe(2);
    expect(
      screen.getAllByText(
        "Published by Foreign Service Institute, Dept. of State;"
      ).length
    ).toBe(2);
    expect(screen.getAllByText("Languages: English, German").length).toBe(2);
    expect(
      screen.getAllByText("License: Unknown")[0].closest("a").href
    ).toContain("/license");
  });
  test("Shows Details Table", () => {
    expect(
      screen.getByRole("heading", { name: "Details" })
    ).toBeInTheDocument();
  });
});

describe("Edition Cards and toggles", () => {
  describe("Work with no showAll query passed", () => {
    beforeEach(() => {
      render(<Work workResult={apiWork} />);
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

  describe("Work with showAll=true", () => {
    beforeEach(() => {
      mockRouter.push("?showAll=true");
      render(<Work workResult={apiWork} />);
    });

    test("Edition Toggle is unchecked", () => {
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

  describe("Work with showAll=false", () => {
    beforeEach(() => {
      mockRouter.push("?showAll=false");
      render(<Work workResult={apiWork} />);
    });

    test("Edition Toggle is checked", () => {
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

  describe("loading work with featured=862232", () => {
    beforeEach(() => {
      mockRouter.push("?featured=862232");
      render(<Work workResult={apiWork} />);
    });

    test("1980 edition shows up twice", () => {
      expect(
        screen.getByRole("heading", { name: "Featured Edition" })
      ).toBeInTheDocument();
      const featuredEditionHeadings = screen.getAllByRole("heading", {
        name: "1980 Edition",
      });
      expect(featuredEditionHeadings.length).toEqual(2);
    });
  });
});
