/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Form/Select';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';

const SearchFooter = ({
  metadata, searchQuery, userQuery, router,
}) => {
  // page for query is -1 page shown
  const totalPages = Math.floor((Number(metadata.total) - 1) / Number(searchQuery.per_page || 10)) + 1 || 1;
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

  return (
    <form className="usa-form grid-container padding-0 search-header search-footer">
      <div className="grid-row">
        <div className="grid-col-7">
          <div className="sfr-header-border text-right" />
        </div>

        <div className="grid-col">
          <div className="sfr-header-border text-right">
            {totalPages > 1 && (
              <a
                onClick={e => navigateToPage(e, 1)}
                onKeyPress={e => navigateToPage(e, 1)}
                role="link"
                tabIndex={0}
                className="margin-x-2"
              >
                First
              </a>
            )}
            {totalPages > 1 && (
              <a
                onClick={e => navigateToPage(e, Number(searchQuery.page))}
                onKeyPress={e => navigateToPage(e, Number(searchQuery.page))}
                role="link"
                tabIndex={0}
                className="margin-x-2"
              >
                Previous
              </a>
            )}
          </div>
        </div>
        <div className="grid-col">
          <Select
            id="page-select"
            selectClass="sfr-select-input usa-select"
            className="nypl-search-input"
            options={pageList}
            label="Page"
            labelClass=""
            value={Number(searchQuery.page) + 1}
            onChange={onChangePage}
            onBlur={onChangePage}
          />
        </div>
        <div className="grid-col">
          <div className="sfr-header-border last text-left">
            {totalPages > 1 && (
              <a
                onClick={e => navigateToPage(e, Number(searchQuery.page) + 2)}
                onKeyPress={e => navigateToPage(e, Number(searchQuery.page) + 2)}
                role="link"
                tabIndex={0}
                className="margin-x-2"
              >
                Next
              </a>
            )}
            {totalPages > 1 && (
              <a
                onClick={e => navigateToPage(e, totalPages)}
                onKeyPress={e => navigateToPage(e, totalPages)}
                role="link"
                tabIndex={0}
                className="margin-x-2"
              >
                Last
              </a>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

SearchFooter.propTypes = {
  metadata: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

SearchFooter.defaultProps = {
  metadata: {},
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default SearchFooter;
