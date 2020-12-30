import React from "react";
import { gaUtils } from "dgx-react-ga";
import { Html5Entities } from "html-entities";
import * as DS from "@nypl/design-system-react-components";
import {
  MAX_TITLE_LENGTH,
  MAX_PUBLISHER_NAME_LENGTH,
  MAX_SUBTITILE_LENGTH,
  PLACEHOLDER_COVER_LINK,
} from "../../../src/constants/editioncard";
import { formatUrl, truncateStringOnWhitespace } from "../../util/Util";
import Link from "../Link/Link";
import { Item, ItemLink } from "~/src/types/DataModel";

const htmlEntities = new Html5Entities();

// EditionCard holds all the methods needed to build an Edition Card
export default class EditionCard {
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
  static editionYearElem(edition: any) {
    const editionDisplay = EditionCard.editionYearText(edition);
    const editionElem = edition ? (
      <DS.Link>
        <Link
          to={{
            pathname: `/edition/${edition.id}`,
          }}
        >
          {editionDisplay}
        </Link>
      </DS.Link>
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
    const displayTitle = EditionCard.generateDisplayTitle(work);
    return (
      <Link
        to={{
          pathname: `/work/${work.uuid}`,
          query: {
            recordType: "editions",
            showAll: true,
          },
        }}
        title={htmlEntities.decode(displayTitle)}
        className="link link--no-underline"
      >
        {displayTitle}
      </Link>
    );
  }

  static generateDisplayTitle(work: any) {
    let displayTitle;
    if (!work.title) {
      displayTitle = "Title Unknown";
    } else {
      displayTitle = truncateStringOnWhitespace(work.title, MAX_TITLE_LENGTH);
    }
    return displayTitle;
  }

  // Subtitle
  static getSubtitle(subtitle: any) {
    if (!subtitle) {
      return undefined;
    }
    return (
      <span>{truncateStringOnWhitespace(subtitle, MAX_SUBTITILE_LENGTH)}</span>
    );
  }

  // Author
  static getAuthorIdentifier(author: any) {
    return (
      (author.viaf && ["viaf", "viaf"]) ||
      (author.lcnaf && ["lcnaf", "lcnaf"]) || ["name", "author"]
    );
  }

  static getLinkToAuthorSearch(author: any) {
    return {
      queries: JSON.stringify([
        {
          query: author[EditionCard.getAuthorIdentifier(author)[0]],
          field: EditionCard.getAuthorIdentifier(author)[1],
        },
      ]),
      showQueries: JSON.stringify([{ query: author.name, field: "author" }]),
    };
  }

  static getAuthorsList(agents: any, linkKeyPrefix: any) {
    if (!agents || !agents.length) return null;
    return agents.map((authorAgent: any) => {
      const authorLinkText = authorAgent.name;
      return (
        <Link
          to={{
            pathname: "/search",
            query: EditionCard.getLinkToAuthorSearch(authorAgent),
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

  // Cover
  static getCover(previewEdition: any) {
    if (!previewEdition) return PLACEHOLDER_COVER_LINK;
    if (!previewEdition.covers || !previewEdition.covers.length)
      return PLACEHOLDER_COVER_LINK;

    const firstLocalCover = previewEdition.covers.find(
      (cover: any) => cover.flags.temporary === false
    );
    return firstLocalCover
      ? formatUrl(firstLocalCover.url)
      : PLACEHOLDER_COVER_LINK;
  }

  // Publisher Location and name
  static publisherDisplayLocation(previewEdition: any) {
    return previewEdition && previewEdition.publication_place
      ? ` in ${previewEdition.publication_place}`
      : "";
  }

  static publisherDisplayText(previewEdition: any) {
    if (!previewEdition) return "";
    const preferredAgents = EditionCard.getPreferredAgent(
      previewEdition.agents,
      "publisher"
    );
    if (!preferredAgents) return "";
    const publisherNames = preferredAgents.map(
      (pubAgent: any) => pubAgent.name
    );
    const publisherText = ` by ${EditionCard.getFirstAndCountMore(
      publisherNames
    )}`;
    return truncateStringOnWhitespace(publisherText, MAX_PUBLISHER_NAME_LENGTH);
  }

  static getPublisherAndLocation(previewEdition: any) {
    const displayLocation = EditionCard.publisherDisplayLocation(
      previewEdition
    );
    const displayName = EditionCard.publisherDisplayText(previewEdition);
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

  static getReadOnlineLink = (item: Item) => {
    const getEmbeddedReaedLink = (item: Item) => {
      if (!item || !item.links) return undefined;
      //handle error

      const selectedLink = item.links.find(
        (link: ItemLink) => !link.local && !link.download
      );
      return selectedLink;
    };

    //The local read link is locally hosted and should be read via webpub viewer.
    const getLocalReadLink = (item: Item) => {
      console.log("getting link", item);
      if (!item || !item.links) return undefined;
      //handle error

      const selectedLink = item.links.find(
        (link: ItemLink) => link.local && link.url.endsWith(".opf")
      );
      return selectedLink;
    };

    const localLink = getLocalReadLink(item);
    const embeddedLink = getEmbeddedReaedLink(item);

    if (localLink) {
      return (
        <DS.Link>
          {/* linkType={DS.LinkTypes.Button} */}
          <Link
            to={{
              pathname: `/read-local/${encodeURIComponent(localLink.url)}`,
            }}
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
        </DS.Link>
      );
    }

    if (embeddedLink) {
      return (
        <DS.Link>
          {/* linkType={DS.LinkTypes.Button} */}
          <Link
            to={{
              pathname: `/read-embed/${encodeURIComponent(embeddedLink.url)}`,
            }}
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
        </DS.Link>
      );
    }

    return undefined;
  };

  // eslint-disable-next-line consistent-return
  static getDownloadLink(work: any, editionItem: any) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find((link: any) => link.download);

    if (selectedLink && selectedLink.url) {
      return (
        <DS.Link>
          {/* linkType={DS.LinkTypes.Action}> */}
          <a
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
            href={`${formatUrl(selectedLink.url, process.env.APP_ENV)}`}
            onClick={() =>
              gaUtils.trackGeneralEvent(
                "Download",
                editionItem.source,
                work.title,
                ""
              )
            }
          >
            <DS.Icon
              name="download"
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

  static getEditionData(
    work: any,
    edition: any,
    eReaderUrl: any,
    referrer: any,
    showRequestButton: any
  ) {
    const editionYearHeadingElement = EditionCard.editionYearElem(edition);
    const editionItem = edition && edition.items ? edition.items[0] : undefined;

    return {
      editionYearHeading: editionYearHeadingElement,
      coverUrl: EditionCard.getCover(edition),
      editionInfo: [
        EditionCard.getPublisherAndLocation(edition),
        EditionCard.getLanguageDisplayText(edition),

        // eslint-disable-next-line react/jsx-key
        <DS.Link>
          <Link to="/license">{EditionCard.getLicense(editionItem)}</Link>
        </DS.Link>,
      ],
      readOnlineLink: EditionCard.getReadOnlineLink(editionItem),
      downloadLink: EditionCard.getDownloadLink(edition, editionItem),
      noLinkElement: EditionCard.getNoLinkElement(showRequestButton),
    };
  }

  static getInstanceData(
    edition: any,
    instance: any,
    eReaderUrl: any,
    referrer: any
  ) {
    const instanceItem =
      instance && instance.items ? instance.items[0] : undefined;
    return {
      coverUrl: EditionCard.getCover(instance),
      editionInfo: [
        EditionCard.getPublisherAndLocation(instance),
        EditionCard.getWorldCatElem(instance),
      ],
      readOnlineLink: EditionCard.getReadOnlineLink(instanceItem),
      downloadLink: EditionCard.getDownloadLink(edition, instanceItem),
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      noLinkElement: EditionCard.getNoLinkElement(),
    };
  }
}
