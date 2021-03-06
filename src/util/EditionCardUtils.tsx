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
import * as DS from "@nypl/design-system-react-components";
import Link from "~/src/components/Link/Link";
import { formatUrl, truncateStringOnWhitespace } from "./Util";
import {
  MAX_PLACE_LENGTH,
  MAX_PUBLISHER_NAME_LENGTH,
  MAX_SUBTITILE_LENGTH,
  PLACEHOLDER_COVER_LINK,
} from "../constants/editioncard";
import { MediaTypes } from "../constants/mediaTypes";
import * as gtag from "../lib/Analytics";
import { ApiSearchQuery } from "../types/SearchQuery";

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

  /**
   * Get publisher and publish location
   * @param pubPlace - The display name of the place of publication
   * @param agents - an array of Agents
   * @returns A display element for publisher and location
   */
  static getPublisherAndLocation(
    pubPlace: string,
    publishers: Agent[]
  ): JSX.Element {
    const publisherDisplayLocation = (pubPlace: string) => {
      return pubPlace
        ? ` in ${truncateStringOnWhitespace(pubPlace, MAX_PLACE_LENGTH)}`
        : "";
    };

    const publisherDisplayText = (publishers: Agent[]) => {
      if (!publishers || publishers.length === 0) return "";
      const publisherNames = publishers.map(
        (pubAgent: Agent) => pubAgent && pubAgent.name
      );
      return ` by ${EditionCardUtils.getFirstAndCountMore(publisherNames)}`;
    };

    const displayLocation = publisherDisplayLocation(pubPlace);
    const displayName = publisherDisplayText(publishers);
    if (!displayLocation && !displayName)
      return <>Publisher and Location Unknown</>;
    const publisherText = `Published${displayLocation}${displayName}`;
    return <>{publisherText}</>;
  }

  // Language Display
  static getLanguageDisplayText(previewEdition: WorkEdition) {
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
        return <>{languageText}</>;
      }
    }
    return <>Languages: Undetermined</>;
  }

  // Rights
  static getLicense(item: ApiItem) {
    return item && item.rights && item.rights.length > 0
      ? `License: ${item.rights[0].rightsStatement}`
      : "License: Unknown";
  }

  // The button should say "Read Online" if the media type is "read" or "embed"
  static getReadOnlineLink = (item: ApiItem) => {
    const getReadLink = (item: ApiItem, mediaType: string) => {
      if (!item || !item.links) return undefined;
      const mediaTypes =
        mediaType === "read" ? MediaTypes.read : MediaTypes.embed;
      const selectedLink = item.links.find((link: ItemLink) =>
        mediaTypes.includes(link.mediaType)
      );
      return selectedLink;
    };

    const localLink = getReadLink(item, "read");
    const embeddedLink = getReadLink(item, "embed");

    //Prefer local link over embedded link
    const readOnlineLink = localLink ? localLink : embeddedLink;
    if (readOnlineLink) {
      return (
        <Link
          to={{
            pathname: `/read/${readOnlineLink.link_id}`,
          }}
          linkType={DS.LinkTypes.Button}
        >
          Read Online
        </Link>
      );
    }

    return undefined;
  };

  // eslint-disable-next-line consistent-return
  static getDownloadLink(editionItem: ApiItem, title: string) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find((link: ItemLink) =>
      MediaTypes.download.includes(link.mediaType)
    );

    if (selectedLink && selectedLink.url) {
      return (
        <DS.Link type={DS.LinkTypes.Action}>
          <a
            href={`${formatUrl(selectedLink.url)}`}
            onClick={() => {
              gtag.drbEvents("Download", `${title}`);
            }}
          >
            <DS.Icon
              name={DS.IconNames.download}
              blockName="more-link"
              modifiers={["left"]}
              decorative
              iconRotation={DS.IconRotationTypes.rotate0}
            />
            Download
          </a>
        </DS.Link>
      );
    }
  }

  static getNoLinkElement(showRequestButton: boolean) {
    if (showRequestButton) {
      return <span>Not Yet Available {showRequestButton}</span>;
    }
    return <>Not yet available</>;
  }

  static getWorldCatElem(instance: Instance) {
    const oclc =
      instance && instance.identifiers
        ? instance.identifiers.find(
            (identifier: Identifier) => identifier.authority === "oclc"
          )
        : undefined;
    const oclcLink = oclc
      ? `https://www.worldcat.org/oclc/${oclc.identifier}`
      : undefined;
    return oclc ? (
      <a href={oclcLink} className="link">
        Find in a library
      </a>
    ) : (
      <>Find in Library Unavailable</>
    );
  }
}
