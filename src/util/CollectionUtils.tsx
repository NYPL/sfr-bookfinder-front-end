import React from "react";
import { formatUrl, truncateStringOnWhitespace } from "./Util";
import {
  MAX_PLACE_LENGTH,
  MAX_PUBLISHER_NAME_LENGTH,
  PLACEHOLDER_COVER_LINK,
} from "../constants/editioncard";
import { MediaTypes } from "../constants/mediaTypes";
import { Opds2Feed, OpdsLink } from "../types/OpdsModel";
import { Rights } from "../types/DataModel";
import { ApiSearchQuery } from "../types/SearchQuery";
import Link from "../components/Link/Link";
import { Box, Icon } from "@nypl/design-system-react-components";
import * as gtag from "../lib/Analytics";

export default class CollectionUtils {
  /** Get Cover Image
   * @param collection - The collection
   * @returns The URL of the cover that should be displayed.
   */
  static getCover(collection: Opds2Feed): string {
    if (!collection.publications || collection.publications.length === 0)
      return PLACEHOLDER_COVER_LINK;
    const coverLink = collection.publications[0].images.find((link) => {
      return MediaTypes.display.includes(link.type);
    });
    return coverLink ? formatUrl(coverLink.href) : PLACEHOLDER_COVER_LINK;
  }

  // TODO: replace with collection_id property that will be added on backend response
  static getId(links: OpdsLink[]): string {
    if (!links || links.length === 0) return "";
    const link = links[0].href;
    const id = link.substring(link.lastIndexOf("/") + 1, link.indexOf("?"));
    return id[0] ?? "";
  }

  static getAuthor(author: string): JSX.Element {
    if (!author) return null;
    const authorLinkText = author;
    const query: ApiSearchQuery = {
      query: `author:${author}`,
    };
    return (
      <Link
        to={{
          pathname: "/search",
          query: query,
        }}
        className="link"
      >
        {authorLinkText}
      </Link>
    );
  }

  /**
   * Get publisher and publish location
   * @param pubPlace - The display name of the place of publication
   * @param agents - an array of Agents
   * @returns A display element for publisher and location
   */
  static getPublisherAndLocation(
    pubPlace: string,
    publisher: string
  ): JSX.Element {
    const publisherDisplayLocation = (pubPlace: string) => {
      return pubPlace
        ? ` in ${truncateStringOnWhitespace(pubPlace, MAX_PLACE_LENGTH)}`
        : "";
    };

    const publisherDisplayText = (publisher: string) => {
      if (!publisher) return "";
      return ` by ${truncateStringOnWhitespace(
        publisher,
        MAX_PUBLISHER_NAME_LENGTH
      )}`;
    };

    const displayLocation = publisherDisplayLocation(pubPlace);
    const displayName = publisherDisplayText(publisher);
    if (!displayLocation && !displayName)
      return <>Publisher and Location Unknown</>;
    const publisherText = `Published${displayLocation}${displayName}`;
    return <>{publisherText}</>;
  }

  // Language Display
  static getLanguageDisplayText(language: string) {
    if (language) {
      const languageText = `Languages: ${language}`;
      return <>{languageText}</>;
    }
    return <>Languages: Undetermined</>;
  }

  // Rights
  static getLicense(rights: Rights) {
    return rights ? `License: ${rights.rightsStatement}` : "License: Unknown";
  }

  static getReadLink = (links: OpdsLink[], type: "readable" | "embedable") => {
    if (!links) return undefined;
    return links.find((link: OpdsLink) => {
      return link.identifier === type;
    });
  };

  // "Read Online" button should only show up if the link was flagged as "reader" or "embed"
  static getReadOnlineLink = (links: OpdsLink[]) => {
    const localLink = CollectionUtils.getReadLink(links, "readable");
    const embeddedLink = CollectionUtils.getReadLink(links, "embedable");
    // Prefer local link over embedded link
    const readOnlineLink = localLink ?? embeddedLink;
    if (readOnlineLink) {
      return (
        <Link
          to={{
            pathname: formatUrl(readOnlineLink.href),
          }}
          linkType="button"
        >
          Read Online
        </Link>
      );
    }

    return undefined;
  };

  static getNoLinkElement(showRequestButton: boolean) {
    if (showRequestButton) {
      return <span>Not Yet Available {showRequestButton}</span>;
    }
    return <>Not yet available</>;
  }
  static selectDownloadLink = (links: OpdsLink[]) => {
    if (links) return undefined;
    return links.find((link: OpdsLink) => {
      return link.identifier === "downloadable";
    });
  };

  static getDownloadLink(links: OpdsLink[], title: string) {
    if (!links) return undefined;

    const selectedLink = CollectionUtils.selectDownloadLink(links);

    if (selectedLink && selectedLink.href) {
      return (
        <Link
          to={`${formatUrl(selectedLink.href)}`}
          linkType="action"
          onClick={() => {
            gtag.drbEvents("Download", `${title}`);
          }}
        >
          <Icon
            name="download"
            align="left"
            size="small"
            decorative
            iconRotation="rotate0"
          />
          Download PDF
        </Link>
      );
    }
  }

  static getCtas(links: OpdsLink[], title: string, isLoggedIn: boolean) {
    const readOnlineLink = CollectionUtils.getReadOnlineLink(links);
    const downloadLink = CollectionUtils.getDownloadLink(links, title);

    // If a digital version exists, link directly
    if (readOnlineLink || downloadLink) {
      return (
        <>
          <Box>{readOnlineLink}</Box>
          <Box>{downloadLink}</Box>
        </>
      );
    }

    const eddLink = links
      ? links.find(
          (link) =>
            link.identifier === "requestable" || link.identifier === "catalog"
        )
      : undefined;

    // Offer EDD if available
    if (eddLink !== undefined) {
      const eddElement = CollectionUtils.getEddLinkElement(eddLink, isLoggedIn);
      return <>{eddElement}</>;
    }

    return <>{CollectionUtils.getNoLinkElement(false)}</>;
  }

  static getEddLinkElement(eddLink: OpdsLink, isLoggedIn: boolean) {
    if (isLoggedIn) {
      return (
        <>
          <Box whiteSpace="initial">
            You can request a partial scan via NYPL
          </Box>
          <Link
            to="https://www.nypl.org/research/scan-and-deliver"
            target="_blank"
          >
            Scan and Deliver
          </Link>
          <Link
            // Url starts with www
            to={`https://${eddLink.href}`}
            linkType="button"
            target="_blank"
          >
            Request
          </Link>
        </>
      );
    } else {
      return (
        <>
          May be available via NYPL<br></br>
          <Link
            to={`https://login.nypl.org/auth/login?redirect_uri=${encodeURIComponent(
              window.location.href
            )}`}
            linkType="button"
          >
            Log in for options
          </Link>
        </>
      );
    }
  }
}
