import React from "react";
import { Box, Heading, Hero } from "@nypl/design-system-react-components";
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
      <Hero
        backgroundColor="section.research.primary"
        heroType="tertiary"
        heading={
          <Heading level="one" id="tertiary-hero">
            <>
              Digital Research Books <sup>Beta</sup>
            </>
          </Heading>
        }
      />
      <Box bg="ui.gray.x-light-cool">
        <Box m="0 auto" maxW="1280px" p="s">
          <Box width={{ md: "85%" }}>
            <SearchForm searchQuery={searchQuery} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchHeader;
