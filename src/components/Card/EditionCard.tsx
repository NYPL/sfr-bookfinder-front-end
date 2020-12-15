import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'dgx-... Remove this comment to see the full error message
import { gaUtils } from 'dgx-react-ga';
import { Html5Entities } from 'html-entities';
import * as DS from '@nypl/design-system-react-components';
import {
  MAX_TITLE_LENGTH, MAX_PUBLISHER_NAME_LENGTH, MAX_SUBTITILE_LENGTH, PLACEHOLDER_COVER_LINK,
} from '../../../src/constants/editioncard';
import { formatUrl, truncateStringOnWhitespace } from '../../util/Util';
import Link from '../Link/Link';


const htmlEntities = new Html5Entities();

// EditionCard holds all the methods needed to build an Edition Card
export default class EditionCard {
  static getPreferredAgent(agents: any, role: any) {
    if (!agents || !agents.length) return undefined;

    const viafAgents = agents.filter((agent: any) => agent.viaf !== null);
    if (viafAgents && viafAgents.length) {
      const foundAuthors = viafAgents.filter((agent: any) => agent.roles.includes(role));
      if (foundAuthors && foundAuthors.length) { return foundAuthors; }
    }

    const preferredAgents = agents.find((agent: any) => agent.roles.includes(role));
    return preferredAgents ? [preferredAgents] : undefined;
  }

  // Edition Year
  static editionYearElem(edition: any) {
    const editionDisplay = EditionCard.editionYearText(edition);
    const editionElem = edition ? (
      <DS.Link>
        <Link
          to={{ pathname: '/edition', query: { editionId: edition.id } }}
        >
          {editionDisplay}
        </Link>
      </DS.Link>
    ) : 
      <>{editionDisplay}</>;
    return editionElem;
  }

  static editionYearText(edition: any) {
    return edition && edition.publication_date
      ? `${edition.publication_date} Edition` : 'Edition Year Unknown';
  }

  static getFirstAndCountMore(array: any) {
    let moreText;
    if (array.length <= 1) { moreText = ''; } else { moreText = ` + ${array.length - 1} more`; }
    return `${array[0]}${moreText}`;
  }

  // Title
  static generateTitleLinkElem(work: any) {
    const displayTitle = EditionCard.generateDisplayTitle(work);
    return (
      <Link
        to={{ pathname: '/work', query: { workId: `${work.uuid}`, recordType: 'editions', showAll: true } }}
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
      displayTitle = 'Title Unknown';
    } else {
      displayTitle = truncateStringOnWhitespace(work.title, MAX_TITLE_LENGTH);
    }
    return displayTitle;
  }

  // Subtitle
  static getSubtitle(subtitle: any) {
    if (!subtitle) { return undefined; }
    return (<span>{truncateStringOnWhitespace(subtitle, MAX_SUBTITILE_LENGTH)}</span>);
  }

  // Author
  static getAuthorIdentifier(author: any) {
    return (author.viaf && ['viaf', 'viaf']) || (author.lcnaf && ['lcnaf', 'lcnaf']) || ['name', 'author'];
  }

  static getLinkToAuthorSearch(author: any) {
    return ({
      queries: JSON.stringify([{
        query: author[EditionCard.getAuthorIdentifier(author)[0]],
        field: EditionCard.getAuthorIdentifier(author)[1],
      }]),
      showQueries: JSON.stringify([{ query: author.name, field: 'author' }]),
    });
  }

  static getAuthorsList(agents: any, linkKeyPrefix: any) {
    if (!agents || !agents.length) return null;
    return agents.map((authorAgent: any) => {
      const authorLinkText = authorAgent.name;
      return (
        <Link
          to={{ pathname: '/search', query: EditionCard.getLinkToAuthorSearch(authorAgent) }}
          className="link"
          key={authorAgent.viaf ? `${linkKeyPrefix}-${authorAgent.viaf}` : `${linkKeyPrefix}-${authorAgent.name}`}
        >
          {authorLinkText}
        </Link>
      );
    });
  }

