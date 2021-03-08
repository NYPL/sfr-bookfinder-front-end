import React from "react";
import { InstanceCard } from "./InstanceCard";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { Instance, WorkEdition } from "~/src/types/DataModel";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";

describe("Instance Card with Valid Data", () => {
  const fullInstance: Instance = {
    id: 12345,
    edition_id: 1189584,
    covers: [
      { url: "test-cover", media_type: "img/jpeg", flags: { temporary: true } },
      {
        url: "test-cover-2",
        media_type: "img/jpeg",
        flags: { temporary: false },
      },
    ],
    rights: [
      {
        license: "license content",
        rights_statement: "test rights statement",
      },
    ],
    agents: [{ name: "publisher_1", roles: ["publisher"] }],
    publication_place: "Paris",
    items: [
      {
        links: [
          {
            url: "test-link-url",
            local: true,
            media_type: "application/epub+xml",
          },
          {
            url: "test-link-url-2",
            download: true,
            media_type: "application/epub+xml",
          },
        ],
      },
    ],
    identifiers: [
      {
        id_type: "ddc",
        identifier: "300",
      },
      {
        id_type: "oclc",
        identifier: "1014189544",
      },
      {
        id_type: "oclc",
        identifier: "1030816762",
      },
    ],
  };
  beforeEach(() => {
    render(<InstanceCard editionYear="2000" instance={fullInstance} />);
  });
  test("Shows year as header", () => {
    expect(screen.getByRole("heading", { name: "2000" })).toBeInTheDocument();
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
      "https://test-cover-2/"
    );
  });
  test("shows license", () => {
    expect(
      screen.getByText("License: test rights statement").closest("a").href
    ).toContain("/license");
  });
});

describe("Instance Card with Minmal Data", () => {
  const emptyInstance: Instance = {
    id: 12345,
    edition_id: 1189584,
  };
  beforeEach(() => {
    render(<InstanceCard instance={emptyInstance} />);
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
