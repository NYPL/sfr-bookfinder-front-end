import performSearch from '../components/Search/SearchQuery';
import { Actions } from './Actions';

export const search = (query, filter) => {
  return performSearch(query, filter)
    .then((results) => {
      return {
        type: Actions.SEARCH,
        payload: {
          searchResults: results,
        },
      };
    });
};
