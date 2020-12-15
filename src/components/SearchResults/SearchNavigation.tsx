import React from "react";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/stores/InitialState' or ... Remove this comment to see the full error message
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "~/src/stores/InitialState";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/searchQuery' or its... Remove this comment to see the full error message
import { getQueryString } from "~/src/util/searchQuery";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/sorts' or its ... Remove this comment to see the full error message
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { deepEqual } from "~/src/util/Util";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchResults... Remove this comment to see the full error message
import ResultsMetadata from "~/src/components/SearchResults/ResultsMetadata";
// redirect to url with query params
export const submit = (query: any, router: any) => {
  const path = `/search?${getQueryString(query)}`;
  router.push(path);
};

type OwnSearchNavigationProps = {
  totalItems?: number;
  searchQuery?: searchQueryPropTypes;
  userQuery?: (...args: any[]) => any;
  router?: {
    [key: string]: any;
  };
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'SearchNavigationProps' circularly refe... Remove this comment to see the full error message
type SearchNavigationProps = OwnSearchNavigationProps &
  typeof SearchNavigation.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'SearchNavigation' implicitly has type 'any' becau... Remove this comment to see the full error message
const SearchNavigation = ({
  totalItems,
  searchQuery,
  userQuery,
  router,
}: SearchNavigationProps) => {
  // update per_page in store when select of per_page changes
  const onChangePerPage = (e: any) => {
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.per_page) {
      const newQuery = Object.assign({}, searchQuery, {
        page: newPage,
        per_page: newPerPage,
        total: totalItems || 0,
      });
      userQuery(newQuery);
      submit(newQuery, router);
    }
  };

  // click and navigate with different sort
  const onChangeSort = (e: any) => {
    if (
      e.target.value !==
      Object.keys(sortMap).find((key) => sortMap[key] === searchQuery.sort)
    ) {
      const newQuery = Object.assign({}, searchQuery, {
        sort: sortMap[e.target.value],
        page: 0,
      });
      userQuery(newQuery);
      submit(newQuery, router);
    }
  };

  return (
    <div className="search-navigation grid-row">
      <DS.Heading level={2} id="page-title-heading" blockName="page-title">
        <ResultsMetadata totalItems={totalItems} searchQuery={searchQuery} />
      </DS.Heading>

      <div className="search-dropdowns">
        <DS.Dropdown
          dropdownId="items-per-page-select"
          isRequired={false}
          labelPosition="left"
          labelText="Items Per Page"
          labelId="nav-items-per-page"
          selectedOption={
            searchQuery.per_page ? searchQuery.per_page : undefined
          }
          dropdownOptions={numbersPerPage.map((number: any) =>
            number.toString()
          )}
          onSelectChange={onChangePerPage}
          onSelectBlur={onChangePerPage}
        />

        <DS.Dropdown
          dropdownId="sort-by-select"
          isRequired={false}
          labelPosition="left"
          labelText="Sort By"
          labelId="nav-sort-by"
          selectedOption={
            searchQuery.sort
              ? Object.keys(sortMap).find((key) =>
                  deepEqual(sortMap[key], searchQuery.sort)
                )
              : undefined
          }
          dropdownOptions={Object.keys(sortMap).map((sortOption) => sortOption)}
          onSelectChange={onChangeSort}
          onSelectBlur={onChangeSort}
        />
      </div>
    </div>
  );
};

SearchNavigation.defaultProps = {
  totalItems: 0,
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default SearchNavigation;
