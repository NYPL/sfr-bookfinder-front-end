import { combineReducers } from 'redux';
import { Actions } from '../actions/SearchActions';
import initialState from './InitialState';

export const searchResults = (state = null, action) => {
  switch (action.type) {
    case Actions.SEARCH:
      return {
        data: action.results,
      };
    default:
      return state;
  }
};

export const workDetail = (state = null, action) => {
  switch (action.type) {
    case Actions.FETCH_WORK:
      return {
        work: action.work,
      };
    default:
      return state;
  }
};

export const userQuery = (state = null, action) => (
  (action.userQuery) ?
    action.userQuery :
    state
);

export const selectedField = (state = null, action) => (
  (action.selectedField) ?
    action.selectedField :
    state
);

export const allowedFilters = (state = null, action) => (
  (action.allowedFilters) ?
    action.allowedFilters :
    state
);

export const sort = (state = null, action) => (
  (action.sort) ?
    action.sort :
    state
);

export const resetSearch = (state = null, action) => (
  (action.reset) ?
    initialState :
    state
);

export default combineReducers({
  searchResults,
  userQuery,
  selectedField,
  allowedFilters,
  sort,
  workDetail,
  resetSearch,
});
