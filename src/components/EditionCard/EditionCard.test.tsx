import React from "react";
import { EditionCard } from "./EditionCard";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { fullEdition } from "~/src/__tests__/fixtures/EditionCardFixture";

describe("Edition Card with Valid Data", () => {
  beforeEach(() => {
    render(<EditionCard edition={fullEdition}></EditionCard>);
  });
  test("Shows Year as Link in header", () => {
    expect(screen.getByText("1990 Edition").closest("a").href).toContain(
      "/edition/12345"
    );
  });
  test("Shows Full Publisher", () => {
    expect(
      screen.getByText(
        "Published in Chargoggagoggmanchauggagoggchaubunagungamaugg by publisher_1"
      )
    ).toBeInTheDocument();
  });
  test("Shows Full list of languages", () => {
    expect(
      screen.getByText(
        "Languages: english, french, russian, unknown, spanish, german, arabic, hindi, japanese, vietnamese, latin, romanian"
      )
    ).toBeInTheDocument();
  });
  test("Shows license with links", () => {
    expect(
      screen.getByText("License: test rights statement").closest("a").href
    ).toContain("/license");
  });
  test("Shows cover", () => {
    expect(
      screen.getByAltText("Cover for 1990 Edition").closest("img").src
    ).toEqual("https://test-cover/");
  });
  test("Shows download as link", () => {
    expect(screen.getByText("Download").closest("a").href).toEqual(
      "https://test-link-url-2/"
    );
  });
  test("Shows 'read online' as link", () => {
    expect(screen.getByText("Read Online").closest("a").href).toContain(
      "/read/12"
    );
  });
});

describe("Edition Year with Minimal Data", () => {
  beforeEach(() => {
    render(<EditionCard edition={{ edition_id: 54321 }}></EditionCard>);
  });
  test("Shows Unknown Year as Link in header", () => {
    expect(
      screen.getByText("Edition Year Unknown").closest("a").href
    ).toContain("/edition/54321");
  });
  test("Shows Unknown Publisher", () => {
    expect(
      screen.getByText("Publisher and Location Unknown")
    ).toBeInTheDocument();
  });
  test("Shows Unknown languages", () => {
    expect(screen.getByText("Languages: Undetermined")).toBeInTheDocument();
  });
  test("Shows Unknown license with links", () => {
    expect(screen.getByText("License: Unknown").closest("a").href).toContain(
      "/license"
    );
  });
  test("Shows Placeholder cover", () => {
    expect(screen.getByAltText("Placeholder Cover").closest("img").src).toEqual(
      PLACEHOLDER_COVER_LINK
    );
  });
  test("Not available ctas", () => {
    expect(screen.getByText("Not yet available")).toBeInTheDocument();
    expect(screen.queryByText("Download")).not.toBeInTheDocument();
    expect(screen.queryByText("Read Online")).not.toBeInTheDocument();
  });
});
