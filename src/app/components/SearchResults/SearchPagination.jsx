import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';

const SearchPagination = ({
  totalItems, searchQuery, userQuery, router,
}) => {
  // page for query is -1 page shown
  const totalPages = Math.floor((Number(totalItems || 0) - 1) / Number(searchQuery.per_page || 10)) + 1 || 1;
  // return list of pages till total pages
  const pageList = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageList.push(`${i.toLocaleString()} of ${totalPages.toLocaleString()}`);
  }
  // redirect to url with query params
  const submit = (query) => {
    const path = `/search?${getQueryString(query)}`;
    router.push(path);
  };

  // update page in store and go to any page
  const goToPage = (newPageNumber) => {
    const perPage = searchQuery.per_page || initialSearchQuery.per_page;
    if (Number(searchQuery.page) === newPageNumber) {
      return;
    }
    const newQuery = Object.assign({}, searchQuery, { page: newPageNumber, per_page: perPage, total: totalItems || 0 });
    userQuery(newQuery);
    submit(newQuery);
  };

  // click and navigate to any page number
  const navigateToPage = (e, pageNumber) => {
    e.preventDefault();
    e.stopPropagation();
    let page = pageNumber;
    if (!page || page < 0) {
      page = 0;
    }
    if (page >= totalPages) {
      page = totalPages - 1;
    }
    goToPage(page);
  };

  // update page in store when select of pages change
  const onChangePage = (e) => {
    const pageIndex = pageList.findIndex(pageValue => pageValue === e.target.value);
    goToPage(pageIndex);
  };

  return (
    <DS.Pagination
      paginationDropdownOptions={pageList}
      previousPageHandler={e => navigateToPage(e, Number(searchQuery.page) - 1)}
      nextPageHandler={e => navigateToPage(e, Number(searchQuery.page) + 1)}
      currentValue={pageList[Number(searchQuery.page)]}
      onSelectChange={onChangePage}
      onSelectBlur={onChangePage}
    />
  );
};

SearchPagination.propTypes = {
  totalItems: PropTypes.number,
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

SearchPagination.defaultProps = {
  totalItems: 0,
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default SearchPagination;
