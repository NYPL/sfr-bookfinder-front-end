import React from 'react';
import PropTypes from 'prop-types';
import Link from '~/src/components/Link/Link';
import * as DS from '@nypl/design-system-react-components';
import { initialSearchQuery, searchQueryPropTypes } from '~/src/stores/InitialState';
import withSearch from './WithSearch';
import { searchFields } from '../../constants/fields';

const LandingPromo = (props) => {
  const selectedQuery = props.currentQuery.queries[0].query;
  const selectedField = props.currentQuery.queries[0].field;
  const advancedSearchMessage = (
    <p>
        Use
      {' '}
      <Link
        to="/advanced-search"
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
  allowedFields: searchFields,
  currentQuery: initialSearchQuery,
  submitSearchRequest: () => { },
  onQueryChange: () => { },
  onFieldChange: () => { },
  hasError: false,
  errorMessage: '',
};

const SearchForm = withSearch(LandingPromo);
export default SearchForm;
