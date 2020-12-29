import React from "react";
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "../../stores/InitialState";
import TextInput from "../Form/TextInput";

import { yearsType, errorMessagesText } from "../../constants/labels";

const getYearsFilter = (searchQuery: any) => {
  const yearsValues = {};
  Object.keys(yearsType).forEach((yearType) => {
    const yearValue =
      searchQuery &&
      searchQuery.filters &&
      searchQuery.filters.find((filter: any) => filter.field === "years");
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    yearsValues[yearType] =
      yearValue && yearValue.value[yearType]
        ? Number(yearValue.value[yearType])
        : "";
  });
  return yearsValues;
};

type OwnFilterYearsProps = {
  searchQuery?: searchQueryPropTypes;
  onChange?: (...args: any[]) => any;
  onError?: (...args: any[]) => any;
  inputClassName?: string;
  className?: string;
};

type FilterYearsState = any;

type FilterYearsProps = OwnFilterYearsProps & typeof FilterYears.defaultProps;

class FilterYears extends React.Component<FilterYearsProps, FilterYearsState> {
  static defaultProps = {
    searchQuery: initialSearchQuery,
    onChange: () => {},
    onError: () => {},
    inputClassName: "tablet:grid-col padding-right-0 padding-top-2",
    className: "grid-row grid-gap",
  };

  constructor(props: FilterYearsProps) {
    super(props);
    this.state = {
      ...getYearsFilter(props.searchQuery),
      ...{ errorMessage: {}, error: {} },
    };
    this.onChangeYear = this.onChangeYear.bind(this);
  }

  componentWillReceiveProps(nextProps: FilterYearsProps) {
    this.setState((prevState: any) => ({
      ...getYearsFilter(nextProps.searchQuery),
      ...prevState,
    }));
  }

  onChangeYear(e: any, yearType: any) {
    const val = e.target.value && Number(e.target.value);
    // TODO: errors control UI
    const obj = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    obj[yearType] = val;
    this.setState((state: any) => Object.assign({}, state, obj));
    this.props.onChange({
      ...{ start: this.state.start, end: this.state.end },
      ...obj,
    });
  }

  onBlur(e: any, yearType: any) {
    const val = e.target.value && Number(e.target.value);
    const errorMessage = {};
    const error = {};
    const errorMessageText = errorMessagesText.invalidDate;
    if (yearType === "start") {
      if (this.state.end && val && val > Number(this.state.end)) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        errorMessage[yearType] = errorMessageText;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[yearType] = true;
      } else {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        errorMessage[yearType] = "";
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[yearType] = false;
      }
    } else if (yearType === "end") {
      if (this.state.start && val && val < Number(this.state.start)) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        errorMessage[yearType] = errorMessageText;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[yearType] = true;
      } else {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        errorMessage[yearType] = "";
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[yearType] = false;
      }
    }
    this.setState({ errorMessage, error });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type '{}'.
    if (!error.end && !error.start) {
      this.props.onError({ errorMsg: "", error: false });
    } else {
      this.props.onError({ errorMsg: errorMessageText, error: true });
    }
  }

  render() {
    return (
      <div className="grid-container padding-0">
        <div className={this.props.className}>
          {Object.keys(yearsType).map((yearType) => (
            <TextInput
              className={this.props.inputClassName}
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              ariaLabel={`Search for ${yearsType[yearType]} date`}
              labelClass=""
              id={`filters.years.${yearType}`}
              key={`filters.years.${yearType}`}
              type="number"
              inputClass={
                this.state.error[yearType]
                  ? "usa-input usa-input--error"
                  : "usa-input"
              }
              name={`filters.years.${yearType}`}
              onChange={(e: any) => this.onChangeYear(e, yearType)}
              onBlur={(e: any) => this.onBlur(e, yearType)}
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              label={yearsType[yearType]}
              value={this.state[yearType]}
              // errorMessage={this.state.errorMessage[yearType]}
              // max={yearType === 'start' ? this.state.end : null}
              // min={yearType === 'end' ? this.state.start : null}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default FilterYears;
