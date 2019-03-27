import React from 'react';
import PropTypes from 'prop-types';
import ResultsMetadata from './ResultsMetadata';
import ResultsList from './ResultsList';

/**
 * Wrapper component for results lists which can contain a number of components
 * including search results, pagination, sorting/filtering components, etc.
 * @param {object} props
 * @return {string|null}
 */
const SearchResults = (props) => {
  const metadata = props.results && props.results.data && props.results.data.hits;
  const hits = props.results && props.results.data &&
    props.results.data.hits && props.results.data.hits.hits;

  if (!hits) {
    return null;
  }

  return (
    <div className="nypl-row">
      <div className="nypl-column-full">
        <ResultsMetadata metadata={metadata} />
        <ResultsList results={hits} fetchWork={props.fetchWork} eReaderUrl={props.eReaderUrl} />
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  eReaderUrl: PropTypes.string,
  results: PropTypes.objectOf(PropTypes.any),
  fetchWork: PropTypes.func,
};

SearchResults.defaultProps = {
  eReaderUrl: '',
  results: [],
  fetchWork: () => {},
};

export default SearchResults;
