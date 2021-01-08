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
  onDateChange: (e, isStart: boolean) => void;
  onSubmit?: () => void;
}> = (props) => {
  const { dateFilters, onDateChange, onSubmit } = props;

  const changeDate = (e, isStart: boolean) => {
    onDateChange(e, isStart);
  };

  const submit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <ConditionalFormWrapper
      condition={!!onSubmit}
      submitCallback={(e) => submit(e)}
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
          value={dateFilters.start > 0 ? dateFilters.start : ""}
          onChange={(e) => changeDate(e, true)}
        />
        <DS.HelperErrorText isError={false}> EX. 1901 </DS.HelperErrorText>
        <DS.Label id="date-to-label" htmlFor="date-filter-to">
          To
        </DS.Label>
        <DS.Input
          type={DS.InputTypes.number}
          id="date-filter-to"
          value={dateFilters.end > 0 ? dateFilters.end : ""}
          onChange={(e) => changeDate(e, false)}
        />
        <DS.HelperErrorText isError={false}> EX. 2000 </DS.HelperErrorText>
      </fieldset>
    </ConditionalFormWrapper>
  );
};

export default FilterYears;
