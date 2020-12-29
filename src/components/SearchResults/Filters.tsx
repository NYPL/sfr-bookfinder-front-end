import React from "react";
import * as DS from "@nypl/design-system-react-components";
import {
  initialSearchQuery,
  searchQueryPropTypes,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/stores/InitialState' or ... Remove this comment to see the full error message
} from "~/src/stores/InitialState";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/SearchQuery' or its... Remove this comment to see the full error message
import { getQueryString } from "~/src/util/SearchQuery";
import {
  filtersLabels,
  formatTypes,
  errorMessagesText,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/labels' or its... Remove this comment to see the full error message
} from "~/src/constants/labels";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/actions/SearchActions' o... Remove this comment to see the full error message
import * as searchActions from "~/src/actions/SearchActions";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/sorts' or its ... Remove this comment to see the full error message
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { deepEqual } from "~/src/util/Util";
import Router from "next/router";

type OwnProps = {
  toggleMenu?: (...args: any[]) => any;
  isMobile?: boolean;
  data?: {
    [key: string]: any;
  };
  searchQuery?: searchQueryPropTypes;
  router?: {
    [key: string]: any;
  };
  onChangeSort?: (...args: any[]) => any;
  onChangePerPage?: (...args: any[]) => any;
};

type State = any;

type Props = OwnProps & typeof Filters.defaultProps;

