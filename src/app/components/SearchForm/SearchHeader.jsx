/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as DS from '@nypl/design-system-react-components';
import withSearch from './WithSearch';
import { searchFields } from '../../constants/fields';

const ResultsHeader = props => (
  <DS.HeaderWithSearch
    searchButtonId="searchButtonId"
    searchBarAriaLabel="Search research catalog"
    sectionTitle={(
      <Link
        className="search-header__rn-section-title search-header__rn-section-title--dark-background rn-section-title"
        to="/"
      >
        <span id="research-now-title">
          <span className="rn-section-title__emphasis">Digital Research Books</span>
          {' '}
          Beta
        </span>
      </Link>
    )}
    advancedSearchElem={(
      <DS.UnderlineLink>
        <Link
          to="advanced-search"
          className="text-baseline"
        >
                  Advanced Search
        </Link>
      </DS.UnderlineLink>
            )}
    searchBarId="searchBarId"
    dropdownId="dropdownId"
    textFieldAriaLabel="Digital Research Books Beta"
    headingContent={(
      <span>
        <span className="rn-section-title__emphasis">Digital Research Books</span>
        {' '}
        Beta
      </span>
    )}
    headingId="researchNow-page-title-id"
    headingUrl="#research-now-url"
    headingBaseClass="rn-section-title"
    hasError={props.hasError}
    errorMessage={props.errorMessage}
    searchDropdownOptions={props.allowedFields}
    searchSubmitHandler={props.submitSearchRequest}
    textChangeHandler={props.onQueryChange}
    selectChangeHandler={props.onFieldChange}
    selectBlurHandler={props.onFieldChange}
  />
);

ResultsHeader.propTypes = {
  allowedFields: PropTypes.arrayOf(PropTypes.any),
  submitSearchRequest: PropTypes.func,
  onQueryChange: PropTypes.func,
  onFieldChange: PropTypes.func,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

ResultsHeader.defaultProps = {
  allowedFields: searchFields,
  submitSearchRequest: () => { },
  onQueryChange: () => { },
  onFieldChange: () => { },
  hasError: false,
  errorMessage: '',
};

const SearchHeader = withSearch(ResultsHeader);
export default SearchHeader;
