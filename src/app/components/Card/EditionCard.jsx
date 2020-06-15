import React from 'react';
import { Link } from 'react-router';
import { gaUtils } from 'dgx-react-ga';
import { Html5Entities } from 'html-entities';
import * as DS from '@nypl/design-system-react-components';
import {
  MAX_TITLE_LENGTH, MAX_PUBLISHER_NAME_LENGTH, MAX_SUBTITILE_LENGTH, PLACEHOLDER_COVER_LINK,
} from '../../constants/editioncard';
import { formatUrl, truncateStringOnWhitespace } from '../../util/Util';


const htmlEntities = new Html5Entities();

// EditionCard holds all the methods needed to build an Edition Card
export default class EditionCard {
  static getPreferredAgent(agents, role) {
    if (!agents || !agents.length) return undefined;

    const viafAgents = agents.filter(agent => agent.viaf !== null);
    if (viafAgents && viafAgents.length) {
      const foundAuthors = viafAgents.filter(agent => agent.roles.includes(role));
      if (foundAuthors && foundAuthors.length) { return foundAuthors; }
    }

    const preferredAgents = agents.find(agent => agent.roles.includes(role));
    return preferredAgents ? [preferredAgents] : undefined;
  }

  // Edition Year
  static editionYearElem(edition) {
    const editionDisplay = EditionCard.editionYearText(edition);
    const editionElem = edition ? (
      <DS.Link>
        <Link
          to={{ pathname: '/edition', query: { editionId: edition.id } }}
        >
          {editionDisplay}
        </Link>
      </DS.Link>
    ) : <>{editionDisplay}</>;
    return editionElem;
  }

  static editionYearText(edition) {
    return edition && edition.publication_date
      ? `${edition.publication_date} Edition` : 'Edition Year Unknown';
  }

  static getFirstAndCountMore(array) {
    let moreText;
    if (array.length <= 1) { moreText = ''; } else { moreText = ` + ${array.length - 1} more`; }
    return `${array[0]}${moreText}`;
  }

