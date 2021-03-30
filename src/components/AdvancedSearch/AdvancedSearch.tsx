import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  findFiltersForField,
  findFiltersExceptField,
  findQueryForField,
} from "~/src/util/SearchQueryUtils";
import {
  inputTerms,
  errorMessagesText,
  breadcrumbTitles,
} from "~/src/constants/labels";
import FilterYears from "~/src/components/FilterYears/FilterYears";
import { SearchQuery, SearchQueryDefaults } from "~/src/types/SearchQuery";

import * as DS from "@nypl/design-system-react-components";
import LanguageAccordion from "../LanguageAccordion/LanguageAccordion";
import FilterBookFormat from "../FilterBookFormat/FilterBookFormat";
import { FacetItem } from "~/src/types/DataModel";
import { toLocationQuery } from "~/src/util/SearchUtils";
import { toApiQuery } from "~/src/util/apiConversion";

const AdvancedSearch: React.FC<{
  searchQuery: SearchQuery;
  languages: FacetItem[];
}> = (props) => {
  const { languages } = props;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState({
    ...SearchQueryDefaults,
    ...props.searchQuery,
  });
  const [emptySearchError, setEmptySearchError] = useState("");
  const [dateRangeError, setDateRangeError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!searchQuery.queries || searchQuery.queries.length < 1) {
      setEmptySearchError(errorMessagesText.emptySearch);
      return;
    } else {
      setEmptySearchError("");
    }

    if (
      searchQuery.filterYears.start &&
      searchQuery.filterYears.end &&
      searchQuery.filterYears.end < searchQuery.filterYears.start
    ) {
      setDateRangeError(errorMessagesText.invalidDate);
      return;
    } else {
      setDateRangeError("");
    }

    router.push({
      pathname: "/search",
      query: toLocationQuery(toApiQuery(searchQuery)),
    });
  };

  const clearSearch = () => {
    setSearchQuery(SearchQueryDefaults);
  };

  const onQueryChange = (e, queryKey) => {
    const newQuery = {
      field: queryKey,
      query: e.target.value,
    };

    const allQueries = searchQuery.queries.filter((query) => {
      return query.field !== queryKey;
    });

    allQueries.push(newQuery);
    setSearchQuery({
      ...searchQuery,
      queries: allQueries,
    });
  };

  const onLanguageChange = (e, language) => {
    const languageFilters = findFiltersForField(
      searchQuery.filters,
      "language"
    );

    setSearchQuery({
      ...searchQuery,
      filters: [
        ...findFiltersExceptField(searchQuery.filters, "language"),
        ...(e.target.checked
          ? [...languageFilters, { field: "language", value: language }]
          : languageFilters.filter((filter) => {
              return filter.value !== language;
            })),
      ],
    });
  };

  const onBookFormatChange = (e, format) => {
    const formatFilters = findFiltersForField(searchQuery.filters, "format");

    setSearchQuery({
      ...searchQuery,
      filters: [
        ...findFiltersExceptField(searchQuery.filters, "format"),
        ...(e.target.checked
          ? [...formatFilters, { field: "format", value: format }]
          : formatFilters.filter((filter) => {
              return filter.value !== format;
            })),
      ],
    });
  };

  const onDateChange = (e, isStart: boolean) => {
    setSearchQuery({
      ...searchQuery,
      filterYears: {
        start: isStart ? e.target.value : searchQuery.filterYears.start,
        end: isStart ? searchQuery.filterYears.end : e.target.value,
      },
    });
  };

  return (
    <main id="mainContent" className="main  advanced-search">
      <div className="content-top">
        <DS.Breadcrumbs
          modifiers={["space-under"]}
          breadcrumbs={[{ url: "/", text: breadcrumbTitles.home }]}
        />
      </div>

      <div className="content-primary">
        <DS.Heading level={1}>Advanced Search</DS.Heading>

        <form
          onSubmit={(e) => {
            submit(e);
          }}
        >
          {emptySearchError && (
            <DS.HelperErrorText isError={true}>
              {emptySearchError}
            </DS.HelperErrorText>
          )}
          {dateRangeError && (
            <DS.HelperErrorText isError={true}>
              {dateRangeError}
            </DS.HelperErrorText>
          )}
          <fieldset>
            <div className="search-fields">
              {inputTerms.map((field: { key: string; label: string }) => {
                return (
                  <div key={`field-${field.key}`}>
                    <DS.Label
                      htmlFor={`${field.key}-input`}
                      id={`${field.key}-label`}
                    >
                      {field.label}
                    </DS.Label>
                    <DS.Input
                      id={`${field.key}-input`}
                      ariaLabel={`Input for ${field.label}`}
                      value={
                        findQueryForField(searchQuery.queries, field.key)
                          ? findQueryForField(searchQuery.queries, field.key)
                              .query
                          : ""
                      }
                      onChange={(e) => onQueryChange(e, field.key)}
                    />
                  </div>
                );
              })}
            </div>
          </fieldset>
          {languages.length > 0 && (
            <LanguageAccordion
              languages={languages}
              showCount={false}
              selectedLanguages={findFiltersForField(
                searchQuery.filters,
                "language"
              )}
              onLanguageChange={(e, language) => onLanguageChange(e, language)}
            />
          )}
          <FilterYears
            dateFilters={searchQuery.filterYears}
            onDateChange={(e, isStart) => {
              onDateChange(e, isStart);
            }}
          />
          <FilterBookFormat
            selectedFormats={findFiltersForField(searchQuery.filters, "format")}
            onFormatChange={(e, format) => {
              onBookFormatChange(e, format);
            }}
          />
          <hr />
          <div className="button-container">
            <DS.Button
              id="search-button"
              buttonType={DS.ButtonTypes.Primary}
              type="submit"
            >
              Search
            </DS.Button>
            <DS.Button
              id="clear-button"
              buttonType={DS.ButtonTypes.Secondary}
              type="reset"
              onClick={() => clearSearch()}
            >
              Clear
            </DS.Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdvancedSearch;
