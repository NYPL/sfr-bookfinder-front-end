/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';
import { Html5Entities } from 'html-entities';

import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EmptySearchSvg from '../Svgs/EmptySearchSvg';
import { isEmpty, formatUrl } from '../../util/Util';

// Constants
const MAX_TITLE_LENGTH = 80;
const MAX_SUBTITILE_LENGTH = 80;
const MAX_PUBLISHER_NAME_LENGTH = 80;

// Data Transformation Utilities

function getFirstAndCountMore(array) {
  let moreText;
  if (array.length <= 1) { moreText = ''; } else { moreText = ` + ${array.length - 1} more`; }
  return `${array[0]}${moreText}`;
}

const htmlEntities = new Html5Entities();

const getPreferredAgent = (agents, role) => {
  if (!agents) return undefined;

  const viafAgents = agents.filter(agent => agent.viaf !== null);
  if (viafAgents && viafAgents.length) {
    return viafAgents.filter(agent => agent.role === role);
  }
  return [agents.find(agent => agent.role === role)];
};
// Title
const generateTitleLinkElem = (title, uuid) => {
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
      to={{ pathname: '/work', query: { workId: `${uuid}`, recordType: 'instances' } }}
      title={htmlEntities.decode(title)}
      className="link link--no-underline"
    >
      {displayTitle}
    </Link>
  );
};

// Author
const getAuthorIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';

const getLinkToAuthorSearch = author => ({
  queries: JSON.stringify([{ query: author[getAuthorIdentifier(author)], field: getAuthorIdentifier(author) }]),
  showQuery: `"${author.name}"`,
  showField: 'author',
});

