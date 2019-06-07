import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';

const filtersLabels = { language: 'Language', years: 'Puplication Year' };

const Filters = ({
  data, searchQuery, userQuery, router,
}) => {
  const filtersArray = [];
  let yearsFilter = {};
  // add search filters
  if (searchQuery && searchQuery.filters && Array.isArray(searchQuery.filters)) {
    searchQuery.filters.forEach((filter) => {
      filtersArray.push({ field: filter.field, value: filter.value });
      if (filter.field === 'years') {
        yearsFilter = filter;
      }
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
  const onChangeCheckbox = (e, field, value) => {
    const matchIndex = filtersArray.findIndex(filter => filter.field === field && filter.value === value);
    if (e.target.checked && matchIndex === -1) {
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
      if (!filterFound) {
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

    if (e.target.elements && (e.target.elements['filters.years.start'] || e.target.elements['filters.years.end'])) {
      const currentYearsFilter = {
        field: 'years',
        value: { start: e.target.elements['filters.years.start'].value, end: e.target.elements['filters.years.end'].value },
      };
      const matchIndex = filtersArray.findIndex(filter => filter.field === 'years');
      if (matchIndex === -1) {
        filtersArray.push(currentYearsFilter);
      } else if (matchIndex > -1) {
        filtersArray[matchIndex] = currentYearsFilter;
      }
    }
    doSearchWithFilters(filtersArray);
  };

  const renderYearsFilter = () => (
    <div className="grid-container padding-0">
      <div className="grid-row">
        <label
          className="usa-label tablet:grid-col padding-right-4"
          htmlFor="filters.years.start"
        >
          Start
          <input
            className="usa-input"
            id="filters.years.start"
            name="filters.years.start"
            type="number"
            defaultValue={yearsFilter && yearsFilter.value && yearsFilter.value.start}
          />
        </label>
        <label
          className="usa-label tablet:grid-col padding-right-4"
          htmlFor="filters.years.end"
        >
          End
          <input
            className="usa-input"
            id="filters.years.end"
            name="filters.years.end"
            type="number"
            defaultValue={yearsFilter && yearsFilter.value && yearsFilter.value.end}
          />
        </label>
      </div>
      <div className="grid-row">
        <button
          className="usa-button usa-button--outline padding-x-4"
          type="submit"
        >
          Update
        </button>
      </div>
    </div>
  );

  if (data && data.facets && data.hits && data.hits.hits && data.hits.hits.length > 0) {
    return (
      <form
        className="filters usa-form"
        action="/search"
        onSubmit={onSubmit}
      >
        <input
          type="hidden"
          name="query"
          value={searchQuery.query}
        />
        <input
          type="hidden"
          name="field"
          value={searchQuery.field}
        />
        <div className="filters-header">Filter data</div>
        {Object.keys(filtersLabels).map(field => (
          <fieldset
            key={field}
            className="filters-box usa-fieldset"
          >
            <legend className="filters-box-header">{filtersLabels[field]}</legend>
            {field === 'years' && renderYearsFilter()}
            {field !== 'years'
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
