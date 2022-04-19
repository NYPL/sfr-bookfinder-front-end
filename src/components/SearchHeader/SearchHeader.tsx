import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";
import SearchForm from "../SearchForm/SearchForm";
import { SearchQuery } from "~/src/types/SearchQuery";

/**
 * Search Header Component
 */

const SearchHeader: React.FC<{
  searchQuery?: SearchQuery;
}> = ({ searchQuery }) => {
  return (
    <>
      <Box
        className="search-header-container"
        bg="var(--nypl-colors-section-research-primary)"
      >
        <Box
          className="search-header"
          aria-label="Digital Research Books Beta"
          m="0 auto"
          maxW="1280px"
          width="100%"
          p="var(--nypl-space-s)"
          color="var(--nypl-colors-white)"
        >
          <Heading level={HeadingLevels.Two} additionalStyles={{ m: "0" }}>
            <>
              Digital Research Books <sup>Beta</sup>
            </>
          </Heading>
        </Box>
      </Box>
      <Box
        className="search-header-form"
        m="0 auto"
        maxW="1280px"
        width="100%"
        p="var(--nypl-space-s)"
      >
        <SearchForm searchQuery={searchQuery} isHeader />
      </Box>
    </>
  );
};

export default SearchHeader;
