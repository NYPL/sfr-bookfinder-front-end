import React, { useState } from "react";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import { searchFields } from "../../constants/fields";
import {
  Query,
  SearchQuery,
  SearchQueryDefaults,
} from "~/src/types/SearchQuery";
import { errorMessagesText } from "~/src/constants/labels";
import { toLocationQuery } from "~/src/util/SearchUtils";
import { toApiQuery } from "~/src/util/apiConversion";

const SearchForm: React.FC<{
  searchQuery?: SearchQuery;
}> = ({ searchQuery }) => {
  // If there is one query, then default searchbar to show it
  const queryToShow: Query | undefined =
    searchQuery && searchQuery.queries && searchQuery.queries.length === 1
      ? searchQuery.queries[0]
      : SearchQueryDefaults.queries[0];

  const initialDefaultQuery: Query = { query: "", field: "keyword" };

  const [shownQuery, setShownQuery] = useState(
    queryToShow ? queryToShow : initialDefaultQuery
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

  const getSearchOptions = (fields) => {
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
          {getSearchOptions(searchFields)}
        </DS.Select>
        <DS.Input
          type={DS.InputTypes.text}
          value={shownQuery.query}
          onChange={(e: any) => onQueryChange(e)}
          ariaLabelledBy={"search-button"}
        ></DS.Input>
        {isFormError && (
          <DS.HelperErrorText isError={true} id={"search-bar-error"}>
            {errorMessagesText.emptySearch}
          </DS.HelperErrorText>
        )}
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
    </div>
  );
};

export default SearchForm;
