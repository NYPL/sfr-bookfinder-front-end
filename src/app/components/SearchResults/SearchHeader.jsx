import React from 'react';
import PropTypes from 'prop-types';

const SearchHeader = ({
  ItemsPerPage, SortBy, FirstPage, PreviousPage, PageSelector, NextPage, LastPage,
}) => (
  <form className="usa-form grid-container padding-0 search-header">
    <div className="grid-row">
      <div className="grid-col">{ItemsPerPage}</div>
      <div className="grid-col">{SortBy}</div>
      <div className="grid-col">
        <div className="sfr-header-border text-right">
          {FirstPage}
          {PreviousPage}
        </div>
      </div>
      <div className="grid-col">{PageSelector}</div>
      <div className="grid-col">
        <div className="sfr-header-border last text-left">
          {NextPage}
          {LastPage}
        </div>
      </div>
    </div>
  </form>
);

SearchHeader.propTypes = {
  ItemsPerPage: PropTypes.element,
  SortBy: PropTypes.element,
  FirstPage: PropTypes.element,
  PreviousPage: PropTypes.element,
  PageSelector: PropTypes.element,
  NextPage: PropTypes.element,
  LastPage: PropTypes.element,
};

SearchHeader.defaultProps = {
  ItemsPerPage: null,
  SortBy: null,
  FirstPage: null,
  PreviousPage: null,
  PageSelector: null,
  NextPage: null,
  LastPage: null,
};

export default SearchHeader;
