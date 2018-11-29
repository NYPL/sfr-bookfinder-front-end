import React from 'react';

export const ResultsMetadata = (metadata) => {
  if (metadata.metadata.total === 0) {
    return (
      <div className="zero-results">
        Your search yielded no results. Please start over.
      </div>
    );
  }

  return (
    <div className="metadata">
      Works found: {metadata.metadata.total} ; Relevancy score: {metadata.metadata.max_score}
    </div>
  );
};

export default ResultsMetadata;
