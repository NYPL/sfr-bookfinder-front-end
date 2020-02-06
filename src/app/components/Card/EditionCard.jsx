import React from 'react';
import { Link } from 'react-router';
import { Html5Entities } from 'html-entities';
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
  static editionYearElem(previewEdition, workUuid) {
    const editionDisplay = previewEdition && previewEdition.publication_date
      ? `${previewEdition.publication_date} Edition` : 'Edition Year Unknown';
    return (
      <span>
        {workUuid
          && (
            <Link
              to={{ pathname: '/work', query: { workId: `${workUuid}` } }}
              className="heading__link"
            >
              {editionDisplay}
            </Link>
          )}
        {!workUuid && <>{ editionDisplay }</>}
      </span>
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
        to={{ pathname: '/work', query: { workId: `${uuid}`, recordType: 'editions' } }}
        title={htmlEntities.decode(title)}
        className="link link--no-underline"
      >
        {displayTitle}
      </Link>
    );
  }

  // Subtitle
  static getSubtitleText(subtitle) {
    return (subtitle && subtitle.length > MAX_SUBTITILE_LENGTH
      ? `${subtitle.substring(0, MAX_SUBTITILE_LENGTH)}...` : subtitle);
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
      showQuery: `"${author.name}"`,
      showField: 'author',
    });
  }

  static getAuthorsList(agents) {
    if (!agents || !agents.length) return null;
    return agents.map((authorAgent) => {
      const authorLinkText = authorAgent.name;
      return (
        <Link
          to={{ pathname: '/search', query: EditionCard.getLinkToAuthorSearch(authorAgent) }}
          className="link"
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
    return firstLocalCover ? formatUrl(firstLocalCover.url, process.env.APP_ENV) : PLACEHOLDER_COVER_LINK;
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
    return (
      `Published${displayLocation}${displayName}`
    );
  }

  // Language Display
  static getLanguageDisplayText(previewEdition) {
    if (previewEdition && previewEdition.languages && previewEdition.languages.length) {
      const languagesTextList = previewEdition.languages.filter(lang => lang.language).map(lang => lang.language);
      if (languagesTextList && languagesTextList.length) return `Languages: ${languagesTextList.join(', ')}`;
    }
    return 'Languages: Undetermined';
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
    const base64BookUrl = Buffer.from(formatUrl(url, process.env.APP_ENV)).toString('base64');
    const encodedBookUrl = encodeURIComponent(`${base64BookUrl}`);

    let combined = `${eReaderUrl}/readerNYPL/?url=${eReaderUrl}/pub/${encodedBookUrl}/manifest.json`;
    if (referrer) {
      combined += `#${referrer}`;
    }
    return combined;
  }

  // TODO: Local links should not have headers
  static getReadOnlineLink(origin, editionItem, eReaderUrl, referrer) {
    if (!editionItem || !editionItem.links) return undefined;
    // TODO: Revert after links fix
    const selectedLink = editionItem.links.find(link => (!link.local && !link.download) || (link.local && link.download));
    if (!selectedLink || !selectedLink.url) return undefined;
    if (selectedLink.local) {
      const encodedUrl = EditionCard.generateStreamedReaderUrl(selectedLink.url, eReaderUrl, referrer);
      return `${origin}/read-online?url=${encodeURI(encodedUrl)}`;
    }
    return `${origin}/read-online?url=${formatUrl(selectedLink.url, process.env.APP_ENV)}`;
  }

  static getDownloadLink(editionItem) {
    if (!editionItem || !editionItem.links) return undefined;
    const selectedLink = editionItem.links.find(link => link.download);
    return selectedLink && selectedLink.url ? formatUrl(selectedLink.url, process.env.APP_ENV) : undefined;
  }

  static getEditionData(edition, origin, eReaderUrl, referrer) {
    const editionYearHeadingElement = EditionCard.editionYearElem(edition);
    const editionItem = edition && edition.items ? edition.items[0] : undefined;

    return {
      editionYearHeading: editionYearHeadingElement,
      publisherAndLocation: EditionCard.getPublisherAndLocation(edition),
      coverUrl: EditionCard.getCover(edition),
      language: EditionCard.getLanguageDisplayText(edition),
      license: EditionCard.getLicense(editionItem),
      readOnlineLink: EditionCard.getReadOnlineLink(origin, editionItem, eReaderUrl, referrer),
      downloadLink: EditionCard.getDownloadLink(editionItem),
    };
  }
}