  // Title
  static generateTitleLinkElem(work) {
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

  static generateDisplayTitle(work) {
    let displayTitle;
    if (!work.title) {
      displayTitle = 'Title Unknown';
    } else {
      displayTitle = truncateStringOnWhitespace(work.title, MAX_TITLE_LENGTH);
    }
    return displayTitle;
  }

  // Subtitle
  static getSubtitle(subtitle) {
    if (!subtitle) { return undefined; }
    return (<span>{truncateStringOnWhitespace(subtitle, MAX_SUBTITILE_LENGTH)}</span>);
  }

  // Author
  static getAuthorIdentifier(author) {
    return (author.viaf && ['viaf', 'viaf']) || (author.lcnaf && ['lcnaf', 'lcnaf']) || ['name', 'author'];
  }

  static getLinkToAuthorSearch(author) {
    return ({
      queries: JSON.stringify([{
        query: author[EditionCard.getAuthorIdentifier(author)[0]],
        field: EditionCard.getAuthorIdentifier(author)[1],
      }]),
      showQueries: JSON.stringify([{ query: author.name, field: 'author' }]),
    });
  }

  static getAuthorsList(agents, linkKeyPrefix) {
    if (!agents || !agents.length) return null;
    return agents.map((authorAgent) => {
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
  static getCover(previewEdition) {
    if (!previewEdition) return PLACEHOLDER_COVER_LINK;
    if (!previewEdition.covers || !previewEdition.covers.length) return PLACEHOLDER_COVER_LINK;

    const firstLocalCover = previewEdition.covers.find(cover => cover.flags.temporary === false);
    return firstLocalCover ? formatUrl(firstLocalCover.url) : PLACEHOLDER_COVER_LINK;
  }

  // Publisher Location and name
  static publisherDisplayLocation(previewEdition) {
    return (
      previewEdition && previewEdition.publication_place
        ? ` in ${previewEdition.publication_place}` : '');
  }

  static publisherDisplayText(previewEdition) {
    if (!previewEdition) return '';
    const preferredAgents = EditionCard.getPreferredAgent(previewEdition.agents, 'publisher');
    if (!preferredAgents) return '';
    const publisherNames = preferredAgents.map(pubAgent => pubAgent.name);
    const publisherText = ` by ${EditionCard.getFirstAndCountMore(publisherNames)}`;
    return truncateStringOnWhitespace(publisherText, MAX_PUBLISHER_NAME_LENGTH);
  }

  static getPublisherAndLocation(previewEdition) {
    const displayLocation = EditionCard.publisherDisplayLocation(previewEdition);
    const displayName = EditionCard.publisherDisplayText(previewEdition);
    if (!displayLocation && !displayName) return <>Publisher and Location Unknown</>;
    const publisherText = `Published${displayLocation}${displayName}`;
    return (
      <>{publisherText}</>
    );
  }

  // Language Display
  static getLanguageDisplayText(previewEdition) {
    if (previewEdition && previewEdition.languages && previewEdition.languages.length) {
      const languagesTextList = previewEdition.languages.filter(lang => lang.language).map(lang => lang.language);
      if (languagesTextList && languagesTextList.length) {
        const languageText = `Languages: ${languagesTextList.join(', ')}`;
        return <>{languageText}</>;
      }
    }
    return <>Languages: Undetermined</>;
  }

  // Rights
  static getLicense(editionItem) {
    return (editionItem && editionItem.rights && editionItem.rights.length
      ? `License: ${editionItem.rights[0].rights_statement}` : 'License: Unknown');
  }

  // Read Online and Download Urls
  // Generate URL of the format that is served by Ereader streamed server.
  // This is specific to and backwards-engineered from the webpub-viewer URLs.
  // and should be changed when webpub-viewer is able to generate more reasonable URLs.
  static generateStreamedReaderUrl(url, eReaderUrl, referrer) {
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
  static getReadOnlineLink(edition, item, eReaderUrl, referrer, work) {
    if (!item || !item.links) return undefined;
    const editionWithTitle = edition;
    editionWithTitle.title = edition.title || work.title;
    // TODO: Revert after links fix
    const selectedLink = item.links.find(link => (!link.local && !link.download) || (link.local && link.download));
    if (!selectedLink || !selectedLink.url) return undefined;
    if (selectedLink.local) {
      const encodedUrl = EditionCard.generateStreamedReaderUrl(selectedLink.url, eReaderUrl, referrer);
      return (
        <DS.Link linkType={DS.LinkTypes.Button}>
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
      <DS.Link
        linkType={DS.LinkTypes.Button}
      >
        <Link
          to={{ pathname: '/read-online', search: `?url=${formatUrl(selectedLink.url)}`, state: { edition: editionWithTitle } }}
          onClick={() => gaUtils.trackGeneralEvent('Read Online', item.source, editionWithTitle.title, '')}
        >
        Read Online
        </Link>
      </DS.Link>

    );
  }

  // eslint-disable-next-line consistent-return
  static getDownloadLink(work, editionItem) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find(link => link.download);

    if (selectedLink && selectedLink.url) {
      return (
        <DS.Link
          linkType={DS.LinkTypes.Action}
        >
          <a
            href={`${formatUrl(selectedLink.url, process.env.APP_ENV)}`}
            onClick={() => gaUtils.trackGeneralEvent('Download', editionItem.source, work.title, '')}
          >
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

  static getNoLinkElement(showRequestButton) {
    if (showRequestButton) {
      return (
        <span>
          Not Yet Available
          {' '}
          {showRequestButton}
        </span>
      );
    }
    return (
      <>Not yet available</>
    );
  }

  static getWorldCatElem(instance) {
    const oclc = instance && instance.identifiers
      ? instance.identifiers.find(identifier => identifier.id_type === 'oclc').identifier : undefined;
    const oclcLink = oclc ? `https://www.worldcat.org/oclc/${oclc}` : undefined;
    return (
      oclc
        ? (
          <a
            href={oclcLink}
            className="link"
          >
          Find in a library
          </a>
        ) : <>Find in Library Unavailable</>
    );
  }

  static getEditionData(work, edition, eReaderUrl, referrer, showRequestButton) {
    const editionYearHeadingElement = EditionCard.editionYearElem(edition);
    const editionItem = edition && edition.items ? edition.items[0] : undefined;

    return {
      editionYearHeading: editionYearHeadingElement,
      coverUrl: EditionCard.getCover(edition),
      editionInfo: [EditionCard.getPublisherAndLocation(edition),
        EditionCard.getLanguageDisplayText(edition),
        <DS.Link><Link to="/license">{ EditionCard.getLicense(editionItem) }</Link></DS.Link>],
      readOnlineLink: EditionCard.getReadOnlineLink(edition, editionItem, eReaderUrl, referrer, work),
      downloadLink: EditionCard.getDownloadLink(edition, editionItem),
      noLinkElement: EditionCard.getNoLinkElement(showRequestButton),
    };
  }

  static getInstanceData(edition, instance, eReaderUrl, referrer) {
    const instanceItem = instance && instance.items ? instance.items[0] : undefined;
    return {
      coverUrl: EditionCard.getCover(instance),
      editionInfo: [EditionCard.getPublisherAndLocation(instance), EditionCard.getWorldCatElem(instance)],
      readOnlineLink: EditionCard.getReadOnlineLink(edition, instanceItem, eReaderUrl, referrer),
      downloadLink: EditionCard.getDownloadLink(edition, instanceItem),
      noLinkElement: EditionCard.getNoLinkElement(),
    };
  }
}
