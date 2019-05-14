import React from 'react';
import PropTypes from 'prop-types';

const SearchFooter = ({
  FirstPage, PreviousPage, PageSelector, NextPage, LastPage,
}) => (
  <form className="usa-form grid-container padding-0 search-header search-footer">
    <div className="grid-row">
      <div className="grid-col-3 sfr-header-border" />
      <div className="grid-col-9">
        <div className="grid-row">
          <div className="grid-col sfr-header-border empty" />
          <div className="grid-col sfr-header-border empty" />
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
      </div>
    </div>
  </form>
);

SearchFooter.propTypes = {
  FirstPage: PropTypes.element,
  PreviousPage: PropTypes.element,
  PageSelector: PropTypes.element,
  NextPage: PropTypes.element,
  LastPage: PropTypes.element,
};

SearchFooter.defaultProps = {
  FirstPage: null,
  PreviousPage: null,
  PageSelector: null,
  NextPage: null,
  LastPage: null,
};

export default SearchFooter;
