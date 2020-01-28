import React from 'react';
import PropTypes from 'prop-types';
import ResultsList from './ResultsList';
import SearchNavigation from './SearchNavigation';
import Filters from './Filters';
import SearchPagination from './SearchPagination';
import { searchQueryPropTypes, initialSearchQuery } from '../../stores/InitialState';

/**
 * Wrapper component for results lists which can contain a number of components
 * including search results, pagination, sorting/filtering components, etc.
 * @param {object} props
 * @return {string|null}
 */
const SearchResults = (props) => {
  const numberOfWorks = props.results && props.results.data && props.results.data.totalWorks;
  const data = props.results.data;
  if (!data) {
    return null;
  }
  return (
    <div className="margin-top-3">
      {/* <SearchNavigation
        totalItems={numberOfWorks}
        fetchWork={props.fetchWork}
        {...props}
      /> */}
      <div className="grid-row sfr-results-container">
        <div className="grid-col-3 nypl-results-column">
          <Filters
            data={props.results.data}
            searchQuery={props.searchQuery}
            userQuery={props.userQuery}
            router={props.router}
          />
        </div>
        <div className="grid-col-9 nypl-results-main">
          <ResultsList
            results={props.results.data.works}
            fetchWork={props.fetchWork}
            eReaderUrl={props.eReaderUrl}
          />
        </div>
      </div>
      <div className="grid-row">
        <SearchPagination
          totalItems={numberOfWorks}
          results={props.results.data.works}
          fetchWork={props.fetchWork}
          router={props.router}
        />
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  eReaderUrl: PropTypes.string,
  results: PropTypes.objectOf(PropTypes.any),
  fetchWork: PropTypes.func,
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

SearchResults.defaultProps = {
  eReaderUrl: '',
  results: {},
  fetchWork: () => {},
  searchQuery: initialSearchQuery,
  userQuery: () => { },
  router: {},
};

export default SearchResults;
