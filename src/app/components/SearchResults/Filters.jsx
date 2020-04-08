import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import {
  yearsType, filtersLabels, formatTypes, errorMessagesText,
} from '../../constants/labels';
import * as searchActions from '../../actions/SearchActions';

const getYearsFilter = (searchQuery) => {
  const yearsValues = {};
  Object.keys(yearsType).forEach((yearType) => {
    const yearValue = searchQuery && searchQuery.filters && searchQuery.filters.find(filter => filter.field === 'years');
    yearsValues[yearType] = yearValue && yearValue.value[yearType] ? Number(yearValue.value[yearType]) : '';
  });
  return yearsValues;
};

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMsg: '', error: false, ...getYearsFilter(props.searchQuery) };
    this.filtersArray = [];

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);

    this.isFilterChecked = this.isFilterChecked.bind(this);
    this.searchContains = this.searchContains.bind(this);
    this.showFields = this.showFields.bind(this);
    this.joinFacetsAndsearch = this.joinFacetsAndsearch.bind(this);
    this.doSearchWithFilters = this.doSearchWithFilters.bind(this);
  }

  onChangeYear(e, yearType) {
    const val = e.target.value && Number(e.target.value);
    const obj = {};
    obj[yearType] = val;
    this.setState(state => Object.assign({}, state, obj));
  }

  // on check of filter, add it or remove it from list and do the search
  onChangeCheckbox(e, field, value, negative) {
    if (this.state.error) {
      return;
    }

    const matchIndex = this.filtersArray.findIndex(filter => filter.field === field && filter.value === value);
    if (negative) {
      if (!e.target.checked && matchIndex === -1) {
        this.filtersArray.push({ field, value });
      } else if (matchIndex > -1) {
        this.filtersArray.splice(matchIndex, 1);
      }
    } else if (e.target.checked && matchIndex === -1) {
      this.filtersArray.push({ field, value });
    } else if (matchIndex > -1) {
      this.filtersArray.splice(matchIndex, 1);
    }

    this.doSearchWithFilters(this.filtersArray);
  }

  onSubmit(e, toggleMenu) {
    console.log('toggleMenu', toggleMenu);
    e.preventDefault();
    e.stopPropagation();
    const currentYearsFilter = {
      field: 'years',
      value: { start: this.state.start, end: this.state.end },
    };
    const matchIndex = this.filtersArray.findIndex(filter => filter.field === 'years');
    if (matchIndex === -1) {
      this.filtersArray.push(currentYearsFilter);
    } else if (matchIndex > -1) {
      this.filtersArray[matchIndex] = currentYearsFilter;
      if (!this.state.start && !this.state.end) {
        this.filtersArray.splice(matchIndex, 1);
      }
    }

    if (currentYearsFilter && currentYearsFilter.value) {
      if ((currentYearsFilter.value.start) && (currentYearsFilter.value.end)
        && Number(currentYearsFilter.value.start) > Number(currentYearsFilter.value.end)) {
        this.setState({ error: true, errorMsg: errorMessagesText.invalidDate });
        return;
      }
      this.setState({ error: false, errorMsg: '' });
    }
    toggleMenu();
    this.doSearchWithFilters(this.filtersArray);
  }

  onErrorYears(errorObj) {
    this.setState({ error: errorObj.error, errorMsg: errorObj.errorMsg });
  }

  // join current data filters with filters from previous search
  joinFacetsAndsearch(facets, field) {
    const missingFacets = [];
    this.filtersArray.forEach((previousFilter) => {
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
  doSearchWithFilters(filters) {
    const newQuery = Object.assign({}, this.props.searchQuery, { filters }, { page: 0 });
    searchActions.userQuery(newQuery);
    this.submit(newQuery);
  }

  // see if filter is checked in previous search
  isFilterChecked(field, value) {
    let filterFound;
    if (this.props.searchQuery && this.props.searchQuery.filters) {
      filterFound = this.props.searchQuery.filters.find(filter => filter.field === field && filter.value === value);
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
      data, toggleMenu, isMobile,
    } = this.props;
    if (this.showFields(data).length > 0) {
      return (
        <form
          className="filters usa-form"
        >
          <DS.Heading
            level={2}
            id="filter-desktop-header"
          >
            <>
          Refine Results
              {isMobile
                && (
                <DS.Button
                  id="closeButton"
                  callback={toggleMenu}
                >
                Close
                </DS.Button>
                )
              }
            </>
          </DS.Heading>
          {this.showFields(data).map(field => (
            <fieldset
              key={field}
              className="filters-box usa-fieldset"
            >
              <legend className="filters-box-header">{filtersLabels[field]}</legend>
              {field === 'years' && (
                <DS.DateRangeForm
                  formLabel={<>Publication Year</>}

                  fromLabelOpts={{ labelContent: <>From</>, id: 'FromLabel' }}
                  fromInputOpts={{ inputId: 'fromInput', onInputChange: event => this.onChangeYear(event, 'start') }}
                  fromHelper={{ content: <>EX. 1901</>, id: 'fromyearhelper', isError: false }}

                  toLabelOpts={{ labelContent: <>To</>, id: 'ToLabel' }}
                  toInputOpts={{ inputId: 'fromInput', onInputChange: event => this.onChangeYear(event, 'end') }}
                  toHelper={{ content: <>EX. 2000</>, id: 'toYearHelper', isError: false }}

                  showError={this.state.error}
                  error={{ content: <>{this.state.errorMsg}</>, id: 'date-range-error', isError: true }}

                  buttonProps={{ id: 'submitButtonId', callback: event => this.onSubmit(event, toggleMenu), content: <>Apply</> }}
                />
              )}
              {field === 'show_all' && (
                <DS.Checkbox
                  checkboxId="show_all"
                  isSelected={!this.isFilterChecked(field, true)}
                  onChange={e => this.onChangeCheckbox(e, field, true, true)}
                  labelOptions={{ id: 'show_all_label', labelContent: <>Available Online</> }}
                  name="show_all"
                />
              )}
              {field === 'language'
                && (
                  <>
                    {isMobile
                      && (
                      <DS.Accordion
                        buttonOptions={{ id: 'accordionBtn', content: <span>Click to expand</span> }}
                      >
                        <DS.UnorderedList id="checkbox-list">
                          {this.prepareFilters(data.facets[field], field).map(facet => (
                            <DS.Checkbox
                              className="usa-checkbox"
                              labelClass="usa-checkbox__label"
                              inputClass="usa-checkbox__input"
                              checkboxId={`filters-${field}-${facet.value}`}
                              isSelected={this.isFilterChecked(field, facet.value)}
                              onChange={e => this.onChangeCheckbox(e, field, facet.value, false)}
                              labelOptions={{
                                id: `filters-${field}-${facet.value}-label`,
                                labelContent: <>
                                  {facet.count > 0
                                    ? `${facet.value} (${facet.count.toLocaleString()})` : `${facet.value}`}
                                              </>,
                              }}
                              name={`filters.${field}`}
                              key={`filters-${field}-${facet.value}`}
                            />

                          ))}
                        </DS.UnorderedList>
                      </DS.Accordion>
                      )
                    }
                      {!isMobile
                      && (
                      <DS.UnorderedList
                        id="checkbox-list"
                        scroll
                      >
                        {this.prepareFilters(data.facets[field], field).map(facet => (
                          <DS.Checkbox
                            className="usa-checkbox"
                            labelClass="usa-checkbox__label"
                            inputClass="usa-checkbox__input"
                            checkboxId={`filters-${field}-${facet.value}`}
                            isSelected={this.isFilterChecked(field, facet.value)}
                            onChange={e => this.onChangeCheckbox(e, field, facet.value, false)}
                            labelOptions={{
                              id: `filters-${field}-${facet.value}-label`,
                              labelContent: <>
                                {facet.count > 0
                                  ? `${facet.value} (${facet.count.toLocaleString()})` : `${facet.value}`}
                                            </>,
                            }}
                            name={`filters.${field}`}
                            key={`filters-${field}-${facet.value}`}
                          />

                        ))}
                      </DS.UnorderedList>
                      )
                      }
                  </>
                )
              }
              {field === 'format'
                && formatTypes.map(formatType => (
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
                ))}
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
};

Filters.defaultProps = {
  toggleMenu: () => {},
  isMobile: false,
  data: {},
  searchQuery: initialSearchQuery,
  router: {},
};

export default Filters;
