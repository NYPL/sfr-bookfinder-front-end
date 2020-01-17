/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EmptySearchSvg from '../Svgs/EmptySearchSvg';
import { isEmpty } from '../../util/Util';
import {
  editionYearElem, getCover, getLanguageDisplayText, getLicense, getReadOnlineLink, getDownloadLink,
  getPublisherAndLocation, generateTitleLinkElem, getSubtitleText, getAuthorsList, getPreferredAgent,
} from '../Card/EditionCard';

const formatAllResultsData = (results, origin, eReaderUrl, referrer) => results.map((result, index) => {
  const titleElement = generateTitleLinkElem(result.title, result.uuid);
  const authorLinkElement = getAuthorsList(getPreferredAgent(result.agents, 'author'));
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

  const editionItem = previewEdition && previewEdition.items ? previewEdition.items[0] : undefined;

  return {
    id: `search-result-${result.uuid}`,
    resultIndex: { index },
    titleElement,
    subtitle: getSubtitleText(result.subtitle),
    authorElement: authorLinkElement,
    editionInfo: {
      editionYearHeading: editionYearHeadingElement,
      publisherAndLocation: getPublisherAndLocation(previewEdition),
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
