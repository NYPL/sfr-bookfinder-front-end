import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import ResultsList from './ResultsList';
import Filters from './Filters';
import FiltersMobile from './FiltersMobile';
import { sortMap, numbersPerPage } from '../../constants/sorts';
import { getQueryString } from '../../search/query';
import SearchPagination from './SearchPagination';
import { getNumberOfPages, deepEqual } from '../../util/Util';
import { searchQueryPropTypes, initialSearchQuery } from '../../stores/InitialState';
// redirect to url with query params
export const submit = (query, router) => {
  const path = `/search?${getQueryString(query)}`;
  router.push(path);
};

/**
 * Wrapper component for results lists which can contain a number of components
 * including search results, pagination, sorting/filtering components, etc.
 * @param {object} props
 * @return {string|null}
 */
const SearchResults = (props) => {
  const numberOfWorks = props.results && props.results.data && props.results.data.totalWorks;
  const data = props.results.data;
  const {
    searchQuery, userQuery, router,
  } = props;
  const [open, setOpen] = useState(false);
  if (!data) {
    return null;
  }

  const onChangePerPage = (e) => {
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.per_page) {
      const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: newPerPage, total: numberOfWorks || 0 });
      userQuery(newQuery);
      submit(newQuery, router);
    }
  };

  // click and navigate with different sort
  const onChangeSort = (e) => {
    if (e.target.value !== Object.keys(sortMap).find(key => sortMap[key] === searchQuery.sort)) {
      const newQuery = Object.assign({}, searchQuery, { sort: sortMap[e.target.value], page: 0 });
      userQuery(newQuery);
      submit(newQuery, router);
    }
  };

  const onToggleMenu = () => {
    setOpen(!open);
  };

  let message = 'Viewing 0 items';
  let mobileMessage = '0 items';
  const totalPages = getNumberOfPages(numberOfWorks, searchQuery.per_page);
  const firstElement = (Number(searchQuery.per_page || 10) * Number(searchQuery.page || 0) || 0) + 1;
  let lastElement = Number(searchQuery.per_page || 10) * (Number(searchQuery.page || 0) + 1) || 10;
  if (searchQuery.page >= totalPages - 1 && lastElement > numberOfWorks) {
    lastElement = numberOfWorks;
  }
  if (numberOfWorks > 0) {
    message = `Viewing ${firstElement.toLocaleString()} - ${lastElement.toLocaleString()} of ${numberOfWorks.toLocaleString()} items`;
    mobileMessage = (
      <>
        {numberOfWorks.toLocaleString()}
        {' '}
        items
        <DS.Button
          id="filter-button"
          type="link"
          callback={onToggleMenu}
        >
      Refine
        </DS.Button>

      </>
    );
  }


  return (
    <div className="margin-top-3">
      <DS.Heading
        level={2}
        id="page-title-heading"
        blockName="page-title"
      >
        <>
          <span className="desktop-only">{message}</span>
          <span className="mobile-only">{mobileMessage}</span>
        </>
      </DS.Heading>
      <div className="search-dropdowns">
        <DS.Dropdown
          dropdownId="items-per-page-select"
          isRequired={false}
          labelPosition="left"
          labelText="Items Per Page"
          labelId="nav-items-per-page"
          selectedOption={searchQuery.per_page ? searchQuery.per_page : undefined}
          dropdownOptions={numbersPerPage.map(number => number.toString())}
          onSelectChange={onChangePerPage}
          onSelectBlur={onChangePerPage}
        />
        <DS.Dropdown
          dropdownId="sort-by-select"
          isRequired={false}
          labelPosition="left"
          labelText="Sort By"
          labelId="nav-sort-by"
          selectedOption={searchQuery.sort ? Object.keys(sortMap).find(key => deepEqual(sortMap[key], searchQuery.sort)) : undefined}
          dropdownOptions={Object.keys(sortMap).map(sortOption => sortOption)}
          onSelectChange={onChangeSort}
          onSelectBlur={onChangeSort}
        />
      </div>
      <div className="grid-row sfr-results-container">
        <div className="desktop-filter grid-col-3 nypl-results-column">
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
          searchQuery={props.searchQuery}
          userQuery={props.userQuery}
          router={props.router}
          {...props}
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
  userQuery: () => {},
  router: {},
};

export default SearchResults;
