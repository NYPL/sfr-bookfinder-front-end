import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Link/Link' or... Remove this comment to see the full error message
import Link from "~/src/components/Link/Link";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(6142) FIXME: Module './WithSearch' was resolved to '/Users/crys... Remove this comment to see the full error message
import withSearch from "./WithSearch";
import { searchFields } from "../../constants/fields";

type OwnProps = {
  allowedFields?: any[];
  currentQuery?: {
    [key: string]: any;
  };
  submitSearchRequest?: (...args: any[]) => any;
  onQueryChange?: (...args: any[]) => any;
  onFieldChange?: (...args: any[]) => any;
  hasError?: boolean;
  errorMessage?: string;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ResultsHeader.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'ResultsHeader' implicitly has type 'any' because ... Remove this comment to see the full error message
const ResultsHeader = (props: Props) => {
  const currentQuery = props.currentQuery;

  // If using Advanced Search with multiple fields, don't prepopulate header.
  let valueToPrepopulate = "";
  let fieldToPrepopulate = "keyword";

  // Prepopulate search values
  // If regular search, prepopulate as is.
  // If searching by clicking on author name, prepopulate using the author name.

  if (
    currentQuery &&
    currentQuery.queries &&
    currentQuery.queries.length === 1
  ) {
    const query = currentQuery.queries[0];
    if (searchFields.includes(query.field)) {
      valueToPrepopulate = query.query;
      fieldToPrepopulate = query.field;
    } else if (
      currentQuery.showQueries &&
      currentQuery.showQueries.length === 1 &&
      currentQuery.showQueries[0].field === "author"
    ) {
      valueToPrepopulate = currentQuery.showQueries[0].query;
      fieldToPrepopulate = currentQuery.showQueries[0].field;
    }
  }
  return (
    <DS.HeaderWithSearch
      searchButtonId="searchButtonId"
      searchBarAriaLabel="Search research catalog"
      searchValue={valueToPrepopulate}
      selectedField={fieldToPrepopulate}
      sectionTitle={
        <Link
          className="search-header__rn-section-title search-header__rn-section-title--dark-background rn-section-title"
          to="/"
        >
          <span id="research-now-title">
            <span className="rn-section-title__emphasis">
              Digital Research Books
            </span>{" "}
            Beta
          </span>
        </Link>
      }
      advancedSearchElem={
        <DS.Link>
          <Link
            to="/advanced-search"
            className="text-baseline link--dark-background"
          >
            Advanced Search
          </Link>
        </DS.Link>
      }
      searchBarId="searchBarId"
      dropdownId="dropdownId"
      textFieldAriaLabel="Digital Research Books Beta"
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ searchButtonId: string; searchBarAriaLabel... Remove this comment to see the full error message
      headingContent={
        <span>
          <span className="rn-section-title__emphasis">
            Digital Research Books
          </span>{" "}
          Beta
        </span>
      }
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
};

ResultsHeader.defaultProps = {
  allowedFields: searchFields,
  currentQuery: {},
  submitSearchRequest: () => {},
  onQueryChange: () => {},
  onFieldChange: () => {},
  hasError: false,
  errorMessage: "",
};

const SearchHeader = withSearch(ResultsHeader);
export default SearchHeader;
