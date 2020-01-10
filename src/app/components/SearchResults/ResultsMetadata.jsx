import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';

/**
 * Present basic search metadata about the curren search or a "no results"
 * statement.
 * @param {object} props
 * @return {string}
 */
const ResultsMetadata = ({ searchQuery, metadata }) => {
  console.log('total', metadata);
  const total = metadata;
  let message = 'Viewing 0 items';
  const totalPages = Math.floor(total / (Number(searchQuery.per_page) || 10)) + 1;
  const firstElement = (Number(searchQuery.per_page || 10) * Number(searchQuery.page || 0) || 0) + 1;
  let lastElement = Number(searchQuery.per_page || 10) * (Number(searchQuery.page || 0) + 1) || 10;
  if (searchQuery.page >= totalPages - 1 && lastElement > total) {
    lastElement = total;
  }
  if (total > 0) {
    message = `Viewing ${firstElement.toLocaleString()} - ${lastElement.toLocaleString()} of ${total.toLocaleString()} items`;
  }

  return (
    <span>
      {message}
    </span>
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
