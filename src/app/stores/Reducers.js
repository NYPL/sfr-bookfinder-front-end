import { combineReducers } from 'redux';
import { Actions } from '../actions/SearchActions';
import initialState from './InitialState';

export const errorMsg = (state = null, action) => {
  switch (action.type) {
    case Actions.ERRORMSG:
      return action.errorMsg;
    default:
      return state;
  }
};

export const loading = (state = null, action) => {
  switch (action.type) {
    case Actions.LOADING:
      return action.loading;
    default:
      return state;
  }
};

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

export const workResult = (state = null, action) => {
  switch (action.type) {
    case Actions.FETCH_WORK:
      return {
        work: action.work,
      };
    default:
      return state;
  }
};

export const searchQuery = (state = null, action) => {
  if (action.type === Actions.SET_QUERY) {
    console.log('sending searchQuery action', action.searchQuery);
    return action.searchQuery;
  }

  return state;
};

export const totalWorks = (state = null, action) => {
  if (action.type === Actions.GET_TOTAL_WORKS) {
    return action.total;
  }
  return state;
};

export const sort = (state = null, action) => (action.sort ? action.sort : state);

const appReducer = combineReducers({
  searchResults,
  searchQuery,
  sort,
  workResult,
  totalWorks,
  loading,
  errorMsg,
});

export const rootReducer = (state, action) => {
  if (action.type === Actions.RESET_SEARCH) {
    // Reset everything except total books
    return Object.assign({}, initialState, {
      totalWorks: state.totalWorks,
    });
  }
  return appReducer(state, action);
};

export default rootReducer;
