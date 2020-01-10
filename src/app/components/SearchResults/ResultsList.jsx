/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';
import { Html5Entities } from 'html-entities';


import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { title } from 'change-case';
import ResultsListItem from './ResultsListItem';
import EmptySearchSvg from '../Svgs/EmptySearchSvg';
import { isEmpty, formatUrl } from '../../util/Util';

// Data Transformation Utilities

function getFirstAndCountMore(array) {
  let moreText;
  if (array.length <= 1) { moreText = ''; } else { moreText = ` + ${array.length - 1} more`; }
  return `${array[0]}${moreText}`;
}

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

const generateReadOnlineUrl = (url, local, eReaderUrl, referrer) => {
  // Local refers to whether or not we're hosting it ourselves.
  // If we host it ourselves, use the NYPL E-Reader.
  if (local) {
    const encodedUrl = generateStreamedReaderUrl(url, eReaderUrl, referrer);
    return `${window.location.origin}/read-online?url=${encodeURI(encodedUrl)}`;
  }
  return `${window.location.origin}/read-online?url=${formatUrl(url)}`;
};

const generateDownloadUrl = url => formatUrl(url);

const htmlEntities = new Html5Entities();

/**
 * ResultsList takes the response and calls Design System's SearchResultsList
 * with the correctly formatted properties
 *
 * @returns {string|null}
 */
class ResultsList extends React.Component {
  constructor(props) {
    console.log('resultsList props ', props);

    super(props);
    this.props = props;
  }

  render() {
    const eReaderUrl = this.props.eReaderUrl;
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
    const referrer = this.context.router ? this.context.router.location.pathname + this.context.router.location.search : undefined;
    const getIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';

    const linkToAuthor = author => ({
      queries: JSON.stringify([{ query: author[getIdentifier(author)], field: getIdentifier(author) }]),
      showQuery: `"${author.name}"`,
      showField: 'author',
    });
    const results = this.props.results.map((result, index) => {
      const titleContent = (
        <Link
          to={{ pathname: '/work', query: { workId: `${result.uuid}` } }}
          title={htmlEntities.decode(result.title)}
          className="link link--no-underline"
        >
          {result.title}
        </Link>
      );

      const authorAgents = result.agents ? result.agents.filter(agent => agent.viaf !== null && agent.role === 'author') : [];
      const authorLinkElement = authorAgents.map(authorAgent => (
        <Link
          to={{ pathname: '/search', query: linkToAuthor(authorAgent) }}
          className="link"
        >
          {authorAgent.name}
        </Link>
      ));
      const allEditionsLink = (
        <Link
          className="link"
          to={{ pathname: '/work', query: { workId: `${result.uuid}` }, hash: '#all-editions' }}
        >
          {`View All ${result.edition_count} editions`}
        </Link>
      );

      const previewEdition = result.editions[0];
      const editionYearHeadingElement = (
        <Link
          to={{ pathname: '/work', query: { workId: `${result.uuid}` }, hash: '#all-editions' }}
          className="heading__link"
        >
          {previewEdition.publication_date ? `${previewEdition.publication_date} Edition` : 'Edition Year Unkown'}
        </Link>
      );

      const publisherAgents = previewEdition.agents ? previewEdition.agents.filter(agent => agent.viaf !== null && agent.role === 'publisher') : [];
      const publishLocation = previewEdition.publication_place ? `in ${previewEdition.publication_place}` : undefined;
      const publisherNames = publisherAgents.map(pubAgent => pubAgent.name);
      const publisher = publisherNames ? ` by ${getFirstAndCountMore(publisherAgents.map(pubAgent => pubAgent.name))}` : undefined;
      const language = previewEdition.languages ? `Written in ${previewEdition.languages.map(lang => lang.language)}` : undefined;

      const editionItem = previewEdition.items ? previewEdition.items[0] : undefined;
      const license = editionItem && editionItem.rights && editionItem.rights[0] ? `Under ${editionItem.rights[0].rights_statement} license` : 'Under Unknown License';
      const readOnlineLink = editionItem.links.find(link => !link.download);
      const downloadLink = editionItem.links.find(link => link.download);

      console.log('readOnlineLink', readOnlineLink);
      // TODO: Use stored covers
      const coverUrl = previewEdition.covers ? previewEdition.covers[0].url : '#placeholder-cover';
      return {
        id: `search-result-${result.uuid}`,
        resultIndex: { index },
        titleElement: titleContent,
        subtitle: result.subtitle,
        authorElement: authorLinkElement,
        editionInfo: {
          editionYearHeading: editionYearHeadingElement,
          publisherAndLocation: `Published ${publishLocation}${publisher}`,
          coverUrl,
          language,
          license,
          readOnlineLink: readOnlineLink ? generateReadOnlineUrl(readOnlineLink.url, readOnlineLink.local, eReaderUrl, referrer) : undefined,
          downloadLink: downloadLink ? generateDownloadUrl(downloadLink.url) : undefined,
        },
        editionsLinkElement: allEditionsLink,
      };
    });
    return (
      <DS.SearchResultsList searchResults={results}></DS.SearchResultsList>
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
