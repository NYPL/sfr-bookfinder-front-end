import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import { render } from "../../__tests__/testUtils/render";
import { resizeWindow } from "../../__tests__/testUtils/screen";
import Collection from "./Collection";
import { CollectionQuery, CollectionResult } from "~/src/types/CollectionQuery";
import { collectionData } from "~/src/__tests__/fixtures/CollectionFixture";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const collectionResults: CollectionResult = collectionData;
const collectionQuery: CollectionQuery = {
  identifier: "id",
  page: 1,
  perPage: 10,
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
    act(() => {
      resizeWindow(300, 1000);
    });
  });
  test("Shows the current collection with title", () => {
    expect(
      screen.getByText("Collection - Baseball: A Collection by Mike Benowitz")
    ).toBeInTheDocument();
  });
  test("Shows Item Count correctly", () => {
    expect(screen.getByText("Viewing 1 - 3 of 3 items")).toBeInTheDocument();
  });
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
  describe("Sorts filters", () => {
    test("Changing items sends new request ", () => {
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
