import React from "react";
import { Heading, HeadingLevels } from "@nypl/design-system-react-components";
import SearchForm from "../SearchForm/SearchForm";
import Link from "../Link/Link";
import { SearchQuery } from "~/src/types/SearchQuery";

/**
 * Search Header Component
 */

const SearchHeader: React.FC<{
  searchQuery?: SearchQuery;
}> = ({ searchQuery }) => {
  return (
    <div className="search-header-container">
      <div className="search-header" aria-label="Digital Research Books Beta">
        <Heading level={HeadingLevels.Two}>
          <Link to="/">Digital Research Books Beta</Link>
        </Heading>
        <SearchForm searchQuery={searchQuery} isHeader />
        <div className="advanced-search">
          <Link
            to={{
              pathname: "/advanced-search",
            }}
            modifiers={["dark-background"]}
            className="link"
          >
            Advanced Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
