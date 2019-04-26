import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';

/**
 * Present basic search metadata about the curren search or a "no results"
 * statement.
 * @param {object} props
 * @return {string}
 */
const ResultsMetadata = (props) => {
  let message = 'Your search yielded no results. Please try again.';
  const {
    searchQuery,
    metadata: { total },
  } = props;
  const firstElement = searchQuery.per_page * searchQuery.page || 1;
  let lastElement = searchQuery.per_page * (searchQuery.page + 1) || 10;
  if (lastElement < total) {
    lastElement = total;
  }
  if (total > 0) {
    message = `Viewing ${firstElement} - ${lastElement} of ${total} items`;
  }

  return (
    <div
      className="nypl-results-summary"
      aria-live="assertive"
      aria-atomic="true"
      role="presentation"
    >
      {message}
    </div>
  );
};

ResultsMetadata.propTypes = {
  metadata: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
};

ResultsMetadata.defaultProps = {
  metadata: {},
  searchQuery: initialSearchQuery,
};

export default ResultsMetadata;
