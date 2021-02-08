import React from "react";

import * as DS from "@nypl/design-system-react-components";

import SearchForm from "../SearchForm/SearchForm";
import Link from "../Link/Link";
import { SearchQuery } from "~/src/types/SearchQuery";

/**
 * Search Header Component
 */

const SearchHeader: React.FC<{ searchQuery?: SearchQuery }> = ({
  searchQuery,
}) => {
  return (
    <div className="search-header" aria-label="Digital Research Books Beta">
      <>
        <DS.Heading level={1} id="1" text="Digital Research Books Beta" />
        <SearchForm searchQuery={searchQuery} />
        <Link to="/advanced-search" className="link">
          Advanced Search
        </Link>
      </>
    </div>
  );
};

export default SearchHeader;
