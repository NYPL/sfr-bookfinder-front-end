import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import FilterYears from './FilterYears';
import { filtersLabels } from '../../constants/labels';
import Checkbox from '../Form/Checkbox';

const Filters = ({
  data, searchQuery, userQuery, router,
}) => {
  const filtersArray = [];
  // add search filters
  if (searchQuery && searchQuery.filters && Array.isArray(searchQuery.filters)) {
    searchQuery.filters.forEach((filter) => {
      filtersArray.push({ field: filter.field, value: filter.value });
    });
  }

  // redirect to url with query params
  const submit = (query) => {
    const path = `/search?${getQueryString(query)}`;
    router.push(path);
  };

  // update page in store and go to any page
  const doSearchWithFilters = (filters) => {
    const newQuery = Object.assign({}, searchQuery, { filters }, { page: 0 });
    userQuery(newQuery);
    submit(newQuery);
  };

  // on check of filter, add it or remove it from list and do the search
  const onChangeCheckbox = (e, field, value, negative) => {
    const matchIndex = filtersArray.findIndex(filter => filter.field === field && filter.value === value);
    if (negative) {
      if (!e.target.checked && matchIndex === -1) {
        filtersArray.push({ field, value });
      } else if (matchIndex > -1) {
        filtersArray.splice(matchIndex, 1);
      }
    } else if (e.target.checked && matchIndex === -1) {
      filtersArray.push({ field, value });
    } else if (matchIndex > -1) {
      filtersArray.splice(matchIndex, 1);
    }
    doSearchWithFilters(filtersArray);
  };

  // see if filter is checked in previous search
  const isFilterChecked = (field, value) => {
    let filterFound;
    if (searchQuery && searchQuery.filters) {
      filterFound = searchQuery.filters.find(filter => filter.field === field && filter.value === value);
    }
    return !!filterFound;
  };

  // join current data filters with filters from previous search
  const joinFacetsAndsearch = (facets, field) => {
    const missingFacets = [];
    filtersArray.forEach((previousFilter) => {
      const filterFound = facets.find(facet => facet.value === previousFilter.value && previousFilter.field === field);
      if (!filterFound && previousFilter.field === field) {
        missingFacets.push({ value: previousFilter.value, count: 0 });
      }
    });
    return facets.concat(missingFacets);
  };

  // sort filters by: included in search, then count, then alphabetically
  // then returns only the first 10
  const prepareFilters = (facets, field) => joinFacetsAndsearch(facets, field)
    .sort((a, b) => {
      if (!isFilterChecked(field, a.value) && isFilterChecked(field, b.value)) {
        return 1;
      }
      if (isFilterChecked(field, a.value) && !isFilterChecked(field, b.value)) {
        return -1;
      }
      if (a.count < b.count) {
        return 1;
      }
      if (a.count > b.count) {
        return -1;
      }
      return a.value < b.value ? -1 : 1;
    })
    .slice(0, 10);

  // beginning to prepare for not-js
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    doSearchWithFilters(filtersArray);
  };

  const onChangeYears = (yearsFilter) => {
    const currentYearsFilter = {
      field: 'years',
      value: yearsFilter,
    };
    const matchIndex = filtersArray.findIndex(filter => filter.field === 'years');
    if (matchIndex === -1) {
      filtersArray.push(currentYearsFilter);
    } else if (matchIndex > -1) {
      filtersArray[matchIndex] = currentYearsFilter;
      if (!yearsFilter.start && !yearsFilter.end) {
        filtersArray.splice(matchIndex, 1);
      }
    }
  };

  const searchContains = field => searchQuery && searchQuery.filters && searchQuery.filters.find(filter => filter.field === field);
  const showFields = () => Object.keys(filtersLabels)
    .map(field => ((data.facets && data.facets[field] && data.facets[field].length > 0)
        || searchContains(field)
        || (field === 'years' && (searchContains(field) || (data.hits && data.hits.hits && data.hits.hits.length > 0)))
        || field === 'show_all'
      ? field
      : null))
    .filter(x => x);

  if (showFields().length > 0) {
    return (
      <form
        className="filters usa-form"
        action="/search"
        onSubmit={onSubmit}
      >
        <div className="filters-header">Filter data</div>
        {showFields().map(field => (
          <fieldset
            key={field}
            className="filters-box usa-fieldset"
          >
            <legend className="filters-box-header">{filtersLabels[field]}</legend>
            {field === 'years' && (
            <FilterYears
              searchQuery={searchQuery}
              onChange={onChangeYears}
            />
            )}
            {field === 'show_all' && (
              <Checkbox
                className="usa-checkbox"
                labelClass="usa-checkbox__label"
                inputClass="usa-checkbox__input"
                id="show_all"
                isSelected={!isFilterChecked(field, true)}
                onChange={e => onChangeCheckbox(e, field, true, true)}
                label="Read Only"
                name="show_all"
              />
            )}
            {field === 'language'
              && prepareFilters(data.facets[field], field).map(facet => (
                <div
                  className="usa-checkbox"
                  key={`facet-${field}-${facet.value}`}
                >
                  <input
                    className="usa-checkbox__input"
                    id={`filters-${field}-${facet.value}`}
                    type="checkbox"
                    name={`filters.${field}`}
                    value={facet.value}
                    onChange={e => onChangeCheckbox(e, field, facet.value)}
                    checked={isFilterChecked(field, facet.value)}
                  />
                  <label
                    className="usa-checkbox__label"
                    htmlFor={`filters-${field}-${facet.value}`}
                  >
                    {facet.value}
                    {facet.count > 0 && ` (${facet.count.toLocaleString()})`}
                  </label>
                </div>
              ))}
          </fieldset>
        ))}
      </form>
    );
  }
  return null;
};

Filters.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

Filters.defaultProps = {
  data: {},
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default Filters;
