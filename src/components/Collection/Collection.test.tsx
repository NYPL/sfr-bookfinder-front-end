import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../__tests__/testUtils/render";
import Collection from "./Collection";
import { CollectionQuery, CollectionResult } from "~/src/types/CollectionQuery";
import {
  collectionData,
  collectionWithPagination,
} from "~/src/__tests__/fixtures/CollectionFixture";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => require("next-router-mock"));

const collectionResults: CollectionResult = collectionData;
const collectionQuery: CollectionQuery = {
  identifier: "id",
  page: 1,
  perPage: 5,
  sort: "relevance",
};

describe("Renders Collection Page", () => {
  beforeEach(() => {
    render(
      <Collection
        collectionQuery={collectionQuery}
        collectionResult={collectionResults}
      />
    );
  });
  test("Shows the current collection with title", () => {
    expect(
      screen.getByText("Collection - Baseball: A Collection by Mike Benowitz")
    ).toBeInTheDocument();
  });
  test("Shows Item Count correctly", () => {
    expect(screen.getByText("Viewing 1 - 3 of 3 items")).toBeInTheDocument();
  });
  describe("Pagination does not appear in collections with <10 items", () => {
    test("Pagination does not appear", () => {
      const previousLink = screen.queryByRole("link", {
        name: "Previous page",
      });
      const nextLink = screen.queryByRole("link", {
        name: "Next page",
      });

      expect(previousLink).not.toBeInTheDocument();
      expect(nextLink).not.toBeInTheDocument();
    });
  });
  describe("Sorts filters", () => {
    test("Changing sort by sends new request", () => {
      const sortBy = screen.getByLabelText("Sort By");
      expect(sortBy).toBeVisible();
      fireEvent.change(sortBy, { target: { value: "Title A-Z" } });
      expect(sortBy).toHaveValue("Title A-Z");
      expect(mockRouter).toMatchObject({
        pathname: "/collection/id",
        query: {
          sort: "title",
        },
      });
    });
  });
  describe("Renders Collection Items", () => {
    test("Title links to edition page", () => {
      expect(
        screen.getByText("Judge Landis and twenty-five years of baseball")
      ).toBeInTheDocument();
      expect(
        screen
          .getByText("Judge Landis and twenty-five years of baseball")
          .closest("a").href
      ).toContain("https://drb-qa.nypl.org/edition/894734");
    });
    test("Author links to author search", () => {
      expect(
        screen.getByText("Wray, J. E. (J. Edward)").closest("a").href
      ).toContain(
        "http://localhost/search?query=author%3AWray%2C+J.+E.+%28J.+Edward%29"
      );
    });

    test("Shows Year as Link in header", () => {
      expect(screen.getByText("1900 Edition").closest("a").href).toContain(
        "https://drb-qa.nypl.org/edition/4267756"
      );
    });
    test("Shows Full Publisher", () => {
      expect(
        screen.getByText(
          "Published in New York (State) by American Sports Publishing,"
        )
      ).toBeInTheDocument();
    });
    test("Shows Full list of languages", () => {
      expect(screen.getByText("Languages: eng,und")).toBeInTheDocument();
    });
    test("Shows license with links", () => {
      expect(
        screen.getByText("License: Public Domain").closest("a").href
      ).toContain("/license");
    });
  });
});

describe("Render Collection Page with >10 items", () => {
  beforeEach(() => {
    render(
      <Collection
        collectionQuery={collectionQuery}
        collectionResult={collectionWithPagination}
      />
    );
  });

  describe("Pagination appears", () => {
    test("Previous page link does not appear", () => {
      const previousLink = screen.queryByRole("link", {
        name: "Previous page",
      });
      expect(previousLink).not.toBeInTheDocument();
    });
    test("Next page link appears and is clickable", () => {
      const nextLink = screen.getByRole("link", { name: "Next page" });
      expect(nextLink).toBeInTheDocument();
      userEvent.click(nextLink);
      expect(mockRouter).toMatchObject({
        pathname: "/collection/id",
        query: {
          page: 2,
        },
      });
    });
    test("Middle numbers are clickable", () => {
      const twoButton = screen.getByRole("link", { name: "Page 2" });
      expect(twoButton).toBeInTheDocument();
      userEvent.click(twoButton);
      expect(mockRouter).toMatchObject({
        pathname: "/collection/id",
        query: {
          page: 2,
        },
      });
    });
  });

  describe("Sorts filters", () => {
    test("Changing number of items sends new request", () => {
      const itemsPerPage = screen.getByLabelText("Items Per Page");
      expect(itemsPerPage).toBeVisible();
      fireEvent.change(itemsPerPage, { target: { value: "50" } });
      expect(itemsPerPage).toHaveValue("50");
      expect(mockRouter).toMatchObject({
        pathname: "/collection/id",
        query: {
          perPage: "50",
        },
      });

      // pagination should not show since <50 items
      const previousLink = screen.queryByRole("link", {
        name: "Previous page",
      });
      const nextLink = screen.queryByRole("link", {
        name: "Next page",
      });

      expect(previousLink).not.toBeInTheDocument();
      expect(nextLink).not.toBeInTheDocument();
    });
  });
});
