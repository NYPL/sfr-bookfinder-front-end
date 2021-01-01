import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "~/src/components/Link/Link";
import * as DS from "@nypl/design-system-react-components";
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "~/src/stores/InitialState";
import { searchFields } from "../../constants/fields";
import { submit } from "../SearchResults/SearchNavigation";
import { Query, SearchQuery } from "~/src/types/SearchQuery";
import { queryToString } from "~/src/util/SearchUtils";
import Select from "../Select/Select";

const SearchForm: React.FC<any> = (
  searchQuery: SearchQuery = { queries: [] }
) => {
  // If there is one query, then default searchbar to show it
  const queryToShow: Query | undefined =
    searchQuery.queries && searchQuery.queries.length === 1
      ? searchQuery.queries[0]
      : undefined;

  const [searchInput, setSearchInput] = useState(
    queryToShow ? queryToShow.query : ""
  );
  const [searchField, setSearchField] = useState(
    queryToShow ? queryToShow.field : ""
  );
  const router = useRouter();

  const submitSearch = async (query: SearchQuery) => {
    const path = `/search?${queryToString(query)}`;
    router.push(path);
  };

  const advancedSearchMessage = (
    <p>
      Use{" "}
      <Link to="/advanced-search" className="link">
        Advanced Search
      </Link>{" "}
      to narrow your results.
    </p>
  );

  const getSearchOptions = (fields) => {
    return fields.map((field) => {
      return <option key={field}>{field}</option>;
    });
  };

  return (
    <div>
      <DS.Heading level={2}>Search the World's Research Collections</DS.Heading>
      <DS.SearchBar onSubmit={() => submitSearch} ariaLabel="Search Bar">
        <Select name={"searchField"} isRequired={true}>
          {getSearchOptions(searchFields)}
        </Select>
        {/* TODO: Helper Error Text */}
        <DS.Input type={DS.InputTypes.text}></DS.Input>
        <DS.Button
          id="search-button"
          buttonType={DS.ButtonTypes.Primary}
          type="submit"
        >
          <DS.Icon
            name={DS.IconNames.search}
            decorative={true}
            modifiers={["small", "icon-left"]}
          />
          Search
        </DS.Button>
      </DS.SearchBar>
      {advancedSearchMessage}
    </div>
  );
};

export default SearchForm;
