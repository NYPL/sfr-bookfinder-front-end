import React from 'react';
import PropTypes from 'prop-types';
import ResultsMetadata from './ResultsMetadata';
import ResultsList from './ResultsList';
import SearchNavigation from './SearchNavigation';
import Filters from './Filters';
/**
 * Wrapper component for results lists which can contain a number of components
 * including search results, pagination, sorting/filtering components, etc.
 * @param {object} props
 * @return {string|null}
 */
const SearchResults = (props) => {
  const metadata = props.results && props.results.data && props.results.data.hits;
  const hits = props.results && props.results.data && props.results.data.hits && props.results.data.hits.hits;
  if (!hits) {
    return null;
  }

  return (
    <div className="margin-top-3">
      <div className="grid-row sfr-results-container">
        <div className="grid-col-3 nypl-results-column">
          <ResultsMetadata
            metadata={metadata}
            {...props}
          />
        </div>
        <div className="grid-col-9 sfr-results-search-header">
          <SearchNavigation
            metadata={metadata}
            results={hits}
            fetchWork={props.fetchWork}
            {...props}
          />
        </div>
      </div>
      <div className="grid-row sfr-results-container">
        <div className="grid-col-3 nypl-results-column">
          <Filters
            data={props.results.data}
            {...props}
          />
        </div>
        <div className="grid-col-9 nypl-results-main">
          <ResultsList
            results={hits}
            fetchWork={props.fetchWork}
            eReaderUrl={props.eReaderUrl}
          />
        </div>
      </div>
      <div className="grid-row sfr-results-container">
        <div className="grid-col-12 sfr-results-search-footer">
          <SearchNavigation
            metadata={metadata}
            results={hits}
            fetchWork={props.fetchWork}
            {...props}
            isFooter
          />
        </div>
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
