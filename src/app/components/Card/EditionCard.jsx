import React from 'react';
import { Link } from 'react-router';
import { gaUtils } from 'dgx-react-ga';
import { Html5Entities } from 'html-entities';
import * as DS from '@nypl/design-system-react-components';
import {
  MAX_TITLE_LENGTH, MAX_PUBLISHER_NAME_LENGTH, MAX_SUBTITILE_LENGTH, PLACEHOLDER_COVER_LINK,
} from '../../constants/editioncard';
import { formatUrl } from '../../util/Util';


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
  // Note:  This link currently goes to the Work Detail page.
  // It should link to the Edition Detail page when it is implemented.
  static editionYearElem(previewEdition) {
    const editionDisplay = previewEdition && previewEdition.publication_date
      ? `${previewEdition.publication_date} Edition` : 'Edition Year Unknown';
    return (
      <Link
        to={{ pathname: '/edition', query: { editionId: `${previewEdition.id}` } }}
        className="heading__link"
      >
        {editionDisplay}
      </Link>
    );
  }

  static getFirstAndCountMore(array) {
    let moreText;
    if (array.length <= 1) { moreText = ''; } else { moreText = ` + ${array.length - 1} more`; }
    return `${array[0]}${moreText}`;
  }

  // Title
  static generateTitleLinkElem(title, uuid) {
    let displayTitle;
    if (!title) {
      displayTitle = 'Title Unknown';
    } else if (title.length > MAX_TITLE_LENGTH) {
      displayTitle = `${title.substring(0, MAX_TITLE_LENGTH)}...`;
    } else {
      displayTitle = title;
    }
    return (
      <Link
        to={{ pathname: '/work', query: { workId: `${uuid}`, recordType: 'editions', showAll: true } }}
        title={htmlEntities.decode(title)}
        className="link link--no-underline"
      >
        {displayTitle}
      </Link>
    );
  }

  // Subtitle
  static getSubtitle(subtitle) {
    if (!subtitle) { return undefined; }
    return (subtitle && subtitle.length > MAX_SUBTITILE_LENGTH
      ? (
        <span>
          {subtitle.substring(0, MAX_SUBTITILE_LENGTH)}
          ...
        </span>
      ) : <span>{subtitle}</span>);
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
    if (publisherText.length > MAX_PUBLISHER_NAME_LENGTH) {
      return `${publisherText.substring(0, MAX_PUBLISHER_NAME_LENGTH)}...`;
    }
    return publisherText;
  }

  static getPublisherAndLocation(previewEdition) {
    const displayLocation = EditionCard.publisherDisplayLocation(previewEdition);
    const displayName = EditionCard.publisherDisplayText(previewEdition);
    if (!displayLocation && !displayName) return undefined;
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

  static getReadOnlineLink(work, editionItem, eReaderUrl, referrer) {
    if (!editionItem || !editionItem.links) return undefined;
    // TODO: Revert after links fix
    const selectedLink = editionItem.links.find(link => (!link.local && !link.download) || (link.local && link.download));
    if (!selectedLink || !selectedLink.url) return undefined;
    if (selectedLink.local) {
      const encodedUrl = EditionCard.generateStreamedReaderUrl(selectedLink.url, eReaderUrl, referrer);
      return (
        <DS.BasicLink className="edition-card__card-button-link">
          <Link
            to={{ pathname: '/read-online', search: `?url=${encodeURI(encodedUrl)}`, state: { work } }}
            onClick={() => gaUtils.trackGeneralEvent('Read Online', editionItem.source, work.title, '')}
          >
          Read Online
          </Link>
        </DS.BasicLink>
      );
    }
    return (
      <DS.BasicLink className="edition-card__card-button-link">
        <Link
          to={{ pathname: '/read-online', search: `?url=${formatUrl(selectedLink.url)}`, state: { work } }}
          onClick={() => gaUtils.trackGeneralEvent('Read Online', editionItem.source, work.title, '')}
        >
        Read Online
        </Link>
      </DS.BasicLink>

    );
  }

  // eslint-disable-next-line consistent-return
  static getDownloadLink(work, editionItem) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find(link => link.download);

    if (selectedLink && selectedLink.url) {
      return (
        <DS.IconLink
          iconName="download"
          iconPosition="left"
          iconModifiers={['icon-left']}
        >
          <a
            href={`${formatUrl(selectedLink.url, process.env.APP_ENV)}`}
            onClick={() => gaUtils.trackGeneralEvent('Download', editionItem.source, work.title, '')}
          >
          Download
          </a>
        </DS.IconLink>
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

  static getEditionData(work, edition, eReaderUrl, referrer, showRequestButton) {
    const editionYearHeadingElement = EditionCard.editionYearElem(edition);
    const editionItem = edition && edition.items ? edition.items[0] : undefined;

    return {
      editionYearHeading: editionYearHeadingElement,
      coverUrl: EditionCard.getCover(edition),
      editionInfo: [EditionCard.getPublisherAndLocation(edition),
        EditionCard.getLanguageDisplayText(edition),
        <DS.UnderlineLink><Link to="/license">{ EditionCard.getLicense(editionItem) }</Link></DS.UnderlineLink>],
      readOnlineLink: EditionCard.getReadOnlineLink(work, editionItem, eReaderUrl, referrer),
      downloadLink: EditionCard.getDownloadLink(work, editionItem),
      noLinkElement: EditionCard.getNoLinkElement(showRequestButton),
    };
  }

  static getInstanceData(edition, eReaderUrl, referrer, showRequestButton) {
    const editionYearHeadingElement = EditionCard.editionYearElem(edition);
    const editionItem = edition && edition.items ? edition.items[0] : undefined;

    return {
      editionYearHeading: editionYearHeadingElement,
      publisherAndLocation: EditionCard.getPublisherAndLocation(edition),
      coverUrl: EditionCard.getCover(edition),
      language: EditionCard.getLanguageDisplayText(edition),
      license: <DS.UnderlineLink><Link to="/license">{ EditionCard.getLicense(editionItem) }</Link></DS.UnderlineLink>,
      readOnlineLink: EditionCard.getReadOnlineLink(editionItem, editionItem, eReaderUrl, referrer),
      downloadLink: EditionCard.getDownloadLink(editionItem, editionItem),
      noLinkElement: EditionCard.getNoLinkElement(showRequestButton),
    };
  }
}
