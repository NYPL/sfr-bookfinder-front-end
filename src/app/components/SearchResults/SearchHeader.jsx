import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Form/Select';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';

const SearchHeader = ({
  metadata, searchQuery, userQuery, router,
}) => {
  // page for query is -1 page shown
  const totalPages = Math.floor((Number(metadata.total) - 1) / Number(searchQuery.per_page || 10)) + 1;
  // return list of pages till total pages
  const pageList = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageList.push(i);
  }

  // redirect to url with query params
  const submit = (query) => {
    const path = `/search?${getQueryString(query)}`;
    router.push(path);
  };

  // update page in store and go to any page
  const goToPage = (pageNumber) => {
    const newPage = Number(pageNumber) - 1;
    const perPage = searchQuery.per_page;
    const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: perPage, total: metadata.total });
    userQuery(newQuery);
    submit(newQuery);
  };

  // click and navigate to any page
  const navigateToPage = (e, pageNumber) => {
    e.preventDefault();
    e.stopPropagation();
    let page = pageNumber;
    if (page < 1) {
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
      const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: newPerPage, total: metadata.total });
      userQuery(newQuery);
      submit(newQuery);
    }
  };

  return (
    <form className="usa-form grid-container padding-0 search-header">
      <div className="grid-row">
        <div className="grid-col">Items per page</div>
        <div className="grid-col">Sort By</div>
        <div className="grid-col">&nbsp;</div>
        <div className="grid-col">Page</div>
        <div className="grid-col">&nbsp;</div>
      </div>
      <div className="grid-row">
        <Select
          id="items-by-page"
          selectClass="sfr-select-input usa-select"
          className="grid-col nypl-search-input"
          options={[10, 20, 50, 100]}
          label=""
          labelClass="usa-label"
          value={searchQuery.per_page}
          onChange={onChangePerPage}
          onBlur={onChangePerPage}
        />
        <Select
          id="sort-by"
          selectClass="sfr-select-input usa-select"
          className="grid-col nypl-search-input"
          options={['Relevance', 'Alphabetically']}
          label=""
          labelClass="usa-label"
        />
        <div className="grid-col sfr-header-border text-right">
          <a
            onClick={e => navigateToPage(e, 1)}
            onKeyPress={e => navigateToPage(e, 1)}
            role="link"
            tabIndex={0}
            className="margin-x-2"
          >
            First
          </a>
          <a
            onClick={e => navigateToPage(e, Number(searchQuery.page))}
            onKeyPress={e => navigateToPage(e, Number(searchQuery.page))}
            role="link"
            tabIndex={0}
            className="margin-x-2"
          >
            Previous
          </a>
        </div>
        <Select
          id="page-select"
          selectClass="sfr-select-input usa-select"
          className="grid-col nypl-search-input"
          options={pageList}
          label=""
          labelClass="usa-label"
          value={Number(searchQuery.page) + 1}
          onChange={onChangePage}
          onBlur={onChangePage}
        />

        <div className="grid-col sfr-header-border text-left">
          <a
            onClick={e => navigateToPage(e, Number(searchQuery.page) + 2)}
            onKeyPress={e => navigateToPage(e, Number(searchQuery.page) + 2)}
            role="link"
            tabIndex={0}
            className="margin-x-2"
          >
            Next
          </a>
          <a
            onClick={e => navigateToPage(e, totalPages)}
            onKeyPress={e => navigateToPage(e, totalPages)}
            role="link"
            tabIndex={0}
            className="margin-x-2"
          >
            Last
          </a>
        </div>
      </div>
    </form>
  );
};

SearchHeader.propTypes = {
  metadata: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

SearchHeader.defaultProps = {
  metadata: {},
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default SearchHeader;
