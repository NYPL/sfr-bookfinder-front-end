import React, { useState } from "react";
import { useRouter } from "next/router";
import { SearchQuery, SearchQueryDefaults } from "~/src/types/SearchQuery";
import { errorMessagesText, inputTerms } from "~/src/constants/labels";
import { toLocationQuery, toApiQuery } from "~/src/util/apiConversion";
import { Query, SearchField } from "~/src/types/DataModel";
import { SearchBar, Box } from "@nypl/design-system-react-components";
import Link from "../Link/Link";

const SearchForm: React.FC<{
  searchQuery?: SearchQuery;
  isHeader?: boolean; //Is this searchForm in the header (search/work/edition pages), or on its own (homepage)
}> = ({ searchQuery, isHeader }) => {
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

  const onFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShownQuery({
      field: SearchField[e.target.value],
      query: shownQuery.query,
    });
  };

  return (
    <Box>
      <SearchBar
        invalidText={isFormError ? errorMessagesText.emptySearch : ""}
        onSubmit={(e) => submitSearch(e)}
        selectProps={{
          labelText: "Select a search category",
          name: "selectName",
          optionsData: inputTerms.map((field) => field.key),
          onChange: (e) => onFieldChange(e),
        }}
        textInputProps={{
          labelText: "Item Search",
          name: "textInputName",
          placeholder: "Enter a search term",
          onChange: (e) => onQueryChange(e),
        }}
        labelText="Search"
        helperErrorText={
          !isHeader && (
            <p className="advanced-search-message">
              Use{" "}
              <Link to="/advanced-search" className="link">
                Advanced Search
              </Link>{" "}
              to narrow your results.
            </p>
          )
        }
      />
    </Box>
  );
};

export default SearchForm;
