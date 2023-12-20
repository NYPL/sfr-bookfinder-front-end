import React from "react";
import {
  Agent,
  Instance,
  ApiItem,
  ItemLink,
  Language,
  WorkEdition,
  Identifier,
} from "../types/DataModel";
import Link from "~/src/components/Link/Link";
import { formatUrl, truncateStringOnWhitespace } from "./Util";
import {
  MAX_PLACE_LENGTH,
  MAX_PUBLISHER_NAME_LENGTH,
  MAX_SUBTITILE_LENGTH,
  PLACEHOLDER_COVER_LINK,
} from "../constants/editioncard";
import { ApiSearchQuery } from "../types/SearchQuery";
import { MediaTypes } from "../constants/mediaTypes";

// EditionCard holds all the methods needed to build an Edition Card
export default class EditionCardUtils {
  static getPreferredAgent(agents: any, role: any) {
    if (!agents || !agents.length) return undefined;

    const viafAgents = agents.filter((agent: any) => agent.viaf !== null);
    if (viafAgents && viafAgents.length) {
      const foundAuthors = viafAgents.filter((agent: any) =>
        agent.roles.includes(role)
      );
      if (foundAuthors && foundAuthors.length) {
        return foundAuthors;
      }
    }

    const preferredAgents = agents.find((agent: any) =>
      agent.roles.includes(role)
    );
    return preferredAgents ? [preferredAgents] : undefined;
  }

  static editionYearText(edition: WorkEdition) {
    return edition && edition.publication_date
      ? `${edition.publication_date} Edition`
      : "Edition Year Unknown";
  }

  static getFirstAndCountMore(array: any) {
    let moreText;
    if (array.length <= 1) {
      moreText = "";
    } else {
      moreText = ` + ${array.length - 1} more`;
    }

    return `${truncateStringOnWhitespace(
      array[0],
      MAX_PUBLISHER_NAME_LENGTH
    )}${moreText}`;
  }

  // Subtitle
  static getSubtitle(subtitle: string | undefined): string {
    if (!subtitle) {
      return undefined;
    }
    return truncateStringOnWhitespace(subtitle, MAX_SUBTITILE_LENGTH);
  }

  // Author
  static getAuthorIdentifier(author: Agent) {
    return (
      (author.viaf && ["viaf", "viaf"]) ||
      (author.lcnaf && ["lcnaf", "lcnaf"]) || ["name", "author"]
    );
  }

  static getAuthorsList(authors: Agent[]): JSX.Element[] {
    if (!authors || authors.length === 0) return null;
    return authors.map((author: Agent, i: number) => {
      const authorLinkText = author.name;
      const query: ApiSearchQuery = {
        query: author.viaf ? `viaf:${author.viaf}` : `author:${author.name}`,
      };
      if (author.viaf) {
        query.display = `author:${author.name}`;
      }
      return (
        <React.Fragment
          key={author.viaf ? `author-${author.viaf}` : `author-${author.name}`}
        >
          <Link
            to={{
              pathname: "/search",
              query: query,
            }}
            className="link"
          >
            {authorLinkText}
          </Link>
          {i < authors.length - 1 && ", "}
        </React.Fragment>
      );
    });
  }

  /** Get Cover Image
   * @param covers - The list of covers
   * @returns The URL of the cover that should be displayed.
   */

  static getCover(links: ItemLink[]): string {
    if (!links || links.length === 0) return PLACEHOLDER_COVER_LINK;
    const coverLink = links.find((link) => {
      return MediaTypes.display.includes(link.mediaType);
    });
    return coverLink ? formatUrl(coverLink.url) : PLACEHOLDER_COVER_LINK;
  }

  static getPublisherDisplayLocation(pubPlace: string): undefined | string {
    return (
      pubPlace &&
      ` in ${truncateStringOnWhitespace(pubPlace, MAX_PLACE_LENGTH)}`
    );
  }

  static getPublishersDisplayText(publishers: Agent[]): undefined | string {
    if (!publishers || publishers.length === 0) return "";
    const publisherNames = publishers.map(
      (pubAgent: Agent) => pubAgent && pubAgent.name
    );
    return ` by ${EditionCardUtils.getFirstAndCountMore(publisherNames)}`;
  }

  // Language Display
  static getLanguageDisplayText(previewEdition: WorkEdition): string {
    if (
      previewEdition &&
      previewEdition.languages &&
      previewEdition.languages.length
    ) {
      const languagesTextList = previewEdition.languages
        .filter((lang: Language) => {
          return lang && lang.language;
        })
        .map((lang: Language) => lang.language);
      if (languagesTextList && languagesTextList.length) {
        const languageText = `Languages: ${languagesTextList.join(", ")}`;
        return languageText;
      }
    }
    return "Languages: Undetermined";
  }

  // Rights
  static getLicense(item: ApiItem): string {
    return item && item.rights && item.rights.length > 0
      ? `License: ${item.rights[0].rightsStatement}`
      : "License: Unknown";
  }

  static getReadLink = (item: ApiItem, type: "reader" | "embed"): ItemLink => {
    if (!item || !item.links) return undefined;
    return item.links.find((link: ItemLink) => {
      return link.flags[type];
    });
  };

  static selectDownloadLink = (item: ApiItem): ItemLink => {
    if (!item || !item.links) return undefined;
    return item.links.find((link: ItemLink) => {
      return link.flags["download"];
    });
  };

  // "Read Online" button should only show up if the link was flagged as "reader" or "embed"
  static getReadOnlineLink = (item: ApiItem) => {
    const localLink = EditionCardUtils.getReadLink(item, "reader");
    const embeddedLink = EditionCardUtils.getReadLink(item, "embed");
    // Prefer local link over embedded link
    const readOnlineLink = localLink ?? embeddedLink;

    return readOnlineLink;
  };

  static getOclcLink(instance: Instance): string {
    const oclc =
      instance && instance.identifiers
        ? instance.identifiers.find(
            (identifier: Identifier) => identifier.authority === "oclc"
          )
        : undefined;
    const oclcLink = oclc
      ? `https://www.worldcat.org/oclc/${oclc.identifier}`
      : undefined;

    return oclcLink;
  }

  // Get readable item or non-catalog item
  static getPreviewItem(items: ApiItem[] | undefined) {
    if (!items) return undefined;

    const firstReadableItem = items.find((item) => {
      return (
        EditionCardUtils.getReadLink(item, "reader") ||
        EditionCardUtils.getReadLink(item, "embed")
      );
    });

    // If no readable link found, we just return any link that's not a catalog (edd)
    return (
      firstReadableItem ??
      items.find((items) => {
        return items.links && items.links.find((link) => !link.flags.catalog);
      })
    );
  }

  static isAvailableOnline(item: ApiItem) {
    return (
      item &&
      item.links.find((link: ItemLink) => {
        return (
          link.flags["reader"] || link.flags["embed"] || link.flags["download"]
        );
      })
    );
  }

  static isPhysicalEdition(item: ApiItem): boolean {
    const availableOnline = this.isAvailableOnline(item);
    const eddLink =
      item && item.links
        ? item.links.find((link) => link.flags.edd)
        : undefined;

    return !availableOnline && eddLink !== undefined;
  }
}
