import React from "react";
import { InstanceCard } from "./InstanceCard";
import { screen, render } from "@testing-library/react";
import { Instance, WorkEdition } from "~/src/types/DataModel";
import { PLACEHOLDER_COVER_LINK } from "~/src/constants/editioncard";
import { fullEdition } from "~/src/__tests__/fixtures/EditionCardFixture";
import { NYPL_SESSION_ID } from "~/src/constants/auth";

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
          flags: {
            catalog: false,
            download: false,
            reader: true,
          },
        },
        {
          url: "test-link-url-2",
          link_id: 23,
          mediaType: "application/epub+zip",
          flags: {
            catalog: false,
            download: true,
            reader: false,
          },
        },
        {
          url: "test-link-url-3",
          link_id: 34,
          mediaType: "application/html+edd",
          flags: {
            catalog: false,
            download: false,
            reader: false,
            edd: true,
          },
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

const eddInstance: Instance = {
  ...fullInstance,
  items: [
    {
      links: [
        {
          url: "test-link-url",
          link_id: 1,
          mediaType: "application/html+edd",
          flags: {
            catalog: false,
            download: false,
            reader: false,
            edd: true,
          },
        },
      ],
    },
  ],
};

describe("Instance Card with Valid Data", () => {
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

describe("Instance with EDD", () => {
  test("Shows Download and Read Online button when edition has both EDD and readable links", () => {
    render(
      <InstanceCard
        edition={fullEdition}
        instance={fullInstance}
      ></InstanceCard>
    );

    expect(screen.queryByText("Download PDF")).toBeInTheDocument();
    expect(screen.queryByText("Read Online")).toBeInTheDocument();
    expect(screen.queryByText("Log in for options")).not.toBeInTheDocument();
    expect(screen.queryByText("Request")).not.toBeInTheDocument();
  });

  test("Shows Login button when EDD is available but user is not logged in", () => {
    render(
      <InstanceCard edition={fullEdition} instance={eddInstance}></InstanceCard>
    );
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
    render(
      <InstanceCard edition={fullEdition} instance={eddInstance}></InstanceCard>
    );

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
