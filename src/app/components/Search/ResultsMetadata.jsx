import React from 'react';

export const ResultsMetadata = (metadata) => {
  if (metadata.metadata.total === 0) {
    return (
      <div className="nypl-results-summary" aria-live="assertive" aria-atomic="true" role="presentation">
        Your search yielded no results. Please try again.
      </div>
    );
  }

  return (
    <div className="nypl-results-summary" aria-live="assertive" aria-atomic="true" role="presentation">
      Displaying 1 - {metadata.metadata.total < 10 ? metadata.metadata.total : 10} of {metadata.metadata.total} ; Relevancy score: {metadata.metadata.max_score}
    </div>
  );
};

export default ResultsMetadata;
