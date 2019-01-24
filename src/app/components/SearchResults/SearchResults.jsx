import React from 'react';
import PropTypes from 'prop-types';
import ResultsMetadata from './ResultsMetadata';
import ResultsList from './ResultsList';

const SearchResults = (props) => {
  const metadata = props.results && props.results.data && props.results.data.hits;
  const hits = props.results && props.results.data && props.results.data.hits && props.results.data.hits.hits;

  if (!hits) {
    return null;
  }

  return (
    <div className="nypl-row">
      <div className="nypl-column-full">
        <ResultsMetadata metadata={metadata} />
        <ResultsList results={hits} fetchWork={props.fetchWork} />
      </div>
    </div>
  );
};

SearchResults.contextType = {
  router: PropTypes.object,
};

export default SearchResults;
