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
import { toLocationQuery, toApiQuery } from "~/src/util/apiConversion";
import filterFields from "~/src/constants/filters";
import { ApiLanguageResponse } from "~/src/types/LanguagesQuery";

const AdvancedSearch: React.FC<{
  languages: ApiLanguageResponse;
}> = ({ languages: previousLanguages }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    ...SearchQueryDefaults,
  });

  const [emptySearchError, setEmptySearchError] = useState("");
  const [dateRangeError, setDateRangeError] = useState("");

  const languages: FacetItem[] = previousLanguages
    ? previousLanguages.data.map((language) => {
        return {
          value: language.language,
          count: language.count,
        };
      })
    : [];

  const submit = (e) => {
    e.preventDefault();
    if (!searchQuery.queries || searchQuery.queries.length < 1) {
      setEmptySearchError(errorMessagesText.emptySearch);
      return;
    } else {
      setEmptySearchError("");
    }

    const startYear = findFiltersForField(
      searchQuery.filters,
      filterFields.startYear
    )[0];
    const endYear = findFiltersForField(
      searchQuery.filters,
      filterFields.endYear
    )[0];
    if (startYear && endYear && endYear.value < startYear.value) {
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

    // If the new query is not empty, add it
    if (newQuery.query.length > 0) {
      allQueries.push(newQuery);
    }
    setSearchQuery({
      ...searchQuery,
      queries: allQueries,
    });
  };

  const onLanguageChange = (e, language) => {
    const languageFilters = findFiltersForField(
      searchQuery.filters,
      filterFields.language
    );

    setSearchQuery({
      ...searchQuery,
      filters: [
        ...findFiltersExceptField(searchQuery.filters, filterFields.language),
        ...(e.target.checked
          ? [
              ...languageFilters,
              { field: filterFields.language, value: language },
            ]
          : languageFilters.filter((filter) => {
              return filter.value !== language;
            })),
      ],
    });
  };

  const onBookFormatChange = (e, format) => {
    const formatFilters = findFiltersForField(
      searchQuery.filters,
      filterFields.format
    );

    setSearchQuery({
      ...searchQuery,
      filters: [
        ...findFiltersExceptField(searchQuery.filters, filterFields.format),
        ...(e.target.checked
          ? [...formatFilters, { field: "format", value: format }]
          : formatFilters.filter((filter) => {
              return filter.value !== format;
            })),
      ],
    });
  };

  const onDateChange = (
    e: React.FormEvent<HTMLInputElement>,
    isStart: boolean
  ) => {
    const field = isStart ? filterFields.startYear : filterFields.endYear;
    const newFilters = [
      ...findFiltersExceptField(searchQuery.filters, field),
      ...[{ field: field, value: e.currentTarget.value }],
    ];
    setSearchQuery({
      ...searchQuery,
      filters: newFilters,
    });
  };

  const startFilter = findFiltersForField(
    searchQuery.filters,
    filterFields.startYear
  );
  const endFilter = findFiltersForField(
    searchQuery.filters,
    filterFields.endYear
  );

  return (
    <>
      <div className="content-top">
        <DS.Breadcrumbs
          modifiers={["space-under"]}
          breadcrumbs={[{ url: "/", text: breadcrumbTitles.home }]}
        />
      </div>
      <div className="content-primary advanced-search">
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
          {languages && languages.length > 0 && (
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
            startFilter={startFilter && startFilter[0]}
            endFilter={endFilter && endFilter[0]}
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
    </>
  );
};

export default AdvancedSearch;
