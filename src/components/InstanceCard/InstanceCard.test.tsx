import React from "react";
import { InstanceCard } from "./InstanceCard";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { Instance, WorkEdition } from "~/src/types/DataModel";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { fullEdition } from "~/src/__tests__/fixtures/EditionCardFixture";

describe("Instance Card with Valid Data", () => {
  const fullInstance: Instance = {
    instance_id: 12345,
    publishers: [{ name: "publisher_1", roles: ["publisher"] }],
    publication_place: "Paris",
    items: [
      {
        links: [
          {
            url: "test-link-url",
            link_id: 12,
            mediaType: "application/epub+xml",
          },
          {
            url: "test-link-url-2",
            link_id: 23,
            mediaType: "application/epub+zip",
          },
        ],
        rights: [
          {
            license: "license content",
            rightsStatement: "test rights statement",
          },
        ],
      },
    ],
    identifiers: [
      {
        authority: "ddc",
        identifier: "300",
      },
      {
        authority: "oclc",
        identifier: "1014189544",
      },
      {
        authority: "oclc",
        identifier: "1030816762",
      },
    ],
  };
  beforeEach(() => {
    render(<InstanceCard edition={fullEdition} instance={fullInstance} />);
  });
  test("Shows year as header", () => {
    expect(screen.getByRole("heading", { name: "1990" })).toBeInTheDocument();
  });
  test("Shows full publisher", () => {
    expect(
      screen.getByText("Published in Paris by publisher_1")
    ).toBeInTheDocument();
  });
  test("Shows link to worldcat", () => {
    expect(screen.getByText("Find in a library").closest("a").href).toContain(
      "www.worldcat.org"
    );
  });
  test("Shows cover", () => {
    expect(screen.getByAltText("Cover").closest("img").src).toEqual(
      "https://test-cover/"
    );
  });
  test("shows license", () => {
    expect(
      screen.getByText("License: test rights statement").closest("a").href
    ).toContain("/license");
  });
});

describe("Instance Card with Minmal Data", () => {
  const emptyEdition: WorkEdition = {
    edition_id: 1189584,
  };
  const emptyInstance: Instance = {
    instance_id: 12345,
  };
  beforeEach(() => {
    render(<InstanceCard edition={emptyEdition} instance={emptyInstance} />);
  });
  test("Shows year as header", () => {
    expect(
      screen.getByRole("heading", { name: "Edition Year Unknown" })
    ).toBeInTheDocument();
  });
  test("Shows placeholder publisher", () => {
    expect(
      screen.getByText("Publisher and Location Unknown")
    ).toBeInTheDocument();
  });
  test("Shows Placeholder worldcat text", () => {
    expect(screen.getByText("Find in Library Unavailable")).toBeInTheDocument();
  });
  test("Shows cover", () => {
    expect(screen.getByAltText("Cover").closest("img").src).toEqual(
      PLACEHOLDER_COVER_LINK
    );
  });
  test("shows license", () => {
    expect(screen.getByText("License: Unknown").closest("a").href).toContain(
      "/license"
    );
  });
});
