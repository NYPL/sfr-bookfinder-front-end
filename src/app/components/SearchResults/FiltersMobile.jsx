import React from 'react';
import PropTypes from 'prop-types';
import * as DS from '@nypl/design-system-react-components';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import FilterYears from './FilterYears';
import { filtersLabels, formatTypes, errorMessagesText } from '../../constants/labels';
import Checkbox from '../Form/Checkbox';

class FiltersMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMsg: '', error: false };
    this.filtersArray = [];

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeYears = this.onChangeYears.bind(this);

    this.isFilterChecked = this.isFilterChecked.bind(this);
    this.searchContains = this.searchContains.bind(this);
    this.showFields = this.showFields.bind(this);
    this.joinFacetsAndsearch = this.joinFacetsAndsearch.bind(this);
    this.doSearchWithFilters = this.doSearchWithFilters.bind(this);
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

  // beginning to prepare for not-js
  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const currentYearsFilter = this.filtersArray.find(filter => filter.field === 'years');

    if (currentYearsFilter && currentYearsFilter.value) {
      if ((currentYearsFilter.value.start) && (currentYearsFilter.value.end)
        && Number(currentYearsFilter.value.start) > Number(currentYearsFilter.value.end)) {
        this.setState({ error: true, errorMsg: errorMessagesText.invalidDate });
        return;
      }
      this.setState({ error: false, errorMsg: '' });
    }
    this.doSearchWithFilters(this.filtersArray);
  }

  onChangeYears(yearsFilter) {
    const currentYearsFilter = {
      field: 'years',
      value: yearsFilter,
    };
    const matchIndex = this.filtersArray.findIndex(filter => filter.field === 'years');
    if (matchIndex === -1) {
      this.filtersArray.push(currentYearsFilter);
    } else if (matchIndex > -1) {
      this.filtersArray[matchIndex] = currentYearsFilter;
      if (!yearsFilter.start && !yearsFilter.end) {
        this.filtersArray.splice(matchIndex, 1);
      }
    }
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
    this.props.userQuery(newQuery);
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
      data, searchQuery, toggleMenu,
    } = this.props;
    // add search filters
    if (searchQuery && searchQuery.filters && Array.isArray(searchQuery.filters)) {
      searchQuery.filters.forEach((filter) => {
        if (!this.filtersArray.find(filtArrEntry => filtArrEntry.field === filter.field)) {
          this.filtersArray.push({ field: filter.field, value: filter.value });
        }
      });
    }

    if (this.showFields(data).length > 0) {
      return (
        <form
          className="filters usa-form"
          action="/search"
          onSubmit={this.onSubmit}
        >
          <DS.Heading
            level={2}
            id="filter-mobile-header"
          >
            <>
              {' '}
                Refine Results
              {' '}
              <DS.Button
                id="closeButton"
                callback={toggleMenu}
              >
                Close
              </DS.Button>
            </>
          </DS.Heading>
          {this.showFields(data).map(field => (
            <fieldset
              key={field}
              className="filters-box usa-fieldset"
            >
              <legend className="filters-box-header">{filtersLabels[field]}</legend>
              {field === 'years' && (
                <FilterYears
                  searchQuery={searchQuery}
                  onChange={this.onChangeYears}
                  onError={e => this.onErrorYears(e)}
                  inputClassName="tablet:grid-col padding-right-4"
                  className="grid-row"
                />
              )}
              {field === 'show_all' && (
                <Checkbox
                  className="usa-checkbox"
                  labelClass="usa-checkbox__label"
                  inputClass="usa-checkbox__input"
                  id="show_all"
                  isSelected={!this.isFilterChecked(field, true)}
                  onChange={e => this.onChangeCheckbox(e, field, true, true)}
                  label="Available Online"
                  name="show_all"
                />
              )}
              {field === 'language'
                && (
                <DS.Accordion buttonOptions={{ id: 'accordionBtn', content: <>Click to expand</> }}>
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
              {field === 'format'
                && formatTypes.map(formatType => (
                  <Checkbox
                    className="usa-checkbox tablet:grid-col-12"
                    labelClass="usa-checkbox__label"
                    inputClass="usa-checkbox__input"
                    id={`filters-${field}-${formatType.value}`}
                    isSelected={this.isFilterChecked(field, formatType.value)}
                    onChange={e => this.onChangeCheckbox(e, field, formatType.value, false)}
                    label={formatType.label}
                    name={`filters.${field}`}
                    key={`facet-${field}-${formatType.value}`}
                  />
                ))}
            </fieldset>
          ))}
          {this.state.error && (
            <div
              className="usa-alert usa-alert--error"
              role="alert"
            >
              <div className="usa-alert__body">
                <h3 className="usa-alert__heading">Error</h3>
                <p className="usa-alert__text">{this.state.errorMsg}</p>
              </div>
            </div>
          )}
          <div className="grid-row margin-top-1">
            <button
              className={
                this.state.error
                  ? 'usa-button usa-button--outline padding-x-4 usa-button--outline-disabled'
                  : 'usa-button usa-button--outline padding-x-4'
              }
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      );
    }
    return null;
  }
}

FiltersMobile.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  toggleMenu: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

FiltersMobile.defaultProps = {
  data: {},
  searchQuery: initialSearchQuery,
  userQuery: () => { },
  toggleMenu: () => { },
  router: {},
};

export default FiltersMobile;
