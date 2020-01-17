import React from 'react';
import { Link } from 'react-router';
import { Html5Entities } from 'html-entities';
import {
  MAX_TITLE_LENGTH, MAX_PUBLISHER_NAME_LENGTH, MAX_SUBTITILE_LENGTH, PLACEHOLDER_COVER_LINK,
} from '../../constants/editioncard';
import { formatUrl } from '../../util/Util';


// Data Transformation Utilities


export const getPreferredAgent = (agents, role) => {
  if (!agents || !agents.length) return undefined;

  const viafAgents = agents.filter(agent => agent.viaf !== null);
  if (viafAgents && viafAgents.length) {
    const foundAuthors = viafAgents.filter(agent => agent.roles.includes(role));
    if (foundAuthors && foundAuthors.length) { return foundAuthors; }
  }

  return [agents.find(agent => agent.roles.includes(role))];
};

// Edition Year
// Note:  This link currently goes to the Work Detail page.
// It should link to the Edition Detail page when it is implemented.
export const editionYearElem = (previewEdition, workUuid) => {
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
      {!workUuid && <span>{editionDisplay}</span>}
    </span>
  );
};

function getFirstAndCountMore(array) {
  let moreText;
  if (array.length <= 1) { moreText = ''; } else { moreText = ` + ${array.length - 1} more`; }
  return `${array[0]}${moreText}`;
}

const htmlEntities = new Html5Entities();


// Title
export const generateTitleLinkElem = (title, uuid) => {
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
};

// Subtitle
export const getSubtitleText = subtitle => (subtitle && subtitle.length > MAX_SUBTITILE_LENGTH
  ? `${subtitle.substring(0, MAX_SUBTITILE_LENGTH)}...` : subtitle);

// Author
const getAuthorIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';

const getLinkToAuthorSearch = author => ({
  queries: JSON.stringify([{ query: author[getAuthorIdentifier(author)], field: getAuthorIdentifier(author) }]),
  showQuery: `"${author.name}"`,
  showField: 'author',
});


export const getAuthorsList = (agents) => {
  if (!agents || !agents.length) return null;
  return agents.map((authorAgent, idx) => {
    const authorLinkText = idx === agents.length - 1 ? authorAgent.name : `${authorAgent.name}, `;
    return (
      <Link
        to={{ pathname: '/search', query: getLinkToAuthorSearch(authorAgent) }}
        className="link"
      >
        {authorLinkText}
      </Link>
    );
  });
};

// Cover
export const getCover = (previewEdition) => {
  if (!previewEdition) return PLACEHOLDER_COVER_LINK;
  if (!previewEdition.covers || !previewEdition.covers.length) return PLACEHOLDER_COVER_LINK;

  const firstLocalCover = previewEdition.covers.find(cover => cover.flags.temporary === false);
  return firstLocalCover ? formatUrl(firstLocalCover.url) : PLACEHOLDER_COVER_LINK;
};

// Publisher Location and name
const publisherDisplayLocation = previewEdition => (
  previewEdition && previewEdition.publication_place
    ? `in ${previewEdition.publication_place}` : undefined);

const publisherDisplayText = (previewEdition) => {
  if (!previewEdition) return undefined;
  const preferredAgents = getPreferredAgent(previewEdition.agents, 'publisher');
  if (!preferredAgents) return undefined;
  const publisherNames = preferredAgents.map(pubAgent => pubAgent.name);
  const publisherText = ` by ${getFirstAndCountMore(publisherNames)}`;
  if (publisherText.length > MAX_PUBLISHER_NAME_LENGTH) {
    return `${publisherText.substring(0, MAX_PUBLISHER_NAME_LENGTH)} ...`;
  }
  return publisherText;
};

export const getPublisherAndLocation = previewEdition => (
  `Published ${publisherDisplayLocation(previewEdition)}${publisherDisplayText(previewEdition)}`
);

// Language Display
export const getLanguageDisplayText = (previewEdition) => {
  let languagesTextList;
  if (!previewEdition || !previewEdition.languages || !previewEdition.languages.length) {
    languagesTextList = 'Undetermined Language';
  } else {
    languagesTextList = previewEdition.languages.map((lang, idx) => (idx === previewEdition.languages.length - 1
      ? lang.language : `${lang.language}, `));
  }
  return `Written in ${languagesTextList}`;
};

// Rights
export const getLicense = editionItem => (editionItem && editionItem.rights && editionItem.rights.length
  ? `Under ${editionItem.rights[0].rights_statement} license` : 'Under Unknown License');

// Read Online and Download Urls

const generateStreamedReaderUrl = (url, eReaderUrl, referrer) => {
  const base64BookUrl = Buffer.from(formatUrl(url)).toString('base64');
  const encodedBookUrl = encodeURIComponent(`${base64BookUrl}`);

  let combined = `${eReaderUrl}/readerNYPL/?url=${eReaderUrl}/pub/${encodedBookUrl}/manifest.json`;
  if (referrer) {
    combined += `#${referrer}`;
  }

  return combined;
};

// TODO: Local links should not have headers

export const getReadOnlineLink = (origin, editionItem, eReaderUrl, referrer) => {
  if (!editionItem || !editionItem.links) return undefined;
  // TODO: Revert after links fix
  const selectedLink = editionItem.links.find(link => (!link.local && !link.download) || (link.local && link.download));
  if (!selectedLink || !selectedLink.url) return undefined;
  if (selectedLink.local) {
    const encodedUrl = generateStreamedReaderUrl(selectedLink.url, eReaderUrl, referrer);
    return `${origin}/read-online?url=${encodeURI(encodedUrl)}`;
  }
  return `${origin}/read-online?url=${formatUrl(selectedLink.url)}`;
};

export const getDownloadLink = (editionItem) => {
  if (!editionItem || !editionItem.links) return undefined;
  const selectedLink = editionItem.links.find(link => link.download);
  return selectedLink && selectedLink.url ? formatUrl(selectedLink.url) : undefined;
};


export default {
  getPreferredAgent,
  editionYearElem,
  generateTitleLinkElem,
  getSubtitleText,
  getAuthorsList,
  getCover,
  getPublisherAndLocation,
  getLanguageDisplayText,
  getLicense,
  getReadOnlineLink,
  getDownloadLink,
};
