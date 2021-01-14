import React, { useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import LanguageAccordion from "../LanguageAccordion/LanguageAccordion";
import FitlerBookFormat from "../FilterBookFormat/FilterBookFormat";
import FilterYears from "../FilterYears/FilterYears";
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
  showAll: boolean;
  languages: FacetItem[];
  changeFilters: (newFilters?: Filter[], newYears?: DateRange) => void;
  changeShowAll: (showAll: boolean) => void;
}> = ({
  filters: propFilters,
  filterYears: propFilterYears,
  showAll: propShowAll,
  languages,
  changeFilters,
  changeShowAll,
}) => {
  const [filters, setFilters] = useState(propFilters);
  const [filterYears, setFilterYears] = useState(propFilterYears);
  const [showAll, setShowAll] = useState(propShowAll);

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
    changeFilters(newFilters);
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
    changeFilters(newFilters);
  };

  const onDateChange = (e, isStart: boolean) => {
    setFilterYears({
      start: isStart ? e.target.value : filterYears.start,
      end: isStart ? filterYears.end : e.target.value,
    });
  };

  const submitDateForm = () => {
    changeFilters(null, filterYears);
  };

  /**
   * Toggles the "Show All" filter.
   * If we should show only what's available online,
   *  showAll=false and this checkbox is checked
   */

  const toggleShowAll = (e) => {
    console.log("show all", e.target.checked);
    setShowAll(!e.target.checked);
    changeShowAll(!e.target.checked);
  };

  return (
    <>
      <DS.Checkbox
        checkboxId="show_all"
        checked={!showAll}
        onChange={(e) => {
          toggleShowAll(e);
        }}
        labelOptions={{
          id: "show_all_label",
          labelContent: <>Available Online</>,
        }}
        name="show_all"
      />
      <LanguageAccordion
        languages={languages}
        showCount={true}
        selectedLanguages={findFiltersForField(filters, "language")}
        onLanguageChange={(e, language) => {
          onLanguageChange(e, language);
        }}
      />
      <FitlerBookFormat
        selectedFormats={findFiltersForField(filters, "format")}
        onFormatChange={(e, format) => onBookFormatChange(e, format)}
      />
      <FilterYears
        dateFilters={filterYears}
        onDateChange={(e, isStart) => {
          onDateChange(e, isStart);
        }}
        onSubmit={() => submitDateForm()}
      />
    </>
  );
};

export default Filters;
