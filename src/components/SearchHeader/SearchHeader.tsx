import React from "react";

import * as DS from "@nypl/design-system-react-components";

import SearchForm from "../SearchForm/SearchForm";
import Link from "../Link/Link";
import { SearchQuery } from "~/src/types/SearchQuery";
import { toLocationQuery } from "~/src/util/SearchUtils";
import { toApiQuery } from "~/src/util/apiConversion";

/**
 * Search Header Component
 */

const SearchHeader: React.FC<{ searchQuery?: SearchQuery }> = ({
  searchQuery,
}) => {
  return (
    <div className="search-header-container">
      <div className="search-header" aria-label="Digital Research Books Beta">
        <DS.Heading level={1} id="1" text="Digital Research Books Beta" />
        <SearchForm searchQuery={searchQuery} />
        <Link
          to={{
            pathname: "/advanced-search",
            query: searchQuery && toLocationQuery(toApiQuery(searchQuery)),
          }}
          modifiers={["dark-background"]}
          className="link"
        >
          Advanced Search
        </Link>
      </div>
    </div>
  );
};

export default SearchHeader;
