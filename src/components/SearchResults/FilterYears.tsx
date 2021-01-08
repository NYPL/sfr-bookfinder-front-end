import React, { useState } from "react";
import {
  initialApiSearchQuery,
  searchQueryPropTypes,
} from "../../stores/InitialState";
import TextInput from "../Form/TextInput";
import * as DS from "@nypl/design-system-react-components";

import { yearsType, errorMessagesText } from "../../constants/labels";
import { DateRange, Filter } from "~/src/types/SearchQuery";

const ConditionalFormWrapper: React.FC<{
  condition: boolean;
  submitCallback: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ condition, submitCallback, children }) => {
  if (condition) {
    return (
      <form onSubmit={submitCallback}>
        {children}
        <DS.Button id="year-filter-button" type="submit">
          Apply
        </DS.Button>
      </form>
    );
  }
  return <>{children}</>;
};

const FilterYears: React.FC<{
  dateFilters: DateRange;
  submitHandler?: (yearFilters: Filter[]) => void;
}> = (props) => {
  console.log("props", props);
  const [dateRange, setDateRange] = useState(props.dateFilters);

  const onDateChange = (e, dateType: "start" | "end") => {
    console.log("date changed ", dateType, e.target.value);
    console.log("current date range", dateRange);
    setDateRange({
      start: dateType === "start" ? e.target.value : dateRange.start,
      end: dateType === "start" ? dateRange.end : e.target.value,
    });
  };

  const onSubmit = () => {
    if (!props.submitHandler) {
      throw new Error("Cannot call submit on Year Filter without a handler");
    }
    props.submitHandler([
      { field: "yearStart", value: dateRange.start },
      { field: "yearEnd", value: dateRange.end },
    ]);
  };

  return (
    <ConditionalFormWrapper
      condition={!!props.submitHandler}
      submitCallback={onSubmit}
    >
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
          value={dateRange.start > 0 ? dateRange.start : ""}
          onChange={(e) => onDateChange(e, "start")}
        />
        <DS.HelperErrorText isError={false}> EX. 1901 </DS.HelperErrorText>
        <DS.Label id="date-to-label" htmlFor="date-filter-to">
          To
        </DS.Label>
        <DS.Input
          type={DS.InputTypes.number}
          id="date-filter-to"
          value={dateRange.end > 0 ? dateRange.end : ""}
          onChange={(e) => onDateChange(e, "end")}
        />
        <DS.HelperErrorText isError={false}> EX. 2000 </DS.HelperErrorText>
      </fieldset>
    </ConditionalFormWrapper>
  );
};

export default FilterYears;
