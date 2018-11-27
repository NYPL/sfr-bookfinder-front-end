import performSearch from '../components/Search/SearchQuery';

export const searchActions = {
  SEARCH: 'SEARCH',
  SEARCH_BY_KEYWORD: 'SEARCH_BY_KEYWORD',
  SEARCH_BY_TITLE: 'SEARCH_BY_TITLE',
  SEARCH_BY_AUTHOR: 'SEARCH_BY_AUTHOR',
  FILTER_RESULTS: 'FILTER_RESULTS',
  SORT_RESULTS: 'SORT_RESULTS',
};

export const search = (query, filter) => {
  return performSearch(query, filter)
    .then((results) => {
      return {
        type: searchActions.SEARCH,
        payload: {
          searchResults: results,
        },
      };
    });
};

export default { searchActions, search };
