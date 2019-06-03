import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';

const filtersLabels = { language: 'Language' };

const Filters = ({
  results, searchQuery, userQuery, router,
}) => {
  const filtersArray = [];

  // add search filters
  if (searchQuery && searchQuery.filters) {
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

  // on ckech of filter, add it or remove it from list and do the search
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

  // join current results filters with filters from previous search
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

  if (results && results.facets && results.hits && results.hits.hits && results.hits.hits.length > 0) {
    return (
      <form className="filters usa-form">
        <div className="filters-header">Filter Results</div>
        {Object.keys(filtersLabels).map(field => (
          <fieldset
            key={field}
            className="filters-box usa-fieldset"
          >
            {results.facets[field] && <legend className="filters-box-header">{filtersLabels[field]}</legend>}
            {prepareFilters(results.facets[field], field).map(facet => (
              <div
                className="usa-checkbox"
                key={`facet-${field}-${facet.value}`}
              >
                <input
                  className="usa-checkbox__input"
                  id={`facet-${field}-${facet.value}`}
                  type="checkbox"
                  name={facet.value}
                  onChange={e => onChangeCheckbox(e, field, facet.value)}
                  checked={isFilterChecked(field, facet.value)}
                />
                <label
                  className="usa-checkbox__label"
                  htmlFor={`facet-${field}-${facet.value}`}
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
  results: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

Filters.defaultProps = {
  results: {},
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default Filters;
