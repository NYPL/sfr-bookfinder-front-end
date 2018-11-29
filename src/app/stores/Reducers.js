import { combineReducers } from 'redux';
import { Actions } from '../actions/Actions';

export const searchResults = (state = null, action) => {
  switch (action.type) {
    case Actions.SEARCH:
      return {
        data: action.results,
      }
    default:
      return state;
  }
};

export const query = (state = null, action) => (
  (action.payload) ?
    action.payload.query :
    state
);

export const filter = (state = null, action) => (
  (action.payload) ?
    action.payload.filter :
    state
);

export const allowedFilters = (state = null, action) => (
  (action.payload) ?
    action.payload.allowedFilters :
    state
);

export const sort = (state = null, action) => (
  (action.payload) ?
    action.payload.sort :
    state
);

export default combineReducers({
  searchResults,
  query,
  filter,
  allowedFilters,
  sort,
});
