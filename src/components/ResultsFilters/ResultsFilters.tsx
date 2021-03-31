import React, { useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import LanguageAccordion from "../LanguageAccordion/LanguageAccordion";
import FilterBookFormat from "../FilterBookFormat/FilterBookFormat";
import FilterYears from "../FilterYears/FilterYears";
import { FacetItem } from "~/src/types/DataModel";
import { DateRange, Filter } from "~/src/types/SearchQuery";
import {
  findFiltersExceptField,
  findFiltersForField,
} from "~/src/util/SearchQueryUtils";
import { errorMessagesText } from "~/src/constants/labels";

/**
 * Shows a form with the Languages, Format and Year filters
 *
 *
 * submitOnChange: Toggles whether to automatically submit state changes
 */

const Filters: React.FC<{
  filters: Filter[];
  showAll: boolean;
  languages: FacetItem[];
  changeFilters: (newFilters?: Filter[], newYears?: DateRange) => void;
  changeShowAll: (showAll: boolean) => void;
}> = ({
  filters: propFilters,
  showAll: propShowAll,
  languages,
  changeFilters,
  changeShowAll,
}) => {
  const [dateRangeError, setDateRangeError] = useState("");
  const [filters, setFilters] = useState(propFilters);
  const [showAll, setShowAll] = useState(propShowAll);

  console.log("languages", languages);
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
    const field = isStart ? "startYear" : "endYear";
    const yearFilters = findFiltersForField(filters, field);

    const newFilters = [
      ...findFiltersExceptField(filters, field),
      ...(e.target.checked
        ? [...yearFilters, { field: field, value: e.target.value }]
        : yearFilters.filter((filter) => {
            return filter.value !== e.target.value;
          })),
    ];
    setFilters(newFilters);
  };

  const submitDateForm = () => {
    const startYear = findFiltersForField(filters, "startYear");
    const endYear = findFiltersForField(filters, "startYear");

    if (startYear && endYear && endYear[0] < startYear[0]) {
      setDateRangeError(errorMessagesText.invalidDate);
    } else {
      changeFilters(filters);
    }
  };

  /**
   * Toggles the "Show All" filter.
   * If we should show only what's available online,
   *  showAll=false and this checkbox is checked
   */

  const toggleShowAll = (e) => {
    setShowAll(!e.target.checked);
    changeShowAll(!e.target.checked);
  };

  const yearStart = findFiltersForField(filters, "yearStart");
  const yearEnd = findFiltersForField(filters, "yearEnd");

  return (
    <div className="results-filters">
      <DS.Checkbox
        checkboxId="avail_online"
        checked={!showAll}
        onChange={(e) => {
          toggleShowAll(e);
        }}
        labelOptions={{
          id: "avail_online_label",
          labelContent: <>Available Online</>,
        }}
        attributes={{ "aria-labelledby": "avail_online_label" }}
        name="avail_online"
      />
      <LanguageAccordion
        languages={languages}
        showCount={true}
        selectedLanguages={findFiltersForField(filters, "language")}
        onLanguageChange={(e, language) => {
          onLanguageChange(e, language);
        }}
      />
      <FilterBookFormat
        selectedFormats={findFiltersForField(filters, "format")}
        onFormatChange={(e, format) => onBookFormatChange(e, format)}
      />
      <FilterYears
        startFilter={yearStart && yearStart[0]}
        endFilter={yearEnd && yearEnd[0]}
        onDateChange={(e, isStart) => {
          onDateChange(e, isStart);
        }}
        dateRangeError={dateRangeError}
        onSubmit={() => submitDateForm()}
      />
    </div>
  );
};

export default Filters;
