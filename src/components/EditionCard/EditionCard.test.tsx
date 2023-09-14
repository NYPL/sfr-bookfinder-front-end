import React from "react";
import { EditionCard } from "./EditionCard";
import { screen, render } from "@testing-library/react";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import {
  eddEdition,
  fullEdition,
} from "~/src/__tests__/fixtures/EditionCardFixture";
import { NYPL_SESSION_ID } from "~/src/constants/auth";

describe("Edition Card with Valid Data", () => {
  beforeEach(() => {
    render(<EditionCard edition={fullEdition} title={"title"}></EditionCard>);
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
    expect(screen.getByText("Download PDF").closest("a").href).toEqual(
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
    render(
      <EditionCard
        edition={{ edition_id: 54321 }}
        title={"title"}
      ></EditionCard>
    );
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
    expect(screen.queryByText("Download PDF")).not.toBeInTheDocument();
    expect(screen.queryByText("Read Online")).not.toBeInTheDocument();
  });
});

describe("Edition with EDD", () => {
  test("Shows Download and Read Online button when edition has both EDD and readable links", () => {
    render(<EditionCard edition={fullEdition} title={"title"}></EditionCard>);

    expect(screen.queryByText("Download PDF")).toBeInTheDocument();
    expect(screen.queryByText("Read Online")).toBeInTheDocument();
    expect(screen.queryByText("Log in for options")).not.toBeInTheDocument();
    expect(screen.queryByText("Request")).not.toBeInTheDocument();
  });

  test("Shows Login button when EDD is available but user is not logged in", () => {
    render(<EditionCard edition={eddEdition} title={"title"}></EditionCard>);
    expect(
      screen.getByRole("link", { name: "Log in for options" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Log in for options" })
    ).toHaveAttribute(
      "href",
      expect.stringContaining("https://login.nypl.org/auth/login")
    );
    expect(screen.queryByText("Download PDF")).not.toBeInTheDocument();
    expect(screen.queryByText("Read Online")).not.toBeInTheDocument();
  });

  test("Shows EDD Request button and 'Scan and Deliver' link when user is logged in", () => {
    // Set cookie before rendering the component
    document.cookie = `${NYPL_SESSION_ID}="randomvalue"`;
    render(<EditionCard edition={eddEdition} title={"title"}></EditionCard>);

    expect(screen.getByRole("link", { name: "Request" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Request" })).toHaveAttribute(
      "href",
      expect.stringContaining("test-link-url")
    );
    expect(
      screen.getByRole("link", { name: "Scan and Deliver" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Scan and Deliver" })
    ).toHaveAttribute("href", "https://www.nypl.org/research/scan-and-deliver");
    expect(screen.queryByText("Download PDF")).not.toBeInTheDocument();
    expect(screen.queryByText("Read Online")).not.toBeInTheDocument();
  });
});
