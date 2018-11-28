import { combineReducers } from 'redux';
import { Actions } from '../actions/Actions';

export const searchResults = (state = null, action) => {
  switch (action.type) {
    case Actions.SEARCH:
      return action.payload.searchResults;
      // Store the results returned by ES.
      // return search(state.query, state.filter)
      //   .then((srchResults) => {
      //     console.log(srchResults);
      //     let newState = srchResults;
      //     return newState;
      //   });

    default:
      return state;
  }
};

export const query = (state = '', action) => (
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
