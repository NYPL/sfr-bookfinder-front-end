import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
// import Select from '../Form/Select';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import { sortMap, numbersPerPage } from '../../constants/sorts';
import { deepEqual } from '../../util/Util';
import ResultsMetadata from './ResultsMetadata';

const SearchNavigation = ({
  totalItems, searchQuery, userQuery, router,
}) => {
  // page for query is -1 page shown
  const totalPages = Math.floor((Number(totalItems || 0) - 1) / Number(searchQuery.per_page || 10)) + 1 || 1;
  // return list of pages till total pages
  const pageList = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageList.push({ value: i, label: `${i.toLocaleString()} of ${totalPages.toLocaleString()}` });
  }

  // redirect to url with query params
  const submit = (query) => {
    const path = `/search?${getQueryString(query)}`;
    router.push(path);
  };

  // update per_page in store when select of per_ppage changes
  const onChangePerPage = (e) => {
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.per_page) {
      const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: newPerPage, total: totalItems || 0 });
      userQuery(newQuery);
      submit(newQuery);
    }
  };

  // click and navigate with different sort
  const onChangeSort = (e) => {
    if (e.target.value !== Object.keys(sortMap).find(key => sortMap[key] === searchQuery.sort)) {
      const newQuery = Object.assign({}, searchQuery, { sort: sortMap[e.target.value], page: 0 });
      userQuery(newQuery);
      submit(newQuery);
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
      <div className="grid-row-right">
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
