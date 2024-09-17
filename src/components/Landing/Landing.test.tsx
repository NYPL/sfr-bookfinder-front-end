import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "./Landing";
import {
  searchFormRenderTests,
  searchFormTests,
} from "../../__tests__/componentHelpers/SearchForm";

jest.mock("next/router", () => require("next-router-mock"));
import mockRouter from "next-router-mock";
import {
  collectionListData,
  collections,
} from "~/src/__tests__/fixtures/CollectionFixture";

describe("Renders Index Page", () => {
  beforeEach(async () => {
    render(<LandingPage collections={collectionListData.collections} />);

    // Wait for page to be loaded
    await screen.findByRole("heading", {
      name: "Digital Research Books Beta",
    });
  });
  test("Current page breadcrumb doesn't have href attribute", () => {
    expect(screen.getByText("Digital Research Books Beta")).not.toHaveAttribute(
      "href"
    );
  });
  test("Shows Heading", () => {
    expect(
      screen.getByRole("heading", { name: "Digital Research Books Beta" })
    ).toBeInTheDocument();
  });

  describe("Landing Page Searchbar", () => {
    searchFormRenderTests();
  });

  test("Shows Recently Added Collections", () => {
    expect(screen.getByText("Recently Added Collections")).toBeInTheDocument();
    collections.forEach((collection) => {
      expect(screen.getByText(collection.title)).toBeInTheDocument();
      expect(screen.getByText(collection.title).closest("a").href).toContain(
        collection.href
      );
    });
  });
});

describe("Search using Landing Page Searchbar", () => {
  beforeEach(async () => {
    render(<LandingPage />);
    // Wait for page to be loaded
    await screen.findByRole("heading", {
      name: "Digital Research Books Beta",
    });
  });
  searchFormTests(mockRouter);
});
