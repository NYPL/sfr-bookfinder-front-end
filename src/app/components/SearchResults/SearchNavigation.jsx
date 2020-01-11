import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import Select from '../Form/Select';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import { sortMap, numbersPerPage } from '../../constants/sorts';
import { deepEqual } from '../../util/Util';
import ResultsMetadata from './ResultsMetadata';

const SearchNavigation = ({
  totalItems, searchQuery, userQuery, router, isFooter,
}) => {
  console.log('searchNavigation totalItems', totalItems);
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

  // update page in store and go to any page
  const goToPage = (pageNumber) => {
    const newPage = Number(pageNumber) - 1;
    const perPage = searchQuery.per_page || initialSearchQuery.per_page;
    if (Number(searchQuery.page) === newPage) {
      return;
    }
    const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: perPage, total: metadata.total || 0 });
    userQuery(newQuery);
    submit(newQuery);
  };

  // click and navigate to any page number
  const navigateToPage = (e, pageNumber) => {
    e.preventDefault();
    e.stopPropagation();
    let page = pageNumber;
    if (!page || page < 1) {
      page = 1;
    }
    if (page > totalPages) {
      page = totalPages;
    }
    goToPage(page);
  };

  // update page in store when select of pages change
  const onChangePage = (e) => {
    goToPage(Number(e.target.value));
  };

  // update per_page in store when select of per_ppage changes
  const onChangePerPage = (e) => {
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.per_page) {
      const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: newPerPage, total: metadata.total || 0 });
      userQuery(newQuery);
      submit(newQuery);
    }
  };

  // click and navigate with different sort
  const onChangeSort = (e) => {
    if (sortMap[e.target.value] && !deepEqual(sortMap[e.target.value], searchQuery.sort)) {
      const newQuery = Object.assign({}, searchQuery, { sort: sortMap[e.target.value], page: 0 });
      userQuery(newQuery);
      submit(newQuery);
    }
  };

  // used to get the proper value in sort select from searchQuery
  const getValueFromSortObject = (sortObj = {}) => Object.keys(sortMap).find(
    sortMapping => sortMap[sortMapping]
        && sortObj[0]
        && sortMap[sortMapping][0]
        && sortMap[sortMapping][0].field === sortObj[0].field
        && sortMap[sortMapping][0].dir === sortObj[0].dir,
  );

  const ItemsPerPage = (
    <Select
      id="items-by-page"
      selectClass="sfr-select-input usa-select"
      className="nypl-search-input"
      options={numbersPerPage}
      label="Items per page"
      labelClass=""
      value={searchQuery.per_page || initialSearchQuery.per_page}
      onChange={onChangePerPage}
      onBlur={onChangePerPage}
    />
  );
  const SortBy = (
    <Select
      id="sort-by"
      selectClass="sfr-select-input usa-select"
      className="nypl-search-input"
      options={Object.keys(sortMap).map(sortOption => ({ value: sortOption, label: sortOption }))}
      label="Sort by"
      labelClass=""
      value={getValueFromSortObject(searchQuery.sort)}
      onChange={onChangeSort}
      onBlur={onChangeSort}
    />
  );
  const FirstPage = totalPages > 1 ? (
    <a
      onClick={e => navigateToPage(e, 1)}
      onKeyPress={e => navigateToPage(e, 1)}
      role="link"
      tabIndex={0}
      className="margin-x-2"
    >
        First
    </a>
  ) : (
    <div />
  );
  const PreviousPage = totalPages > 1 ? (
    <a
      onClick={e => navigateToPage(e, Number(searchQuery.page || 0))}
      onKeyPress={e => navigateToPage(e, Number(searchQuery.page || 0))}
      role="link"
      tabIndex={0}
      className="margin-x-2"
    >
        Previous
    </a>
  ) : (
    <div />
  );
  const PageSelector = (
    <Select
      id={isFooter ? 'page-select-footer' : 'page-select-header'}
      selectClass="sfr-select-input usa-select"
      className="nypl-search-input"
      options={pageList}
      label="Page"
      labelClass=""
      value={Number(searchQuery.page || 0) + 1}
      onChange={onChangePage}
      onBlur={onChangePage}
    />
  );
  const NextPage = totalPages > 1 ? (
    <a
      onClick={e => navigateToPage(e, Number(searchQuery.page || 0) + 2)}
      onKeyPress={e => navigateToPage(e, Number(searchQuery.page || 0) + 2)}
      role="link"
      tabIndex={0}
      className="margin-x-2"
    >
        Next
    </a>
  ) : (
    <div />
  );
  const LastPage = totalPages > 1 ? (
    <a
      onClick={e => navigateToPage(e, totalPages)}
      onKeyPress={e => navigateToPage(e, totalPages)}
      role="link"
      tabIndex={0}
      className="margin-x-2"
    >
        Last
    </a>
  ) : (
    <div />
  );


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
  isFooter: PropTypes.bool,
};

SearchNavigation.defaultProps = {
  totalItems: 0,
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
  isFooter: false,
};

export default SearchNavigation;
