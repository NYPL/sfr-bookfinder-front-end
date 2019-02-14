import { combineReducers } from 'redux';
import { Actions } from '../actions/SearchActions';

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
        item: action.item,
      };
    default:
      return state;
  }
};

export const query = (state = null, action) => (
  (action.payload) ?
    action.payload.query :
    state
);

export const field = (state = null, action) => (
  (action.payload) ?
    action.payload.field :
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
  field,
  allowedFilters,
  sort,
  workDetail,
});
