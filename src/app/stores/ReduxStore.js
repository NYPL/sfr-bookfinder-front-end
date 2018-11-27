import { createStore, applyMiddleware } from 'redux';
import searchReducer from './Reducers';

const searchMessages = store => next => (action) => {
  let result;

  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log('Search query given', store.getState().query);

  result = next(action);

  let { searchResults, query, filter, allowedFilters, sort } = store.getState();

  console.log(`
    resultSet: ${searchResults}
    query: ${query}
    filter: ${filter}
    allowedFilters: ${allowedFilters}
    sort: ${sort}
  `);

  console.groupEnd();

  return result;
};

export default (initialState = {}) => {
  return applyMiddleware(searchMessages)(createStore)(searchReducer, initialState);
};
