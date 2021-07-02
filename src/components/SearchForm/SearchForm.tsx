import React, { useState } from "react";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import { SearchQuery, SearchQueryDefaults } from "~/src/types/SearchQuery";
import { errorMessagesText, inputTerms } from "~/src/constants/labels";
import { toLocationQuery, toApiQuery } from "~/src/util/apiConversion";
import { Query, SearchField } from "~/src/types/DataModel";

const SearchForm: React.FC<{
  searchQuery?: SearchQuery;
  isHeader?: boolean; //Is this searchForm in the header (search/work/edition pages), or on its own (homepage)
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

  const submitSearch = (e) => {
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

  const onQueryChange = (e) => {
    setShownQuery({ query: e.target.value, field: shownQuery.field });
  };

  const onFieldChange = (e) => {
    setShownQuery({ field: e.target.value, query: shownQuery.query });
  };

  const getSearchOptions = (fields: string[]) => {
    return fields.map((field) => {
      return <option key={`search-type-${field}`}>{field}</option>;
    });
  };

  return (
    <div className="search-form">
      <DS.SearchBar onSubmit={(e) => submitSearch(e)} ariaLabel="Search Bar">
        <DS.Select
          name={"field"}
          selectedOption={shownQuery.field}
          isRequired={true}
          onChange={(e: any) => onFieldChange(e)}
          labelId={"search-button"}
        >
          {getSearchOptions(inputTerms.map((field) => field.key))}
        </DS.Select>
        <DS.Input
          errored={isFormError}
          type={DS.InputTypes.text}
          value={shownQuery.query}
          onChange={(e: any) => onQueryChange(e)}
          ariaLabelledBy={"search-button"}
        />
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
      {isFormError && (
        <DS.HelperErrorText isError={true} id={"search-bar-error"}>
          {errorMessagesText.emptySearch}
        </DS.HelperErrorText>
      )}
    </div>
  );
};

export default SearchForm;
