import React from "react";
import {
  FullDateType,
  DatePicker,
  DatePickerTypes,
  Button,
} from "@nypl/design-system-react-components";

import { Filter } from "~/src/types/SearchQuery";

/**
 * Year Filters
 * Can be passed as a form or as a fieldset
 *
 *
 * @param props
 */
const FilterYears: React.FC<{
  startFilter: Filter;
  endFilter: Filter;
  onDateChange: (e: FullDateType) => void;
  // The date range error to show.
  // If no error should be shown, this should be an empty string
  dateRangeError?: string;
  onSubmit?: () => void;
}> = (props) => {
  const { startFilter, endFilter, onDateChange, dateRangeError, onSubmit } =
    props;

  const changeDate = (e: FullDateType) => {
    onDateChange(e);
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
    // <fieldset className="date-range">
    //   <legend>Publication Year</legend>
    //   <div className="year-input-group">
    //     <div className="year-input">
    //       <Label id="date-from-label" htmlFor="date-filter-from">
    //         From
    //       </Label>
    //       <Input
    //         type={TextInputTypes.number}
    //         id="date-filter-from"
    //         attributes={{ "aria-labelledby": "date-from-label" }}
    //         value={startFilter ? startFilter.value : ""}
    //         onChange={(e) => changeDate(true, e)}
    //       />
    //       <HelperErrorText isError={false}> EX. 1901 </HelperErrorText>
    //     </div>
    //     <div className="year-input">
    //       <Label id="date-to-label" htmlFor="date-filter-to">
    //         To
    //       </Label>
    //       <Input
    //         attributes={{ "aria-labelledby": "date-to-label" }}
    //         type={TextInputTypes.number}
    //         id="date-filter-to"
    //         value={endFilter ? endFilter.value : ""}
    //         onChange={(e) => changeDate(false, e)}
    //       />
    //       <HelperErrorText isError={false}> EX. 2000 </HelperErrorText>
    //     </div>
    //   </div>
    //   {dateRangeError && (
    //     <HelperErrorText isError={true}>{dateRangeError}</HelperErrorText>
    //   )}
    //   {onSubmit && (
    //     <Button
    //       id="year-filter-button"
    //       type="button"
    //       onClick={() => onSubmit()}
    //     >
    //       Apply
    //     </Button>
    //   )}
    // </fieldset>
    <>
      <DatePicker
        dateFormat="yyyy"
        dateType={DatePickerTypes.Year}
        labelText="Publication Year"
        nameFrom="pub-year-from"
        nameTo="pub-year-to"
        invalidText={dateRangeError}
        showOptReqLabel={false}
        initialDate={startFilter ? startFilter.value.toString() : ""}
        initialDateTo={endFilter ? endFilter.value.toString() : ""}
        onChange={(e: FullDateType) => {
          changeDate(e);
        }}
        isDateRange
      />
      {onSubmit && (
        <Button id="year-filter-button" onClick={() => onSubmit()}>
          Apply
        </Button>
      )}
    </>
  );
};

export default FilterYears;
