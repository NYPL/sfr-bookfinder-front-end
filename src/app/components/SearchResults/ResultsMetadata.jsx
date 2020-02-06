import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getNumberOfPages } from '../../util/Util';

/**
 * Present basic search metadata about the current search or a "no results"
 * statement.
 * @param {object} props
 * @return {string}
 */
const ResultsMetadata = ({ searchQuery, totalItems }) => {
  let message = 'Viewing 0 items';
  const totalPages = getNumberOfPages(totalItems, searchQuery.per_page);
  const firstElement = (Number(searchQuery.per_page || 10) * Number(searchQuery.page || 0) || 0) + 1;
  let lastElement = Number(searchQuery.per_page || 10) * (Number(searchQuery.page || 0) + 1) || 10;
  if (searchQuery.page >= totalPages - 1 && lastElement > totalItems) {
    lastElement = totalItems;
  }
  if (totalItems > 0) {
    message = `Viewing ${firstElement.toLocaleString()} - ${lastElement.toLocaleString()} of ${totalItems.toLocaleString()} items`;
  }

  return (
    <span>
      {message}
    </span>
  );
};

ResultsMetadata.propTypes = {
  totalItems: PropTypes.number,
  searchQuery: searchQueryPropTypes,
};

ResultsMetadata.defaultProps = {
  totalItems: 0,
  searchQuery: initialSearchQuery,
};

export default ResultsMetadata;