class Filters extends React.Component<Props, State> {
  static defaultProps = {
    toggleMenu: () => {},
    isMobile: false,
    data: {},
    searchQuery: initialSearchQuery,
    router: {},
    onChangeSort: () => {},
    onChangePerPage: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      errorMsg: "",
      error: false,
      filtersArray: [],
      yearStart: "",
      yearEnd: "",
    };

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);

    this.isFilterChecked = this.isFilterChecked.bind(this);
    this.searchContains = this.searchContains.bind(this);
    this.joinFacetsAndsearch = this.joinFacetsAndsearch.bind(this);
    this.doSearchWithFilters = this.doSearchWithFilters.bind(this);
  }

  componentDidMount() {
    const filters = this.props.searchQuery && this.props.searchQuery.filters;
    const filtersWithoutYear = filters
      ? filters.filter((fil: any) => fil.field !== "years")
      : [];
    const yearFilter = filters
      ? filters.find((fil: any) => fil.field === "years")
      : null;
    this.setState({ filtersArray: filtersWithoutYear });
    if (yearFilter) {
      this.setState({ yearStart: yearFilter.value.start });
      this.setState({ yearEnd: yearFilter.value.end });
    }
  }

  onChangeYear(e: any, yearType: any) {
    const val = e.target.value && Number(e.target.value);
    if (yearType === "start") {
      this.setState({ yearStart: val });
    } else {
      this.setState({ yearEnd: val });
    }
  }

  // on check of filter, add it or remove it from list and do the search
  onChangeCheckbox(e: any, field: any, value: any, negative: any) {
    if (this.state.error) {
      return;
    }

    const matchIndex = this.state.filtersArray.findIndex(
      (filter: any) => filter.field === field && filter.value === value
    );
    if (negative) {
      if (!e.target.checked && matchIndex === -1) {
        this.setState(
          (prevState: any) => ({
            filtersArray: [...prevState.filtersArray, { field, value }],
          }),
          () => this.doSearchWithFilters()
        );
      } else if (matchIndex > -1) {
        this.setState(
          (prevState: any) => ({
            filtersArray: prevState.filtersArray.filter(
              (fil: any) => !(fil.field === field && fil.value === value)
            ),
          }),
          () => this.doSearchWithFilters()
        );
      }
    } else if (e.target.checked && matchIndex === -1) {
      this.setState(
        (prevState: any) => ({
          filtersArray: [...prevState.filtersArray, { field, value }],
        }),
        () => this.doSearchWithFilters()
      );
    } else if (matchIndex > -1) {
      this.setState(
        (prevState: any) => ({
          filtersArray: prevState.filtersArray.filter(
            (fil: any) => !(fil.field === field && fil.value === value)
          ),
        }),
        () => this.doSearchWithFilters()
      );
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

      this.doSearchWithFilters();
    }
  }

  onErrorYears(errorObj: any) {
    this.setState({ error: errorObj.error, errorMsg: errorObj.errorMsg });
  }

  // join current data filters with filters from previous search
  joinFacetsAndsearch(facets: any, field: any) {
    const missingFacets: any = [];
    this.state.filtersArray.forEach((previousFilter: any) => {
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

  // redirect to url with query params
  submit(query: any) {
    const path = `/search?${getQueryString(query)}`;
    Router.push(path);
  }

  // update page in store and go to any page
  doSearchWithFilters() {
    let filters = [];
    filters = this.state.filtersArray ? this.state.filtersArray : [];

    // Combine year and filtersArray states
    if (this.state.yearStart || this.state.yearEnd) {
      const start = this.state.yearStart ? this.state.yearStart : null;
      const end = this.state.yearEnd ? this.state.yearEnd : null;
      const filterValue = { start, end };
      filters = [...filters, { field: "years", value: filterValue }];
    }

    const newQuery = Object.assign(
      {},
      this.props.searchQuery,
      { filters },
      { page: 0 }
    );

    searchActions.userQuery(newQuery);
    this.submit(newQuery);
  }

  // see if filter is checked in previous search
  isFilterChecked(field: any, value: any) {
    let filterFound;
    if (this.state.filtersArray) {
      filterFound = this.state.filtersArray.find(
        (filter: any) => filter.field === field && filter.value === value
      );
    }
    return !!filterFound;
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
    const {
      data,
      toggleMenu,
      isMobile,
      searchQuery,
      onChangeSort,
      onChangePerPage,
    } = this.props;
    const start = this.state.yearStart;
    const end = this.state.yearEnd;

    const filtersHeader = isMobile ? (
      <div className="search-navigation">
        <DS.Button
          id="gobackButton"
          type="button"
          buttonType={DS.ButtonTypes.Link}
          iconPosition={DS.ButtonIconPositions.Left}
          iconRotation={DS.IconRotationTypes.rotate90}
          iconName="arrow_xsmall"
          iconModifiers={["left"]}
          iconDecorative
          callback={(event) => this.onSubmit(event, toggleMenu, true)}
        >
          <span>Go Back</span>
        </DS.Button>

        <DS.Button
          id="closeButton"
          type="submit"
          callback={(event) => this.onSubmit(event, toggleMenu, true)}
        >
          Show Results
        </DS.Button>
      </div>
    ) : (
      <DS.Heading level={2} id="filter-desktop-header">
        Refine Results
      </DS.Heading>
    );

    const languageList = (
      <DS.UnorderedList
        id="checkbox-list"
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[] | null' is not assignable to type '... Remove this comment to see the full error message
        modifiers={isMobile ? null : ["scroll"]}
      >
        {data.facets &&
          this.prepareFilters(data.facets.language, "language").map(
            (facet: any) => (
              <DS.Checkbox
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; labelClass: string; inp... Remove this comment to see the full error message
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
      </DS.UnorderedList>
    );

    if (Object.keys(filtersLabels).length > 0) {
      return (
        <form className="filters usa-form">
          {filtersHeader}
          {isMobile && (
            <div className="search-dropdowns__mobile">
              <DS.Dropdown
                dropdownId="items-per-page-select"
                isRequired={false}
                labelPosition="left"
                labelText="Items Per Page"
                labelId="nav-items-per-page"
                selectedOption={
                  searchQuery.per_page ? searchQuery.per_page : undefined
                }
                dropdownOptions={numbersPerPage.map((number: any) =>
                  number.toString()
                )}
                onSelectChange={onChangePerPage}
                onSelectBlur={onChangePerPage}
              />

              <DS.Dropdown
                dropdownId="sort-by-select"
                isRequired={false}
                labelPosition="left"
                labelText="Sort By"
                labelId="nav-sort-by"
                selectedOption={
                  searchQuery.sort
                    ? Object.keys(sortMap).find((key) =>
                        deepEqual(sortMap[key], searchQuery.sort)
                      )
                    : undefined
                }
                dropdownOptions={Object.keys(sortMap).map(
                  (sortOption) => sortOption
                )}
                onSelectChange={onChangeSort}
                onSelectBlur={onChangeSort}
              />
            </div>
          )}
          {Object.keys(filtersLabels).map((field) => (
            <fieldset key={field} className="filters-box usa-fieldset">
              {field === "years" && (
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
                  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; callback: (event: MouseEvent<E... Remove this comment to see the full error message
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
              )}
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

                  <DS.Accordion
                    buttonOptions={{
                      id: "accordionBtn",
                      content: <span>Click to expand</span>,
                    }}
                  >
                    {languageList}
                  </DS.Accordion>
                </>
              )}
              {field === "format" && (
                <>
                  <legend className="filters-box-header">
                    {filtersLabels[field]}
                  </legend>

                  {formatTypes.map((formatType: any) => (
                    <>
                      <DS.Checkbox
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; labelClass: string; inp... Remove this comment to see the full error message
                        className="usa-checkbox tablet:grid-col-12"
                        labelClass="usa-checkbox__label"
                        inputClass="usa-checkbox__input"
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
