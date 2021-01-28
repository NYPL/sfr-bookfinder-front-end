import React from "react";
import * as DS from "@nypl/design-system-react-components";

import { DateRange } from "~/src/types/SearchQuery";

/**
 * Year Filters
 * Can be passed as a form or as a fieldset
 *
 *
 * @param props
 */
const FilterYears: React.FC<{
  dateFilters: DateRange;
  onDateChange: (e, isStart: boolean) => void;
  // The date range error to show.
  // If no error should be shown, this should be an empty string
  dateRangeError?: string;
  onSubmit?: () => void;
}> = (props) => {
  const { dateFilters, onDateChange, dateRangeError, onSubmit } = props;

  const changeDate = (e, isStart: boolean) => {
    onDateChange(e, isStart);
  };

  // FilterYears can either be a form on its own (widescreen sidebar) or it can be a part of a larger form (advanced search)
  // If it is a part of a larger form, error checking should happen on form submit, and the error should appear at the top of the form rather than
  // next to the FilterYears inputs
  if (dateRangeError && !onSubmit) {
    console.warn(
      "Found a dateRangeError but no onSubmit.  Errors should be shown at the top of the form when this is used as a fieldset."
    );
  }

  return (
    <fieldset>
      <legend className="usa-legend font-sans-lg sub-legend">
        Publication Year
      </legend>
      <DS.Label id="date-from-label" htmlFor="date-filter-from">
        From
      </DS.Label>
      <DS.Input
        type={DS.InputTypes.number}
        id="date-filter-from"
        value={dateFilters && dateFilters.start ? dateFilters.start : ""}
        onChange={(e) => changeDate(e, true)}
      />
      <DS.HelperErrorText isError={false}> EX. 1901 </DS.HelperErrorText>
      <DS.Label id="date-to-label" htmlFor="date-filter-to">
        To
      </DS.Label>
      <DS.Input
        type={DS.InputTypes.number}
        id="date-filter-to"
        value={dateFilters && dateFilters.end > 0 ? dateFilters.end : ""}
        onChange={(e) => changeDate(e, false)}
      />
      <DS.HelperErrorText isError={false}> EX. 2000 </DS.HelperErrorText>
      {dateRangeError && (
        <DS.HelperErrorText isError={true}>{dateRangeError}</DS.HelperErrorText>
      )}
      {onSubmit && (
        <DS.Button
          id="year-filter-button"
          type="button"
          onClick={() => onSubmit()}
        >
          Apply
        </DS.Button>
      )}
    </fieldset>
  );
};

export default FilterYears;