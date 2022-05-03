import React, { useState } from "react";
import {
  Toggle,
  ToggleSizes,
  VStack,
} from "@nypl/design-system-react-components";
import LanguageAccordion from "../LanguageAccordion/LanguageAccordion";
import FilterBookFormat from "../FilterBookFormat/FilterBookFormat";
import FilterYears from "../FilterYears/FilterYears";
import { FacetItem } from "~/src/types/DataModel";
import { Filter } from "~/src/types/SearchQuery";
import {
  findFiltersExceptField,
  findFiltersForField,
} from "~/src/util/SearchQueryUtils";
import { errorMessagesText } from "~/src/constants/labels";
import filterFields from "~/src/constants/filters";

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
  isModal?: boolean;
  changeFilters: (newFilters?: Filter[]) => void;
  changeShowAll: (showAll: boolean) => void;
}> = ({
  filters: propFilters,
  showAll: propShowAll,
  languages,
  isModal,
  changeFilters,
  changeShowAll,
}) => {
  const [dateRangeError, setDateRangeError] = useState("");
  const [filters, setFilters] = useState(propFilters);
  const [showAll, setShowAll] = useState(propShowAll);

  const onLanguageChange = (e, language) => {
    const languageFilters = findFiltersForField(filters, filterFields.language);
    const newFilters = [
      ...findFiltersExceptField(filters, filterFields.language),
      ...(e.target.checked
        ? [
            ...languageFilters,
            { field: filterFields.language, value: language },
          ]
        : languageFilters.filter((filter) => {
            return filter.value !== language;
          })),
    ];
    setFilters(newFilters);
    changeFilters(newFilters);
  };

  const onBookFormatChange = (e, format) => {
    const formatFilters = findFiltersForField(filters, filterFields.format);
    const newFilters = [
      ...findFiltersExceptField(filters, filterFields.format),
      ...(e.target.checked
        ? [...formatFilters, { field: filterFields.format, value: format }]
        : formatFilters.filter((filter) => {
            return filter.value !== format;
          })),
    ];
    setFilters(newFilters);
    changeFilters(newFilters);
  };

  const onDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isStart: boolean
  ) => {
    const field = isStart ? filterFields.startYear : filterFields.endYear;
    const newFilters = [
      ...findFiltersExceptField(filters, field),
      ...[{ field: field, value: e.currentTarget.value }],
    ];
    setFilters(newFilters);
  };

  const removeEmptyFilters = (filters: Filter[]) => {
    return filters.filter((filter) => {
      return !!filter.value;
    });
  };

  const submitDateForm = () => {
    const startYear = findFiltersForField(filters, filterFields.startYear)[0];
    const endYear = findFiltersForField(filters, filterFields.endYear)[0];
    if (!startYear && !endYear) {
      setDateRangeError(errorMessagesText.emptySearch);
    }

    if (startYear && endYear && endYear.value < startYear.value) {
      setDateRangeError(errorMessagesText.invalidDate);
    } else {
      changeFilters(removeEmptyFilters(filters));
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

  const yearStart = findFiltersForField(filters, filterFields.startYear);
  const yearEnd = findFiltersForField(filters, filterFields.endYear);

  return (
    <VStack align="left" spacing="s">
      <Toggle
        labelText="Available Online"
        onChange={(e) => {
          toggleShowAll(e);
        }}
        isChecked={!showAll}
        size={ToggleSizes.Small}
        id={
          isModal ? "available-online-toggle-modal" : "available-online-toggle"
        }
      />
      <LanguageAccordion
        languages={languages}
        showCount={true}
        selectedLanguages={findFiltersForField(filters, filterFields.language)}
        isModal={isModal}
        onLanguageChange={(e, language) => {
          onLanguageChange(e, language);
        }}
      />
      <FilterBookFormat
        selectedFormats={findFiltersForField(filters, filterFields.format)}
        isModal={isModal}
        onFormatChange={(e, format) => onBookFormatChange(e, format)}
      />
      <FilterYears
        startFilter={yearStart && yearStart[0]}
        endFilter={yearEnd && yearEnd[0]}
        isModal={isModal}
        onDateChange={(
          e: React.ChangeEvent<HTMLInputElement>,
          isStart: boolean
        ) => {
          onDateChange(e, isStart);
        }}
        dateRangeError={dateRangeError}
        onSubmit={() => submitDateForm()}
      />
    </VStack>
  );
};

export default Filters;
