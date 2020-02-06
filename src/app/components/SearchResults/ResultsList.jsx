/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import EmptySearchSvg from '../Svgs/EmptySearchSvg';
import { isEmpty, joinArrayOfElements } from '../../util/Util';
import EditionCard from '../Card/EditionCard';

export const getEditionsLinkElement = result => (result.edition_count > 1 ? (
  <Link
    className="link"
    to={{ pathname: '/work', query: { workId: `${result.uuid}` }, hash: '#all-editions' }}
  >
    {`View All ${result.edition_count} Editions`}
  </Link>
) : undefined);

export const formatAllResultsData = (results, origin, eReaderUrl, referrer) => results.map((result, index) => {
  const titleElement = EditionCard.generateTitleLinkElem(result.title, result.uuid);
  const authorLinkElement = EditionCard.getAuthorsList(EditionCard.getPreferredAgent(result.agents, 'author'));
  // TODO: Editions Link Page
  const allEditionsLink = getEditionsLinkElement(result);

  const previewEdition = result.editions && result.editions[0];
  const editionYearHeadingElement = EditionCard.editionYearElem(previewEdition, result.uuid);

  const editionItem = previewEdition && previewEdition.items ? previewEdition.items[0] : undefined;

  return {
    id: `search-result-${result.uuid}`,
    resultIndex: index,
    titleElement,
    subtitle: EditionCard.getSubtitleText(result.sub_title),
    authorElement: authorLinkElement ? joinArrayOfElements(authorLinkElement, ', ') : undefined,
    editionInfo: EditionCard.getEditionData(previewEdition, origin, eReaderUrl, referrer),
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
