import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { ButtonTypes, ButtonIconPositions } from '@nypl/design-system-react-components/lib/components/01-atoms/Button/ButtonTypes';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import { filtersLabels, formatTypes, errorMessagesText } from '../../constants/labels';
import * as searchActions from '../../actions/SearchActions';
import { sortMap, numbersPerPage } from '../../constants/sorts';
import { deepEqual } from '../../util/Util';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '', error: false, filtersArray: [], yearStart: '', yearEnd: '',
    };

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);

    this.isFilterChecked = this.isFilterChecked.bind(this);
    this.searchContains = this.searchContains.bind(this);
    this.showFields = this.showFields.bind(this);
    this.joinFacetsAndsearch = this.joinFacetsAndsearch.bind(this);
    this.doSearchWithFilters = this.doSearchWithFilters.bind(this);
  }

  componentDidMount() {
    const filters = this.props.searchQuery && this.props.searchQuery.filters;
    const filtersWithoutYear = filters ? filters.filter(fil => fil.field !== 'years') : [];
    const yearFilter = filters ? filters.find(fil => fil.field === 'years') : null;
    this.setState({ filtersArray: filtersWithoutYear });
    if (yearFilter) {
      this.setState({ yearStart: yearFilter.value.start });
      this.setState({ yearEnd: yearFilter.value.end });
    }
  }

  onChangeYear(e, yearType) {
    const val = e.target.value && Number(e.target.value);
    if (yearType === 'start') {
      this.setState({ yearStart: val });
    } else {
      this.setState({ yearEnd: val });
    }
  }

  // on check of filter, add it or remove it from list and do the search
  onChangeCheckbox(e, field, value, negative) {
    if (this.state.error) {
      return;
    }

    const matchIndex = this.state.filtersArray.findIndex(filter => filter.field === field && filter.value === value);
    if (negative) {
      if (!e.target.checked && matchIndex === -1) {
        this.setState(prevState => ({ filtersArray: [...prevState.filtersArray, { field, value }] }),
          () => this.doSearchWithFilters());
      } else if (matchIndex > -1) {
        this.setState(prevState => ({
          filtersArray: prevState.filtersArray.filter(fil => !(fil.field === field && fil.value === value)),
        }),
        () => this.doSearchWithFilters());
      }
    } else if (e.target.checked && matchIndex === -1) {
      this.setState(prevState => ({ filtersArray: [...prevState.filtersArray, { field, value }] }),
        () => this.doSearchWithFilters());
    } else if (matchIndex > -1) {
      this.setState(prevState => ({ filtersArray: prevState.filtersArray.filter(fil => !(fil.field === field && fil.value === value)) }),
        () => this.doSearchWithFilters());
    }
  }

  onSubmit(e, toggleMenu, allowEmpty) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.yearStart && this.state.yearEnd && Number(this.state.yearStart) > Number(this.state.yearEnd)) {
      this.setState({ error: true, errorMsg: errorMessagesText.invalidDate });
    } else if (!allowEmpty && !this.state.yearStart && !this.state.yearEnd) {
      console.log('hello');
      this.setState({ error: true, errorMsg: errorMessagesText.emptySearch });
    } else {
      if (toggleMenu) {
        toggleMenu();
      }
      this.setState({ error: false, errorMsg: '' });

      this.doSearchWithFilters();
    }
  }

  onErrorYears(errorObj) {
    this.setState({ error: errorObj.error, errorMsg: errorObj.errorMsg });
  }

  // join current data filters with filters from previous search
  joinFacetsAndsearch(facets, field) {
    const missingFacets = [];
    this.state.filtersArray.forEach((previousFilter) => {
      const filterFound = facets.find(facet => facet.value === previousFilter.value && previousFilter.field === field);
      if (!filterFound && previousFilter.field === field) {
        missingFacets.push({ value: previousFilter.value, count: 0 });
      }
    });
    return facets.concat(missingFacets);
  }

  // redirect to url with query params
  submit(query) {
    const path = `/search?${getQueryString(query)}`;
    this.props.router.push(path);
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
      filters = [...filters, { field: 'years', value: filterValue }];
    }

    const newQuery = Object.assign({}, this.props.searchQuery, { filters }, { page: 0 });

    searchActions.userQuery(newQuery);
    this.submit(newQuery);
  }

  // see if filter is checked in previous search
  isFilterChecked(field, value) {
    let filterFound;
    if (this.state.filtersArray) {
      filterFound = this.state.filtersArray.find(filter => filter.field === field && filter.value === value);
    }
    return !!filterFound;
  }

  // sort filters by: included in search, then count, then alphabetically
  prepareFilters(facets, field) {
    return this.joinFacetsAndsearch(facets, field)
      .sort((a, b) => {
        if (!this.isFilterChecked(field, a.value) && this.isFilterChecked(field, b.value)) {
          return 1;
        }
        if (this.isFilterChecked(field, a.value) && !this.isFilterChecked(field, b.value)) {
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

  searchContains(field) {
    return this.props.searchQuery && this.props.searchQuery.filters
      && this.props.searchQuery.filters.find(filter => filter.field === field);
  }

  showFields(data) {
    return Object.keys(filtersLabels)
      .map(field => ((data.facets && data.facets[field] && data.facets[field].length > 0)
        || this.searchContains(field)
        || (field === 'years' && (this.searchContains(field) || (data.works && data.works.length > 0)))
        || field === 'show_all'
        || (field === 'format' && (this.searchContains(field) || (data.works && data.works.length > 0)))
        ? field
        : null))
      .filter(x => x);
  }

  render() {
    const {
      data, toggleMenu, isMobile, searchQuery, onChangeSort, onChangePerPage,
    } = this.props;
    const start = this.state.yearStart;
    const end = this.state.yearEnd;

    const filtersHeader = isMobile
      ? (
        <div className="search-navigation">
          <DS.Button
            id="gobackButton"
            buttonType={ButtonTypes.Link}
            iconPosition={ButtonIconPositions.Left}
            iconName="arrow-xsmall"
            iconModifiers={['left']}
            callback={event => this.onSubmit(event, toggleMenu, true)}
          >
            Go Back
          </DS.Button>
          <DS.Button
            id="closeButton"
            type="submit"
            callback={event => this.onSubmit(event, toggleMenu, true)}
          >
          Show Results
          </DS.Button>
        </div>
      ) : (
        <DS.Heading
          level={2}
          id="filter-desktop-header"
        >
          Refine Results
        </DS.Heading>
      );

    const languageList = (
      <DS.UnorderedList
        id="checkbox-list"
        modifiers={isMobile ? null : ['scroll']}
      >
        {data.facets && this.prepareFilters(data.facets.language, 'language').map(facet => (
          <DS.Checkbox
            className="checkbox"
            labelClass="checkbox__label"
            inputClass="checkbox__input"
            checkboxId={`filters-${'language'}-${facet.value}`}
            isSelected={this.isFilterChecked('language', facet.value)}
            onChange={e => this.onChangeCheckbox(e, 'language', facet.value, false)}
            labelOptions={{
              id: `filters-${'language'}-${facet.value}-label`,
              labelContent: <>
                {facet.count > 0
                  ? `${facet.value} (${facet.count.toLocaleString()})` : `${facet.value}`}
                            </>,
            }}
            name={`filters.${'language'}`}
            key={`filters-${'language'}-${facet.value}`}
          />
        ))}
      </DS.UnorderedList>
    );

    if (this.showFields(data).length > 0) {
      return (
        <form
          className="filters usa-form"
        >
          {filtersHeader}
          {isMobile && (
          <div className="search-dropdowns">
            <DS.Dropdown
              dropdownId="items-per-page-select"
              isRequired={false}
              labelPosition="left"
              labelText="Items Per Page"
              labelId="nav-items-per-page"
              selectedOption={searchQuery.per_page ? searchQuery.per_page : undefined}
              dropdownOptions={numbersPerPage.map(number => number.toString())}
              onSelectChange={onChangePerPage}
              onSelectBlur={onChangePerPage}
            />
            <DS.Dropdown
              dropdownId="sort-by-select"
              isRequired={false}
              labelPosition="left"
              labelText="Sort By"
              labelId="nav-sort-by"
              selectedOption={searchQuery.sort
                ? Object.keys(sortMap).find(key => deepEqual(sortMap[key], searchQuery.sort)) : undefined}
              dropdownOptions={Object.keys(sortMap).map(sortOption => sortOption)}
              onSelectChange={onChangeSort}
              onSelectBlur={onChangeSort}
            />
          </div>
          )}
          {this.showFields(data).map(field => (
            <fieldset
              key={field}
              className="filters-box usa-fieldset"
            >
              {field === 'years' && (
                <DS.DateRangeForm
                  formLabel={<legend className="filters-box-header">{filtersLabels[field]}</legend>}

                  fromLabelOpts={{ labelContent: <>From</>, id: 'FromLabel' }}
                  fromInputOpts={{
                    inputId: 'fromInput', inputValue: start, onInputChange: event => this.onChangeYear(event, 'start'),
                  }}
                  fromHelper={{ content: <>EX. 1901</>, id: 'fromyearhelper', isError: false }}

                  toLabelOpts={{ labelContent: <>To</>, id: 'ToLabel' }}
                  toInputOpts={{ inputId: 'toInput', inputValue: end, onInputChange: event => this.onChangeYear(event, 'end') }}
                  toHelper={{ content: <>EX. 2000</>, id: 'toYearHelper', isError: false }}

                  showError={this.state.error}
                  error={{ content: <div>{this.state.errorMsg}</div>, id: 'date-range-error', isError: true }}

                  buttonOpts={!isMobile
                    ? {
                      id: 'submitButtonId',
                      callback: event => this.onSubmit(event, toggleMenu, false),
                      content: <>Apply</>,
                    }
                    : null}
                />
              )}
              {field === 'show_all' && (
                <>
                  <legend className="filters-box-header">{filtersLabels[field]}</legend>
                  <DS.Checkbox
                    checkboxId="show_all"
                    isSelected={!this.isFilterChecked(field, true)}
                    onChange={e => this.onChangeCheckbox(e, field, true, true)}
                    labelOptions={{ id: 'show_all_label', labelContent: <>Available Online</> }}
                    name="show_all"
                  />
                </>
              )}
              {field === 'language'
                && (

                <>
                  <legend className="filters-box-header">{filtersLabels[field]}</legend>
                  <DS.Accordion
                    buttonOptions={{ id: 'accordionBtn', content: <span>Click to expand</span> }}
                  >
                    {languageList}
                  </DS.Accordion>
                </>
                )
              }
              {field === 'format'
                && (
                  <>
                    <legend className="filters-box-header">{filtersLabels[field]}</legend>
                    {formatTypes.map(formatType => (
                      <>
                        <DS.Checkbox
                          className="usa-checkbox tablet:grid-col-12"
                          labelClass="usa-checkbox__label"
                          inputClass="usa-checkbox__input"
                          checkboxId={`filters-${field}-${formatType.value}`}
                          isSelected={this.isFilterChecked(field, formatType.value)}
                          onChange={e => this.onChangeCheckbox(e, field, formatType.value, false)}
                          labelOptions={{ id: `filters-${field}-${formatType.value}=label`, labelContent: <>{formatType.label}</> }}
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

Filters.propTypes = {
  toggleMenu: PropTypes.func,
  isMobile: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  router: PropTypes.objectOf(PropTypes.any),
  onChangeSort: PropTypes.func,
  onChangePerPage: PropTypes.func,
};

Filters.defaultProps = {
  toggleMenu: () => {},
  isMobile: false,
  data: {},
  searchQuery: initialSearchQuery,
  router: {},
  onChangeSort: () => {},
  onChangePerPage: () => {},
};

export default Filters;
