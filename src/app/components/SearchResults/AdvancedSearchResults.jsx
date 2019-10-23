import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { getQueryString } from '../../search/query';
import { flattenDeep } from '../../util/Util';
import { inputTerms } from '../../constants/labels';

const AdvancedSearchResults = ({ searchQuery, userQuery, router }) => {
  const labelTerms = flattenDeep(inputTerms.map(x => x.values));
  const disableClearTag = true;
  // redirect to url with query params
  const submit = (query) => {
    const path = `/search?${getQueryString(query)}`;
    router.push(path);
  };
  // update page in store and go to any page
  const doSearch = (queries) => {
    const newQuery = Object.assign({}, searchQuery, { queries }, { page: 0 });
    userQuery(newQuery);
    submit(newQuery);
  };

  const onClick = (e, query) => {
    if (disableClearTag) {
      return;
    }
    const queries = searchQuery.queries.slice(0);
    const matchIndex = queries.findIndex(q => q.field === query.field && q.query === query.query);
    if (matchIndex > -1) {
      queries.splice(matchIndex, 1);
    }
    doSearch(queries);
  };

  const label = field => labelTerms.find(l => l.key === field).label;

  if (searchQuery && searchQuery.queries && searchQuery.queries.length > 0) {
    return (
      <div className="grid-row margin-y-2">
        <div
          className="grid-col-10 sfr-center"
          id="advanced-search-tags"
        >
          {searchQuery.queries.map((query) => {
            if (query.field) {
              return (
                <button
                  type="button"
                  className={disableClearTag
                    ? 'usa-button usa-button--outline tag-button' : 'usa-button usa-button--outline tag-button active'}
                  onClick={e => onClick(e, query)}
                  key={`${query.field}: ${query.query} `}
                >
                  {`${label(query.field)}: ${query.query} `}
                </button>
              );
            }
          })}
        </div>
      </div>
    );
  }
  return null;
};

AdvancedSearchResults.propTypes = {
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any),
};

AdvancedSearchResults.defaultProps = {
  searchQuery: initialSearchQuery,
  userQuery: () => { },
  router: {},
};

export default AdvancedSearchResults;