  // Cover
  static getCover(previewEdition: any) {
    if (!previewEdition) return PLACEHOLDER_COVER_LINK;
    if (!previewEdition.covers || !previewEdition.covers.length) return PLACEHOLDER_COVER_LINK;

    const firstLocalCover = previewEdition.covers.find((cover: any) => cover.flags.temporary === false);
    return firstLocalCover ? formatUrl(firstLocalCover.url) : PLACEHOLDER_COVER_LINK;
  }

  // Publisher Location and name
  static publisherDisplayLocation(previewEdition: any) {
    return (
      previewEdition && previewEdition.publication_place
        ? ` in ${previewEdition.publication_place}` : '');
  }

  static publisherDisplayText(previewEdition: any) {
    if (!previewEdition) return '';
    const preferredAgents = EditionCard.getPreferredAgent(previewEdition.agents, 'publisher');
    if (!preferredAgents) return '';
    const publisherNames = preferredAgents.map((pubAgent: any) => pubAgent.name);
    const publisherText = ` by ${EditionCard.getFirstAndCountMore(publisherNames)}`;
    return truncateStringOnWhitespace(publisherText, MAX_PUBLISHER_NAME_LENGTH);
  }

  static getPublisherAndLocation(previewEdition: any) {
    const displayLocation = EditionCard.publisherDisplayLocation(previewEdition);
    const displayName = EditionCard.publisherDisplayText(previewEdition);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (!displayLocation && !displayName) return <>Publisher and Location Unknown</>;
    const publisherText = `Published${displayLocation}${displayName}`;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>{publisherText}</>
    );
  }

  // Language Display
  static getLanguageDisplayText(previewEdition: any) {
    if (previewEdition && previewEdition.languages && previewEdition.languages.length) {
      const languagesTextList = previewEdition.languages.filter((lang: any) => lang.language).map((lang: any) => lang.language);
      if (languagesTextList && languagesTextList.length) {
        const languageText = `Languages: ${languagesTextList.join(', ')}`;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>{languageText}</>;
      }
    }
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>Languages: Undetermined</>;
  }

  // Rights
  static getLicense(editionItem: any) {
    return (editionItem && editionItem.rights && editionItem.rights.length
      ? `License: ${editionItem.rights[0].rights_statement}` : 'License: Unknown');
  }

  // Read Online and Download Urls
  // Generate URL of the format that is served by Ereader streamed server.
  // This is specific to and backwards-engineered from the webpub-viewer URLs.
  // and should be changed when webpub-viewer is able to generate more reasonable URLs.
  static generateStreamedReaderUrl(url: any, eReaderUrl: any, referrer: any) {
    const base64BookUrl = Buffer.from(formatUrl(url)).toString('base64');
    const encodedBookUrl = encodeURIComponent(`${base64BookUrl}`);

    let combined = `${eReaderUrl}/readerNYPL/?url=${eReaderUrl}/pub/${encodedBookUrl}/manifest.json`;
    if (referrer) {
      combined += `#${referrer}`;
    }
    return combined;
  }

  /** Generate Read Online Link
   * @param edition The edition requested. Used to get information for breadcrumb and analytics.
   * @param item The item of the edition requested
   * @param eReaderUrl The link to the eReader
   * @param referrer The referring site (to enable back button functionality)
   * @param work (Optional) The work from the edition requested.
   * This is used to get the work title for the breadcrumb and analytics if title isn't already passed in edition.
  */
  static getReadOnlineLink(edition: any, item: any, eReaderUrl: any, referrer: any, work: any) {
    if (!item || !item.links) return undefined;
    const editionWithTitle = edition;
    editionWithTitle.title = edition.title || work.title;
    // TODO: Revert after links fix
    const selectedLink = item.links.find((link: any) => (!link.local && !link.download) || (link.local && link.download));
    if (!selectedLink || !selectedLink.url) return undefined;
    if (selectedLink.local) {
      const encodedUrl = EditionCard.generateStreamedReaderUrl(selectedLink.url, eReaderUrl, referrer);
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DS.Link linkType={DS.LinkTypes.Button}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Link
            to={{ pathname: '/read-online', search: `?url=${encodeURI(encodedUrl)}`, state: { edition: editionWithTitle } }}
            onClick={() => gaUtils.trackGeneralEvent('Read Online', item.source, editionWithTitle.title, '')}
          >
          Read Online
          </Link>
        </DS.Link>
      );
    }
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DS.Link
        linkType={DS.LinkTypes.Button}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link
          to={{ pathname: '/read-online', search: `?url=${formatUrl(selectedLink.url)}`, state: { edition: editionWithTitle } }}
          onClick={() => gaUtils.trackGeneralEvent('Read Online', item.source, editionWithTitle.title, '')}
        >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div>Read Online</div>
        </Link>
      </DS.Link>

    );
  }

  // eslint-disable-next-line consistent-return
  static getDownloadLink(work: any, editionItem: any) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find((link: any) => link.download);

    if (selectedLink && selectedLink.url) {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DS.Link
          linkType={DS.LinkTypes.Action}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <a
            href={`${formatUrl(selectedLink.url, process.env.APP_ENV)}`}
            onClick={() => gaUtils.trackGeneralEvent('Download', editionItem.source, work.title, '')}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <DS.Icon
              name="download"
              blockName="more-link"
              modifiers={['left']}
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
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span>
          Not Yet Available
          {' '}
          {showRequestButton}
        </span>
      );
    }
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <>Not yet available</>
    );
  }

  static getWorldCatElem(instance: any) {
    const oclc = instance && instance.identifiers
      ? instance.identifiers.find((identifier: any) => identifier.id_type === 'oclc').identifier : undefined;
    const oclcLink = oclc ? `https://www.worldcat.org/oclc/${oclc}` : undefined;
    return (
      oclc
        ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <a
            href={oclcLink}
            className="link"
          >
          Find in a library
          </a>
        ) : // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>Find in Library Unavailable</>
    );
  }

  static getEditionData(work: any, edition: any, eReaderUrl: any, referrer: any, showRequestButton: any) {
    const editionYearHeadingElement = EditionCard.editionYearElem(edition);
    const editionItem = edition && edition.items ? edition.items[0] : undefined;

    return {
      editionYearHeading: editionYearHeadingElement,
      coverUrl: EditionCard.getCover(edition),
      editionInfo: [EditionCard.getPublisherAndLocation(edition),
        EditionCard.getLanguageDisplayText(edition),
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        // eslint-disable-next-line react/jsx-key
        <DS.Link><Link to="/license">{ EditionCard.getLicense(editionItem) }</Link></DS.Link>],
      readOnlineLink: EditionCard.getReadOnlineLink(edition, editionItem, eReaderUrl, referrer, work),
      downloadLink: EditionCard.getDownloadLink(edition, editionItem),
      noLinkElement: EditionCard.getNoLinkElement(showRequestButton),
    };
  }

  static getInstanceData(edition: any, instance: any, eReaderUrl: any, referrer: any) {
    const instanceItem = instance && instance.items ? instance.items[0] : undefined;
    return {
      coverUrl: EditionCard.getCover(instance),
      editionInfo: [EditionCard.getPublisherAndLocation(instance), EditionCard.getWorldCatElem(instance)],
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 5 arguments, but got 4.
      readOnlineLink: EditionCard.getReadOnlineLink(edition, instanceItem, eReaderUrl, referrer),
      downloadLink: EditionCard.getDownloadLink(edition, instanceItem),
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      noLinkElement: EditionCard.getNoLinkElement(),
    };
  }
}
