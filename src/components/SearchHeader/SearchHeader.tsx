import React from "react";

import { Heading, Box } from "@nypl/design-system-react-components";

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
    <Box className="search-header-container">
      <Box className="search-header">
        <Heading level={2}>
          <Link to="/">Digital Research Books Beta</Link>
        </Heading>
        <Box className="search-header-form">
          <SearchForm searchQuery={searchQuery} isHeader />
        </Box>
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
      </Box>
    </Box>
  );
};

export default SearchHeader;
