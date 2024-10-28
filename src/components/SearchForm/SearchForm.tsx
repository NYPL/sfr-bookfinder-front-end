import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { SearchBar, Box } from "@nypl/design-system-react-components";
import { SEARCH_BAR_TEST_ID } from "~/src/constants/testIds";
import { SearchQuery, SearchQueryDefaults } from "~/src/types/SearchQuery";
import { errorMessagesText, inputTerms } from "~/src/constants/labels";
import { toLocationQuery, toApiQuery } from "~/src/util/apiConversion";
import { Query, SearchField } from "~/src/types/DataModel";
import Link from "../Link/Link";

const SearchForm: React.FC<{
  searchQuery?: SearchQuery;
}> = ({ searchQuery }) => {
  const initialDefaultQuery: Query = { query: "", field: SearchField.Keyword };

  // The display query is the query that's auto-populated in the searchbar.
  // If a displayQuery is passed,
  // If there is more than one query, the displayQuery is not prepopulated.
  // If the query is a viaf query, the displayQuery is the value that the user clicked
  const getDisplayQuery = (query: Query) => {
    if (searchQuery.display) {
      return searchQuery.display;
    }
    return query;
  };

  const [shownQuery, setShownQuery] = useState(
    searchQuery && searchQuery.queries && searchQuery.queries.length === 1
      ? getDisplayQuery(searchQuery.queries[0])
      : initialDefaultQuery
  );
  const [isFormError, setFormError] = useState(false);

  const router = useRouter();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shownQuery.query) {
      setFormError(true);
      return;
    }

    const searchQuery = SearchQueryDefaults;
    searchQuery.queries = [shownQuery];

    router.push({
      pathname: "/search",
      query: toLocationQuery(toApiQuery(searchQuery)),
    });
  };

  const onQueryChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setShownQuery({ query: e.target.value, field: shownQuery.field });
  };

  const onFieldChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setShownQuery({
      field: e.target.value as SearchField,
      query: shownQuery.query,
    });
  };

  return (
    <Box overflow="auto">
      <SearchBar
        id="search-bar"
        invalidText={errorMessagesText.emptySearch}
        isInvalid={isFormError}
        onSubmit={(e) => submitSearch(e)}
        selectProps={{
          labelText: "Select a search category",
          name: "selectName",
          optionsData: inputTerms,
          onChange: (e: ChangeEvent<HTMLInputElement>) => onFieldChange(e),
          value: shownQuery.field,
        }}
        textInputProps={{
          labelText: "Item Search",
          name: "textInputName",
          placeholder: "Enter a search term",
          value: shownQuery.query,
          onChange: (e) => onQueryChange(e),
        }}
        labelText="Search"
        data-testid={SEARCH_BAR_TEST_ID}
      />
      <Box float="right" marginTop={{ md: "xs" }}>
        <Link to="/advanced-search" isUnderlined={false}>
          Advanced Search
        </Link>
      </Box>
    </Box>
  );
};

export default SearchForm;
