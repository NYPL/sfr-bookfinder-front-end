import React from "react";
import {
  Agent,
  Instance,
  ApiItem,
  ItemLink,
  Language,
  Rights,
  WorkEdition,
} from "../types/DataModel";
import * as DS from "@nypl/design-system-react-components";
import Link from "~/src/components/Link/Link";
import { formatUrl, truncateStringOnWhitespace } from "./Util";
import {
  MAX_PUBLISHER_NAME_LENGTH,
  MAX_SUBTITILE_LENGTH,
  MAX_TITLE_LENGTH,
  PLACEHOLDER_COVER_LINK,
} from "../constants/editioncard";
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

  static editionYearText(edition: any) {
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
    return `${array[0]}${moreText}`;
  }

  // Title
  static generateTitleLinkElem(work: any) {
    const displayTitle = EditionCardUtils.generateDisplayTitle(work);
    return (
      <Link
        to={{
          pathname: `/work/${work.uuid}`,
          query: {
            recordType: "editions",
            showAll: true,
          },
        }}
        title={displayTitle}
        className="link link--no-underline"
      >
        {displayTitle}
      </Link>
    );
  }

  static generateDisplayTitle(title: string | undefined): string {
    let displayTitle;
    if (!title) {
      displayTitle = "Title Unknown";
    } else {
      displayTitle = truncateStringOnWhitespace(title, MAX_TITLE_LENGTH);
    }
    return displayTitle;
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
      return (
        <React.Fragment
          key={author.viaf ? `author-${author.viaf}` : `author-${author.name}`}
        >
          <Link
            to={{
              pathname: "/search",
              query: {
                query: `author:${author.name}`,
              },
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
    if (!links || !links.length) return PLACEHOLDER_COVER_LINK;
    return formatUrl(
      links.find((link) => {
        return MediaTypes.display.includes(link.mediaType);
      }).url
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
    publishers: Agent[]
  ): JSX.Element {
    const publisherDisplayLocation = (pubPlace: string) => {
      return pubPlace ? ` in ${pubPlace}` : "";
    };

    const publisherDisplayText = (publishers: Agent[]) => {
      console.log("publisherDisplayText", publishers);
      if (!publishers || publishers.length === 0) return "";
      const publisherNames = publishers.map(
        (pubAgent: Agent) => pubAgent && pubAgent.name
      );
      const publisherText = ` by ${EditionCardUtils.getFirstAndCountMore(
        publisherNames
      )}`;

      return truncateStringOnWhitespace(
        publisherText,
        MAX_PUBLISHER_NAME_LENGTH
      );
    };

    const displayLocation = publisherDisplayLocation(pubPlace);
    const displayName = publisherDisplayText(publishers);
    console.log("displayName", displayName);
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
  static getLicense(rights: Rights[]) {
    return rights && rights.length
      ? `License: ${rights[0].rights_statement}`
      : "License: Unknown";
  }

  static getReadOnlineLink = (editionId: number, item: ApiItem) => {
    const getEmbeddedReadLink = (item: ApiItem) => {
      if (!item || !item.links) return undefined;
      const selectedLink = item.links.find((link: ItemLink) =>
        MediaTypes.embed.includes(link.mediaType)
      );
      return selectedLink;
    };

    //The local read link is locally hosted and should be read via webpub viewer.
    const getLocalReadLink = (item: ApiItem) => {
      if (!item || !item.links) return undefined;
      //handle error
      const selectedLink = item.links.find((link: ItemLink) =>
        MediaTypes.read.includes(link.mediaType)
      );
      return selectedLink;
    };

    const localLink = getLocalReadLink(item);
    const embeddedLink = getEmbeddedReadLink(item);

    if (localLink) {
      return (
        <Link
          to={{
            pathname: `/edition/${editionId}/read-local/${encodeURIComponent(
              localLink.url
            )}`,
          }}
          linkType={DS.LinkTypes.Button}
        >
          Read Online
        </Link>
      );
    }

    if (embeddedLink) {
      return (
        <Link
          to={{
            pathname: `/edition/${editionId}/read-embed/${encodeURIComponent(
              embeddedLink.url
            )}`,
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
  static getDownloadLink(editionItem: ApiItem) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find((link: ItemLink) =>
      MediaTypes.download.includes(link.mediaType)
    );

    if (selectedLink && selectedLink.url) {
      return (
        <DS.Link type={DS.LinkTypes.Action}>
          <a href={`${formatUrl(selectedLink.url)}`}>
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
            (identifier: any) => identifier.id_type === "oclc"
          ).identifier
        : undefined;
    const oclcLink = oclc ? `https://www.worldcat.org/oclc/${oclc}` : undefined;
    return oclc ? (
      <a href={oclcLink} className="link">
        Find in a library
      </a>
    ) : (
      <>Find in Library Unavailable</>
    );
  }
}