const generateAuthorLinkElem = (authorAgents) => {
  if (!authorAgents || !authorAgents.length) return undefined;
  return authorAgents.map((authorAgent, idx) => {
    const authorLinkText = idx === authorAgents.length - 1 ? authorAgent.name : `${authorAgent.name}, `;
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

// Edition Year
// Note:  This link currently goes to the Work Detail page.
// It should link to the Edition Detail page when it is implemented.
const editionYearElem = (previewEdition, workUuid) => {
  const editionDisplay = previewEdition.publication_date
    ? `${previewEdition.publication_date} Edition` : 'Edition Year Unkown';
  return (
    <Link
      to={{ pathname: '/work', query: { workId: `${workUuid}` } }}
      className="heading__link"
    >
      {editionDisplay}
    </Link>
  );
};

// Cover
const getCover = (previewEdition) => {
  if (!previewEdition.covers || !previewEdition.covers.length) return '#placeholder-cover';

  const firstLocalCover = previewEdition.covers.find(cover => cover.flags.temporary === false);
  return firstLocalCover ? firstLocalCover.url : 'https://test-sfr-covers.s3.amazonaws.com/default/defaultCover.svg';
};

// Publisher Location and name
const publisherDisplayLocation = previewEdition => (
  previewEdition.publication_place
    ? `in ${previewEdition.publication_place}` : undefined);
const publisherDisplayText = (previewEdition) => {
  const preferredAgent = getPreferredAgent(previewEdition.agents, 'publisher');
  if (!preferredAgent) return undefined;
  const publisherNames = preferredAgent.map(pubAgent => pubAgent.name);
  const publisherText = ` by ${getFirstAndCountMore(publisherNames)}`;
  if (publisherText.length > MAX_PUBLISHER_NAME_LENGTH) {
    return `${publisherText.substring(0, MAX_PUBLISHER_NAME_LENGTH)} ...`;
  }
  return publisherText;
};

// Language Display
const getLanguageDisplayText = (previewEdition) => {
  let languagesTextList;
  if (!previewEdition.languages || !previewEdition.languages.length) {
    languagesTextList = 'Undetermined Language';
  } else {
    languagesTextList = previewEdition.languages.map((lang, idx) => (idx === previewEdition.languages.length - 1
      ? lang.language : `${lang.language}, `));
  }
  return `Written in ${languagesTextList}`;
};

// Rights
const getLicense = editionItem => (editionItem && editionItem.rights && editionItem.rights[0]
  ? `Under ${editionItem.rights[0].rights_statement} license` : 'Under Unknown License');

// Read Online and Download Urls
const generateStreamedReaderUrl = (url, eReaderUrl, referrer) => {
  const base64BookUrl = Buffer.from(formatUrl(url)).toString('base64');
  const encodedBookUrl = encodeURIComponent(`${base64BookUrl}`);
  const encodedReaderUrl = encodeURI(eReaderUrl);

  let combined = `${eReaderUrl}/readerNYPL/?url=${encodedReaderUrl}/pub/${encodedBookUrl}/manifest.json`;
  if (referrer) {
    combined += `#${referrer}`;
  }
  return combined;
};

// TODO: Local links should not have headers
const getReadOnlineLink = (origin, editionItem, eReaderUrl, referrer) => {
  const selectedLink = editionItem.links.find(link => !link.download);
  if (!selectedLink || !selectedLink.url) return undefined;
  if (selectedLink.local) {
    const encodedUrl = generateStreamedReaderUrl(selectedLink.url, eReaderUrl, referrer);
    return `${origin}/read-online?url=${encodeURI(encodedUrl)}`;
  }
  return `${origin}/read-online?url=${formatUrl(selectedLink.url)}`;
};
const getDownloadLink = (editionItem) => {
  const selectedLink = editionItem.links.find(link => link.download);
  return selectedLink && selectedLink.url ? formatUrl(selectedLink.url) : undefined;
};

const formatAllResultsData = (results, origin, eReaderUrl, referrer) => results.map((result, index) => {
  const titleElement = generateTitleLinkElem(result.title, result.uuid);
  const authorLinkElement = generateAuthorLinkElem(getPreferredAgent(result.agents, 'author'));
  // TODO: Editions Link Page
  const allEditionsLink = (
    <Link
      className="link"
      to={{ pathname: '/work', query: { workId: `${result.uuid}` }, hash: '#all-editions' }}
    >
      {`View All ${result.edition_count} editions`}
    </Link>
  );

  const previewEdition = result.editions[0];
  const editionYearHeadingElement = editionYearElem(previewEdition, result.uuid);

  const editionItem = previewEdition.items ? previewEdition.items[0] : undefined;

  return {
    id: `search-result-${result.uuid}`,
    resultIndex: { index },
    titleElement,
    subtitle: result.subtitle,
    authorElement: authorLinkElement,
    editionInfo: {
      editionYearHeading: editionYearHeadingElement,
      publisherAndLocation: `Published ${publisherDisplayLocation(previewEdition)}${publisherDisplayText(previewEdition)}`,
      coverUrl: getCover(previewEdition),
      language: getLanguageDisplayText(previewEdition),
      license: getLicense(editionItem),
      readOnlineLink: getReadOnlineLink(origin, editionItem, eReaderUrl, referrer),
      downloadLink: getDownloadLink(editionItem),
    },
    editionsLinkElement: allEditionsLink,
  };
});
/**
 * ResultsList takes the response and calls Design System's SearchResultsList
 * with the correctly formatted properties
 *
 * @returns {string|null}
 */
class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    const { eReaderUrl, results } = this.props;
    const referrer = this.context.router ? this.context.router.location.pathname + this.context.router.location.search : undefined;
    const origin = this.state.loaded ? window.location.origin : '';
    if (isEmpty(this.props.results)) {
      return (
        <div className="grid-row margin-3">
          <EmptySearchSvg className="grid-col-1" />
          <div className="grid-col-9 margin-x-3 margin-y-2">
            <span>No results were found. Please try a different keyword or fewer filters.</span>
          </div>
        </div>
      );
    }

    return (
      <DS.SearchResultsList searchResults={formatAllResultsData(results, origin, eReaderUrl, referrer)}></DS.SearchResultsList>
    );
  }
}

ResultsList.propTypes = {
  eReaderUrl: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.any),
};

ResultsList.defaultProps = {
  eReaderUrl: '',
  results: [],
};

ResultsList.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
};

export default ResultsList;
