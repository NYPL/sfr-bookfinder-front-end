/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'underscore';
import ResultsListItem from './ResultsListItem';
import EmptySearchSvg from '../Svgs/EmptySearchSvg';

/**
 * ResultsList presents search results as a "grouped" list of books
 * with their associated editions provided by the EditionsList component.
 * Each result displays a title and author element linked to its companion
 * detailed view.
 *
 * @returns {string|null}
 */
class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    if (_isEmpty(this.props.results)) {
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
      <div className="nypl-results">
        <ul className="nypl-results-list">
          {this.props.results.map(result => (
            <ResultsListItem
              eReaderUrl={this.props.eReaderUrl}
              item={result._source}
              fetchWork={this.props.fetchWork}
              key={result._source.uuid}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ResultsList.propTypes = {
  eReaderUrl: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.any),
  fetchWork: PropTypes.func,
};

ResultsList.defaultProps = {
  eReaderUrl: '',
  results: [],
  fetchWork: () => {},
};

ResultsList.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
};

export default ResultsList;
