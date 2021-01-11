import React, { useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import LanguageAccordion from "../LanguageAccordion/LanguageAccordion";
import BookFormatInput from "../BookFormatInput/BookFormatInput";
import FilterYears from "../SearchResults/FilterYears";
import { ApiSearchResult, FacetItem } from "~/src/types/DataModel";
import { DateRange, Filter, SearchQuery } from "~/src/types/SearchQuery";
import {
  findFiltersExceptField,
  findFiltersForField,
} from "~/src/util/SearchQueryUtils";

/**
 * Shows a form with the Languages, Format and Year filters
 *
 *
 * submitOnChange: Toggles whether to automatically submit state changes
 */

const Filters: React.FC<{
  filters: Filter[];
  filterYears: DateRange;
  languages: FacetItem[];
  submitOnChange: boolean;
  submitFilters: (newFilters?: Filter[], newYears?: DateRange) => void;
}> = ({
  filters: propFilters,
  filterYears: propFilterYears,
  languages,
  submitOnChange,
  submitFilters,
}) => {
  const [filters, setFilters] = useState(propFilters);
  const [filterYears, setFilterYears] = useState(propFilterYears);

  const onLanguageChange = (e, language) => {
    const languageFilters = findFiltersForField(filters, "language");
    const newFilters = [
      ...findFiltersExceptField(filters, "language"),
      ...(e.target.checked
        ? [...languageFilters, { field: "language", value: language }]
        : languageFilters.filter((filter) => {
            return filter.value !== language;
          })),
    ];
    setFilters(newFilters);

    if (submitOnChange) {
      submitFilters(newFilters);
    }
  };

  const onBookFormatChange = (e, format) => {
    const formatFilters = findFiltersForField(filters, "format");

    const newFilters = [
      ...findFiltersExceptField(filters, "format"),
      ...(e.target.checked
        ? [...formatFilters, { field: "format", value: format }]
        : formatFilters.filter((filter) => {
            return filter.value !== format;
          })),
    ];
    setFilters(newFilters);

    if (submitOnChange) {
      submitFilters(newFilters);
    }
  };

  const onDateChange = (e, isStart: boolean) => {
    setFilterYears({
      start: isStart ? e.target.value : filterYears.start,
      end: isStart ? filterYears.end : e.target.value,
    });
  };

  const onDateSubmit = () => {
    submitFilters(filters, filterYears);
  };

  return (
    <>
      <DS.Heading level={2} id="filter-desktop-header">
        Refine Results
      </DS.Heading>
      <LanguageAccordion
        languages={languages}
        showCount={true}
        selectedLanguages={findFiltersForField(filters, "language")}
        onLanguageChange={(e, language) => {
          onLanguageChange(e, language);
        }}
      />
      <BookFormatInput
        selectedFormats={findFiltersForField(filters, "format")}
        onFormatChange={(e, format) => onBookFormatChange(e, format)}
      />
      <FilterYears
        dateFilters={filterYears}
        onDateChange={(e, isStart) => {
          onDateChange(e, isStart);
        }}
        onSubmit={
          submitOnChange
            ? () => {
                onDateSubmit();
              }
            : undefined
        }
      />
    </>
  );
};

export default Filters;
