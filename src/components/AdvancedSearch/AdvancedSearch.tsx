import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  findFiltersForField,
  findFiltersExceptFields,
  findQueryForField,
} from "~/src/util/SearchQueryUtils";
import {
  inputTerms,
  errorMessagesText,
  breadcrumbTitles,
} from "~/src/constants/labels";
import FilterYears from "~/src/components/FilterYears/FilterYears";
import { SearchQuery, SearchQueryDefaults } from "~/src/types/SearchQuery";

import LanguageAccordion from "../LanguageAccordion/LanguageAccordion";
import FilterBookFormat from "../FilterBookFormat/FilterBookFormat";
import { FacetItem } from "~/src/types/DataModel";
import { toLocationQuery, toApiQuery } from "~/src/util/apiConversion";
import filterFields from "~/src/constants/filters";
import { ApiLanguageResponse } from "~/src/types/LanguagesQuery";
import {
  TemplateBreakout,
  Breadcrumbs,
  Heading,
  Form,
  FormField,
  TextInput,
  Button,
  Template,
  FormRow,
  FullDateType,
  ColorVariants,
  TemplateContent,
  ButtonGroup,
  ButtonTypes,
} from "@nypl/design-system-react-components";

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
        ...findFiltersExceptFields(searchQuery.filters, [
          filterFields.language,
        ]),
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
        ...findFiltersExceptFields(searchQuery.filters, [filterFields.format]),
        ...(e.target.checked
          ? [...formatFilters, { field: "format", value: format }]
          : formatFilters.filter((filter) => {
              return filter.value !== format;
            })),
      ],
    });
  };

  const onDateChange = (e: FullDateType) => {
    const newFilters = [
      ...findFiltersExceptFields(searchQuery.filters, [
        filterFields.startYear,
        filterFields.endYear,
      ]),
      ...[{ field: filterFields.startYear, value: e.startDate }],
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

  // Because each FormRow has two InputTerms each,
  // create an array of nested arrays, each with two InputTerms.
  const inputTermRows: { key: string; label: string }[][] = inputTerms.reduce(
    function (rows, key, index) {
      return (
        (index % 2 === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows
      );
    },
    []
  );

  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          colorVariant={ColorVariants.Research}
          breadcrumbsData={[
            {
              url: "/",
              text: breadcrumbTitles.home,
            },
            {
              url: "#",
              text: breadcrumbTitles.advancedSearch,
            },
          ]}
        />
      </TemplateBreakout>

      <TemplateContent>
        <Heading level={1}>Advanced Search</Heading>
        <Form action="/search" method="get">
          {/* Search Terms */}
          {inputTermRows.map(
            (inputTerms: { key: string; label: string }[], i: number) => {
              return (
                <FormRow key={`input-row-${i}`}>
                  {inputTerms.map((field: { key: string; label: string }) => {
                    <FormField>
                      <TextInput
                        id={`search-${field.label}`}
                        isRequired
                        labelText={field.label}
                        value={
                          findQueryForField(searchQuery.queries, field.key)
                            ? findQueryForField(searchQuery.queries, field.key)
                                .query
                            : ""
                        }
                        onChange={(e) => onQueryChange(e, field.key)}
                        showLabel
                        type="text"
                      />
                    </FormField>;
                  })}
                </FormRow>
              );
            }
          )}
          <FormField>
            <LanguageAccordion
              languages={languages}
              showCount={false}
              selectedLanguages={findFiltersForField(
                searchQuery.filters,
                "language"
              )}
              onLanguageChange={(e, language) => onLanguageChange(e, language)}
            />
          </FormField>
          <FormField>
            <FilterYears
              startFilter={startFilter && startFilter[0]}
              endFilter={endFilter && endFilter[0]}
              onDateChange={(e: FullDateType) => {
                onDateChange(e);
              }}
            />
          </FormField>
          <FormField>
            <FilterBookFormat
              selectedFormats={findFiltersForField(
                searchQuery.filters,
                "format"
              )}
              onFormatChange={(e, format) => {
                onBookFormatChange(e, format);
              }}
            />
          </FormField>
          <FormField>
            <ButtonGroup>
              <Button
                type="submit"
                buttonType={ButtonTypes.Primary}
                onClick={(e) => {
                  submit(e);
                }}
              >
                Search
              </Button>
              <Button
                type="reset"
                buttonType={ButtonTypes.Secondary}
                onClick={() => clearSearch()}
              >
                Clear
              </Button>
            </ButtonGroup>
          </FormField>
        </Form>
      </TemplateContent>
    </Template>
  );
};

export default AdvancedSearch;
