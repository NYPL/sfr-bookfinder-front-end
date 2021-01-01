import React, { useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "~/src/stores/InitialState";
import { getQueryString } from "~/src/util/SearchQuery";
import {
  filtersLabels,
  formatTypes,
  errorMessagesText,
} from "~/src/constants/labels";
import { Filter } from "~/src/types/SearchQuery";

type OwnProps = {
  toggleMenu?: (...args: any[]) => any;
  isMobile?: boolean;
  data?: {
    [key: string]: any;
  };
  searchQuery?: searchQueryPropTypes;
  onFiltersChange: (...args: any[]) => any;
};

type State = {
  filters: Filters[];
  errorMsg: string;
  error: boolean;
  yearStart: string;
  yearEnd: string;
};

type FilterProps = {
  filters: Filters[]
}
const Filters2:React.FC<{props: FilterProps, state: any}> = (props:FilterProps) => {
  const [filters, setFilters] = useState(props.filters);

  filterAvailable()
  
  filterLanguage()

  filterFormat()

  filterDate()

  return (
    <div>
      <div>Available to Read</div>

      <div>Language</div>

      <div>Format</div>

      <div>DateRange</div>
    </div>
  );
};

class Filters extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      error: false,
      filters: props.filters,
      yearStart: "",
      yearEnd: "",
    };

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);

    this.isFilterChecked = this.isFilterChecked.bind(this);
    this.searchContains = this.searchContains.bind(this);
    this.joinFacetsAndsearch = this.joinFacetsAndsearch.bind(this);
  }

  componentDidMount() {
    const filters = this.props.searchQuery && this.props.searchQuery.filters;
    const filtersWithoutYear = filters
      ? filters.filter((fil: any) => fil.field !== "years")
      : [];
    const yearFilter = filters
      ? filters.find((fil: any) => fil.field === "years")
      : null;
    if (yearFilter) {
      this.setState({ yearStart: yearFilter.value.start });
      this.setState({ yearEnd: yearFilter.value.end });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters !== this.props.filters) {
      this.setState({ filters: this.props.filters });
    }
  }

  onChangeYear(e: any, yearType: any) {
    const val = e.target.value && Number(e.target.value);
    if (yearType === "start") {
      this.setState({ yearStart: val.toString() });
    } else {
      this.setState({ yearEnd: val.toString() });
    }
  }

  // on check of filter, add it or remove it from list and do the search
  onChangeCheckbox(e: any, field: any, value: any, negative: any) {
    const changedFilter: Filter = { field: field, value: value };

    if (this.state.error) {
      return;
    }
    console.log("filters", changedFilter);
    const matchIndex = this.state.filters.findIndex(
      (filter: any) => filter.field === field && filter.value === value
    );

    //if it is negative, unchecking it should add it to the filter array
    if (negative) {
      // if (!e.target.checked && matchIndex === -1) {
      //   this.setState(
      //     (prevState: any) => ({
      //       filtersArray: [...prevState.filtersArray, { field, value }],
      //     }),
      //     () => this.props.onFiltersChange(this.state.filters)
      //   );
      // } else if (matchIndex > -1) {
      //   this.setState(
      //     (prevState: any) => ({
      //       filtersArray: prevState.filtersArray.filter(
      //         (fil: any) => !(fil.field === field && fil.value === value)
      //       ),
      //     }),
      //     () => this.props.onFiltersChange(this.state.filters)
      //   );
      // }
    } else if (e.target.checked && matchIndex === -1) {
      const newFilters = [changedFilter, ...this.state.filters];
      this.props.onFiltersChange(newFilters);
    } else if (matchIndex > -1) {
      const newFilters = this.state.filters.filter((_, i) => i !== matchIndex);
      this.props.onFiltersChange(newFilters);
    }
  }

  onSubmit(e: any, toggleMenu: any, allowEmpty: any) {
    e.preventDefault();
    e.stopPropagation();

    if (
      this.state.yearStart &&
      this.state.yearEnd &&
      Number(this.state.yearStart) > Number(this.state.yearEnd)
    ) {
      this.setState({ error: true, errorMsg: errorMessagesText.invalidDate });
    } else if (!allowEmpty && !this.state.yearStart && !this.state.yearEnd) {
      this.setState({ error: true, errorMsg: errorMessagesText.emptySearch });
    } else {
      if (toggleMenu) {
        toggleMenu();
      }
      this.setState({ error: false, errorMsg: "" });

      this.props.onFiltersChange(this.state.filters);
    }
  }

  onErrorYears(errorObj: any) {
    this.setState({ error: errorObj.error, errorMsg: errorObj.errorMsg });
  }

  // join current data filters with filters from previous search
  joinFacetsAndsearch(facets: any, field: any) {
    const missingFacets: any = [];
    this.state.filters.forEach((previousFilter: any) => {
      const filterFound = facets.find(
        (facet: any) =>
          facet.value === previousFilter.value && previousFilter.field === field
      );
      if (!filterFound && previousFilter.field === field) {
        missingFacets.push({ value: previousFilter.value, count: 0 });
      }
    });
    return facets.concat(missingFacets);
  }

  // see if filter is checked in previous search
  isFilterChecked(field: any, value: any) {
    let filterFound;
    if (this.state.filters) {
      filterFound = this.state.filters.findIndex(
        (filter: any) => filter.field === field && filter.value === value
      );
    }
    return filterFound > -1;
  }

  // sort filters by: included in search, then count, then alphabetically
  prepareFilters(facets: any, field: any) {
    return this.joinFacetsAndsearch(facets, field).sort((a: any, b: any) => {
      if (
        !this.isFilterChecked(field, a.value) &&
        this.isFilterChecked(field, b.value)
      ) {
        return 1;
      }
      if (
        this.isFilterChecked(field, a.value) &&
        !this.isFilterChecked(field, b.value)
      ) {
        return -1;
      }
      if (a.count < b.count) {
        return 1;
      }
      if (a.count > b.count) {
        return -1;
      }
      return a.value < b.value ? -1 : 1;
    });
  }

  searchContains(field: any) {
    return (
      this.props.searchQuery &&
      this.props.searchQuery.filters &&
      this.props.searchQuery.filters.find(
        (filter: any) => filter.field === field
      )
    );
  }

  render() {
    const { data, toggleMenu, isMobile, searchQuery } = this.props;
    const start = this.state.yearStart;
    const end = this.state.yearEnd;

    const languageList = (
      <DS.List
        id="checkbox-list"
        type={DS.ListTypes.Unordered}
        modifiers={isMobile ? null : ["scroll"]}
      >
        {data.facets &&
          this.prepareFilters(data.facets.language, "language").map(
            (facet: any) => (
              <DS.Checkbox
                className="checkbox"
                labelClass="checkbox__label"
                inputClass="checkbox__input"
                checkboxId={`filters-${"language"}-${facet.value}`}
                isSelected={this.isFilterChecked("language", facet.value)}
                onChange={(e) =>
                  this.onChangeCheckbox(e, "language", facet.value, false)
                }
                labelOptions={{
                  id: `filters-${"language"}-${facet.value}-label`,

                  labelContent: (
                    <>
                      {facet.count > 0
                        ? `${facet.value} (${facet.count.toLocaleString()})`
                        : `${facet.value}`}
                    </>
                  ),
                }}
                name={`filters.${"language"}`}
                key={`filters-${"language"}-${facet.value}`}
              />
            )
          )}
      </DS.List>
    );

    if (Object.keys(filtersLabels).length > 0) {
      return (
        <form className="filters usa-form">
          {Object.keys(filtersLabels).map((field) => (
            <fieldset key={field} className="filters-box usa-fieldset">
              {/* {field === "years" && (
                <DS.DateRangeForm
                  formLabel={
                    <legend className="filters-box-header">
                      {filtersLabels[field]}
                    </legend>
                  }
                  fromLabelOpts={{ labelContent: <>From</>, id: "FromLabel" }}
                  fromInputOpts={{
                    inputId: "fromInput",
                    inputValue: start,
                    onInputChange: (event) => this.onChangeYear(event, "start"),
                  }}
                  fromHelper={{
                    content: <>EX. 1901</>,
                    id: "fromyearhelper",
                    isError: false,
                  }}
                  toLabelOpts={{ labelContent: <>To</>, id: "ToLabel" }}
                  toInputOpts={{
                    inputId: "toInput",
                    inputValue: end,
                    onInputChange: (event) => this.onChangeYear(event, "end"),
                  }}
                  toHelper={{
                    content: <>EX. 2000</>,
                    id: "toYearHelper",
                    isError: false,
                  }}
                  showError={this.state.error}
                  error={{
                    content: <div>{this.state.errorMsg}</div>,
                    id: "date-range-error",
                    isError: true,
                  }}
                  buttonOpts={
                    !isMobile
                      ? {
                          id: "submitButtonId",
                          callback: (event) =>
                            this.onSubmit(event, toggleMenu, true),

                          content: <>Apply</>,
                        }
                      : null
                  }
                />
              )} */}
              {field === "show_all" && (
                <>
                  <legend className="filters-box-header">
                    {filtersLabels[field]}
                  </legend>

                  <DS.Checkbox
                    checkboxId="show_all"
                    isSelected={!this.isFilterChecked(field, true)}
                    onChange={(e) =>
                      this.onChangeCheckbox(e, field, true, true)
                    }
                    labelOptions={{
                      id: "show_all_label",
                      labelContent: <>Available Online</>,
                    }}
                    name="show_all"
                  />
                </>
              )}
              {field === "language" && (
                <>
                  <legend className="filters-box-header">
                    {filtersLabels[field]}
                  </legend>

                  <DS.Accordion>{languageList}</DS.Accordion>
                </>
              )}
              {field === "format" && (
                <>
                  <legend className="filters-box-header">
                    {filtersLabels["format"]}
                  </legend>

                  {formatTypes.map((formatType: any) => (
                    <>
                      <DS.Checkbox
                        className="usa-checkbox tablet:grid-col-12"
                        checkboxId={`filters-${field}-${formatType.value}`}
                        isSelected={this.isFilterChecked(
                          field,
                          formatType.value
                        )}
                        onChange={(e) =>
                          this.onChangeCheckbox(
                            e,
                            field,
                            formatType.value,
                            false
                          )
                        }
                        labelOptions={{
                          id: `filters-${field}-${formatType.value}=label`,
                          labelContent: <>{formatType.label}</>,
                        }}
                        name={`filters.${field}`}
                        key={`facet-${field}-${formatType.value}`}
                      />
                    </>
                  ))}
                </>
              )}
            </fieldset>
          ))}
        </form>
      );
    }
    return null;
  }
}

export default Filters;
