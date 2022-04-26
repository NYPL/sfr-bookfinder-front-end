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
      <Box className="search-header-container" bg="section.research.primary">
        <Heading
          level={HeadingLevels.Two}
          additionalStyles={{
            m: "0 auto",
            maxW: "1280px",
            w: "100%",
            p: "s",
            color: "ui.white",
          }}
        >
          <>
            Digital Research Books <sup>Beta</sup>
          </>
        </Heading>
      </Box>
      <Box bg="ui.gray.x-light-cool">
        <Box
          className="search-header-form"
          m="0 auto"
          maxW="1280px"
          width="100%"
          p="s"
        >
          <SearchForm searchQuery={searchQuery} isHeader />
        </Box>
      </Box>
    </>
  );
};

export default SearchHeader;
