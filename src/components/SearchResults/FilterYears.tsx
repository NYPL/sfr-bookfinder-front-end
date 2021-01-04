import React from "react";
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "../../stores/InitialState";
import TextInput from "../Form/TextInput";
import * as DS from "@nypl/design-system-react-components";

import { yearsType, errorMessagesText } from "../../constants/labels";
import { DateRange, Filter } from "~/src/types/SearchQuery";

const FilterYears: React.FC<{ yearFilters: Filter[] }> = (props) => {
  const years: DateRange =
    typeof props.yearFilters[0].value !== string
      ? props.yearFilters[0].value
      : undefined;
  return (
    <fieldset>
      <DS.Label id="date-from-label" htmlFor="date-filter-from">
        From
      </DS.Label>
      <DS.Input
        type={DS.InputTypes.number}
        id="date-filter-from"
        defaultValue={props.years ? props.years.value.start : undefined}
      />
      <DS.HelperErrorText isError={false}> EX. 1901 </DS.HelperErrorText>
      <DS.Label id="date-to-label" htmlFor="date-filter-to">
        To
      </DS.Label>
      <DS.Input
        type={DS.InputTypes.number}
        id="date-filter-to"
        defaultValue={props.years ? props.years.value.end : undefined}
      />
      <DS.HelperErrorText isError={false}> EX. 2000 </DS.HelperErrorText>
    </fieldset>
  );
};

export default FilterYears;
