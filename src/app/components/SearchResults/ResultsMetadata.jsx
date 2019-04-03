import React from 'react';
import PropTypes from 'prop-types';

/**
 * Present basic search metadata about the curren search or a "no results"
 * statement.
 * @param {object} props
 * @return {string}
 */
const ResultsMetadata = (props) => {
  let message = 'Your search yielded no results. Please try again.';

  if (props.metadata.total > 0) {
    message = `Viewing 1 - ${props.metadata.total < 10 ? props.metadata.total : 10} of ${
      props.metadata.total
    } items`;
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
};

ResultsMetadata.defaultProps = {
  metadata: {},
};

export default ResultsMetadata;
