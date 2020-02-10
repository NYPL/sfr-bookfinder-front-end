/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as DS from '@nypl/design-system-react-components';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import withSearch from './WithSearch';

const LandingPromo = (props) => {
  const selectedQuery = props.currentQuery.showQuery || props.currentQuery.queries[0].query;
  const selectedField = props.currentQuery.showField || props.currentQuery.queries[0].field;
  const advancedSearchMessage = (
    <p>
        Use
      {' '}
      <Link
        to="advanced-search"
        className="link"
      >
          Advanced Search
      </Link>
      {' '}
        to narrow your results.
    </p>
  );

  return (
    <DS.SearchPromo
      headingText="Search the World's Research Collections"
      titleId="tagline"
      selectedOption={selectedField}
      searchButtonId="searchButtonId"
      advancedSearchMessage={advancedSearchMessage}
      searchValue={selectedQuery}
      hasError={props.hasError}
      errorMessage={props.errorMessage}
      searchBarId="searchBarId"
      dropdownId="dropdownId"
      searchInputAriaLabel="Search for keyword, author, title, or subject"
      searchDropdownOptions={props.allowedFields}
      searchSubmitHandler={props.submitSearchRequest}
      textChangeHandler={props.onQueryChange}
      selectChangeHandler={props.onFieldChange}
      selectBlurHandler={props.onFieldChange}
    />
  );
};


LandingPromo.propTypes = {
  allowedFields: PropTypes.arrayOf(PropTypes.any),
  currentQuery: searchQueryPropTypes,
  submitSearchRequest: PropTypes.func,
  onQueryChange: PropTypes.func,
  onFieldChange: PropTypes.func,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

LandingPromo.defaultProps = {
  allowedFields: ['keyword', 'title', 'author', 'subject'],
  currentQuery: initialSearchQuery,
  submitSearchRequest: () => { },
  onQueryChange: () => { },
  onFieldChange: () => { },
  hasError: false,
  errorMessage: '',
};

LandingPromo.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const SearchForm = withSearch(LandingPromo);

export default SearchForm;
