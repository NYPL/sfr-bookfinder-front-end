import React from 'react';

const ResultsMetadata = (props) => {
  let message = 'Your search yielded no results. Please try again.';

  if (props.metadata.total > 0) {
    message = `Displaying 1 - ${props.metadata.total < 10 ? props.metadata.total : 10} of ${props.metadata.total} ; Relevancy score: ${props.metadata.max_score}`;
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

export default ResultsMetadata;
