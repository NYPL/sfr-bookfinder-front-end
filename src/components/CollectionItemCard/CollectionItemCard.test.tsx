import React from "react";
import { screen, render } from "@testing-library/react";
import { CollectionItemCard } from "./CollectionItemCard";
import { collectionItem } from "~/src/__tests__/fixtures/CollectionFixture";

describe("Collection Item Card", () => {
  beforeEach(() => {
    render(<CollectionItemCard collectionItem={collectionItem} />);
  });
  test("Shows year as header", () => {
    expect(
      screen.getByRole("heading", { name: "1900 Edition" })
    ).toBeInTheDocument();
  });
  test("Shows full publisher", () => {
    expect(
      screen.getByText(
        "Published in New York (State) by American Sports Publishing,"
      )
    ).toBeInTheDocument();
  });
  test("Shows Read Online button", () => {
    expect(screen.queryByText("Read Online")).toBeInTheDocument();
  });
  test("Shows cover", () => {
    expect(screen.getByAltText("Cover").closest("img").src).toEqual(
      "https://test-sfr-covers.s3.amazonaws.com/default/defaultCover.png"
    );
  });
  test("shows license", () => {
    expect(screen.getByText("License: Unknown").closest("a").href).toContain(
      "/license"
    );
  });
});
