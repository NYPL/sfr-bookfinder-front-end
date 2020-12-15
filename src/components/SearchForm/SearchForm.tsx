import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from "~/src/components/Link/Link";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/stores/InitialState' or ... Remove this comment to see the full error message
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "~/src/stores/InitialState";
// @ts-expect-error ts-migrate(6142) FIXME: Module './WithSearch' was resolved to '/Users/crys... Remove this comment to see the full error message
import withSearch from "./WithSearch";
import { searchFields } from "../../constants/fields";

type OwnProps = {
  allowedFields?: any[];
  currentQuery?: searchQueryPropTypes;
  submitSearchRequest?: (...args: any[]) => any;
  onQueryChange?: (...args: any[]) => any;
  onFieldChange?: (...args: any[]) => any;
  hasError?: boolean;
  errorMessage?: string;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LandingPromo.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'LandingPromo' implicitly has type 'any' because i... Remove this comment to see the full error message
const LandingPromo = (props: Props) => {
  const selectedQuery = props.currentQuery.queries[0].query;
  const selectedField = props.currentQuery.queries[0].field;
  const advancedSearchMessage = (
    <p>
      Use{" "}
      <Link to="/advanced-search" className="link">
        Advanced Search
      </Link>{" "}
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

LandingPromo.defaultProps = {
  allowedFields: searchFields,
  currentQuery: initialSearchQuery,
  submitSearchRequest: () => {},
  onQueryChange: () => {},
  onFieldChange: () => {},
  hasError: false,
  errorMessage: "",
};

const SearchForm = withSearch(LandingPromo);
export default SearchForm;
