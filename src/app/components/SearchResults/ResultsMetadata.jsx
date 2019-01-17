import React from 'react';

const ResultsMetadata = (metadata) => {
  let message = 'Your search yielded no results. Please try again.';

  if (metadata.metadata.total > 0) {
    message = `Displaying 1 - ${metadata.metadata.total < 10 ? metadata.metadata.total : 10} of ${metadata.metadata.total} ; Relevancy score: ${metadata.metadata.max_score}`;
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
