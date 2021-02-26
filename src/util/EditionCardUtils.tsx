import React from "react";
import { Agent, Cover, Item, ItemLink, WorkEdition } from "../types/DataModel";
import * as DS from "@nypl/design-system-react-components";
import Link from "~/src/components/Link/Link";
import { AllHtmlEntities } from "html-entities";
import { formatUrl, truncateStringOnWhitespace } from "./Util";
import {
  MAX_PUBLISHER_NAME_LENGTH,
  MAX_SUBTITILE_LENGTH,
  MAX_TITLE_LENGTH,
  PLACEHOLDER_COVER_LINK,
} from "../constants/editioncard";

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

  // Edition Year
  static editionYearElem(edition: WorkEdition) {
    const editionDisplay = EditionCardUtils.editionYearText(edition);
    const editionElem = edition ? (
      <Link
        to={{
          pathname: `/edition/${edition.id}`,
        }}
      >
        {editionDisplay}
      </Link>
    ) : (
      <>{editionDisplay}</>
    );
    return editionElem;
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
        title={AllHtmlEntities.decode(displayTitle)}
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

  static getLinkToAuthorSearch(author: Agent) {
    return {
      queries: JSON.stringify([
        {
          query: author[EditionCardUtils.getAuthorIdentifier(author)[0]],
          field: EditionCardUtils.getAuthorIdentifier(author)[1],
        },
      ]),
      showQueries: JSON.stringify([{ query: author.name, field: "author" }]),
    };
  }

  static getAuthorsList(agents: Agent[], linkKeyPrefix: string): JSX.Element[] {
    if (!agents || !agents.length) return null;
    return agents.map((authorAgent: any) => {
      const authorLinkText = authorAgent.name;
      return (
        <Link
          to={{
            pathname: "/search",
            query: EditionCardUtils.getLinkToAuthorSearch(authorAgent),
          }}
          className="link"
          key={
            authorAgent.viaf
              ? `${linkKeyPrefix}-${authorAgent.viaf}`
              : `${linkKeyPrefix}-${authorAgent.name}`
          }
        >
          {authorLinkText}
        </Link>
      );
    });
  }

  /** Get Cover Image
   * @param covers - The list of covers
   * @returns The URL of the cover that should be displayed.
   */

  static getCover(covers: Cover[]): string {
    if (!covers || !covers.length) return PLACEHOLDER_COVER_LINK;

    const firstLocalCover = covers.find(
      (cover: any) => cover.flags.temporary === false
    );
    return firstLocalCover
      ? formatUrl(firstLocalCover.url)
      : PLACEHOLDER_COVER_LINK;
  }

  /**
   * Get publisher and publish location
   * @param pubPlace - The display name of the place of publication
   * @param agents - an array of Agents
   * @returns A display element for publisher and location
   */
  static getPublisherAndLocation(
    pubPlace: string,
    agents: Agent[]
  ): JSX.Element {
    const publisherDisplayLocation = (pubPlace: string) => {
      return pubPlace ? ` in ${pubPlace}` : "";
    };

    const publisherDisplayText = (agents: Agent[]) => {
      if (!agents) return "";
      const preferredAgents = EditionCardUtils.getPreferredAgent(
        agents,
        "publisher"
      );
      if (!preferredAgents) return "";
      const publisherNames = preferredAgents.map(
        (pubAgent: any) => pubAgent.name
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
    const displayName = publisherDisplayText(agents);
    if (!displayLocation && !displayName)
      return <>Publisher and Location Unknown</>;
    const publisherText = `Published${displayLocation}${displayName}`;
    return <>{publisherText}</>;
  }

  // Language Display
  static getLanguageDisplayText(previewEdition: any) {
    if (
      previewEdition &&
      previewEdition.languages &&
      previewEdition.languages.length
    ) {
      const languagesTextList = previewEdition.languages
        .filter((lang: any) => lang.language)
        .map((lang: any) => lang.language);
      if (languagesTextList && languagesTextList.length) {
        const languageText = `Languages: ${languagesTextList.join(", ")}`;
        return <>{languageText}</>;
      }
    }
    return <>Languages: Undetermined</>;
  }

  // Rights
  static getLicense(editionItem: any) {
    return editionItem && editionItem.rights && editionItem.rights.length
      ? `License: ${editionItem.rights[0].rights_statement}`
      : "License: Unknown";
  }

  static getReadOnlineLink = (editionId: number, item: Item) => {
    const getEmbeddedReadLink = (item: Item) => {
      if (!item || !item.links) return undefined;
      //handle error

      const selectedLink = item.links.find(
        (link: ItemLink) => !link.local && !link.download
      );
      return selectedLink;
    };

    //The local read link is locally hosted and should be read via webpub viewer.
    const getLocalReadLink = (item: Item) => {
      if (!item || !item.links) return undefined;
      //handle error
      const selectedLink = item.links.find(
        (link: ItemLink) =>
          link.local && link.media_type === "application/epub+xml"
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
          //TODO: Tracking
          // onClick={() =>
          //   gaUtils.trackGeneralEvent(
          //     "Read Online",
          //     item.source,
          //     editionWithTitle.title,
          //     ""
          //   )
          // }
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
          //TODO: Tracking
          // onClick={() =>
          //   gaUtils.trackGeneralEvent(
          //     "Read Online",
          //     item.source,
          //     editionWithTitle.title,
          //     ""
          //   )
          // }
        >
          Read Online
        </Link>
      );
    }

    return undefined;
  };

  // eslint-disable-next-line consistent-return
  static getDownloadLink(editionItem: Item) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find((link: any) => link.download);

    if (selectedLink && selectedLink.url) {
      return (
        <DS.Link type={DS.LinkTypes.Action}>
          {/* TODO: append env */}
          <a
            href={`${formatUrl(selectedLink.url)}`}
            // onClick={() =>
            //   gaUtils.trackGeneralEvent(
            //     "Download",
            //     editionItem.source,
            //     work.title,
            //     ""
            //   )
            // }
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

  static getNoLinkElement(showRequestButton: any) {
    if (showRequestButton) {
      return <span>Not Yet Available {showRequestButton}</span>;
    }
    return <>Not yet available</>;
  }

  static getWorldCatElem(instance: any) {
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
