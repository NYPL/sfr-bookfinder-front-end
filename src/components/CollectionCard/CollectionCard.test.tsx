import React from "react";
import CollectionCard from "./CollectionCard";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { collectionData } from "~/src/__tests__/fixtures/CollectionFixture";

describe("Collection list", () => {
  beforeEach(() => {
    render(<CollectionCard collection={collectionData} />);
  });
  test("shows Title as heading", () => {
    expect(
      screen.getByRole("heading", {
        name: "Baseball: A Collection by Mike Benowitz",
      })
    ).toBeInTheDocument();
  });
  test("shows Description", () => {
    expect(
      screen.getByText("A history of the sport of baseball")
    ).toBeInTheDocument();
  });
  test("Shows cover", () => {
    expect(
      screen
        .getByAltText("Cover for Baseball: A Collection by Mike Benowitz")
        .closest("img").src
    ).toEqual(
      "https://drb-files-qa.s3.amazonaws.com/covers/default/defaultCover.png"
    );
  });
  test("Shows number of items", () => {
    expect(screen.getByText("3 Items")).toBeInTheDocument();
  });
});
