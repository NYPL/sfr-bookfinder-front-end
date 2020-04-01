import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import { sortMap, numbersPerPage } from '../../constants/sorts';
import { deepEqual } from '../../util/Util';
import ResultsMetadata from './ResultsMetadata';
// redirect to url with query params
export const submit = (query, router) => {
  const path = `/search?${getQueryString(query)}`;
  router.push(path);
};


const SearchNavigation = ({
  totalItems, searchQuery, userQuery, router,
}) => {
  // update per_page in store when select of per_page changes
  const onChangePerPage = (e) => {
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.per_page) {
      const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: newPerPage, total: totalItems || 0 });
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

  return (
    <div className="search-navigation grid-row">
      <DS.Heading
        level={2}
        id="page-title-heading"
        blockName="page-title"
      >
        <ResultsMetadata
          totalItems={totalItems}
          searchQuery={searchQuery}
        />

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
    </div>
  );
};

SearchNavigation.propTypes = {
  totalItems: PropTypes.number,
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

SearchNavigation.defaultProps = {
  totalItems: 0,
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default SearchNavigation;
