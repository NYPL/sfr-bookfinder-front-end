import axios from 'axios';
import appConfig from '../../../appConfig';
import selectFields from '../constants/fields';
import serverState from '../stores/InitialState';
import { buildQueryBody } from '../search/query';

export const Actions = {
  SEARCH: 'SEARCH',
  FETCH_WORK: 'FETCH_WORK',
  SET_QUERY: 'SET_QUERY',
  RESET_SEARCH: 'RESET_SEARCH',
  GET_TOTAL_WORKS: 'GET_TOTAL_WORKS',
  LOADING: 'LOADING',
  ERRORMSG: 'ERRORMSG',
};

export const errorState = errorMsg => ({
  type: Actions.ERRORMSG,
  errorMsg,
});

export const loadingState = loading => ({
  type: Actions.LOADING,
  loading,
});

export const userQuery = query => ({
  type: Actions.SET_QUERY,
  searchQuery: query,
});

export const searchResults = results => ({
  type: Actions.SEARCH,
  results,
});

export const workDetail = work => ({
  type: Actions.FETCH_WORK,
  work,
});

export const resetSearch = () => ({
  type: Actions.RESET_SEARCH,
  reset: true,
});

export const totalWorks = total => ({
  type: Actions.GET_TOTAL_WORKS,
  total,
});

const appEnv = process.env.APP_ENV || 'production';
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath } = appConfig.api;
const totalWorksPath = appConfig.booksCount.apiUrl;
const searchUrl = apiUrl + searchPath;
const recordUrl = apiUrl + recordPath;
const totalWorksUrl = apiUrl + totalWorksPath;

export const searchPost = (query) => {
  console.log('POST query', query);

  const sField = query.field && selectFields[query.field];
  let queryBody;
  if (sField) {
    queryBody = buildQueryBody(Object.assign({}, query, { field: sField }));
  }
  queryBody = buildQueryBody(Object.assign({}, query));
  console.log('searchPost queryBody', queryBody);

  return dispatch => axios
    .post(searchUrl, queryBody)
    .then((resp) => {
      console.log('Resp', resp);
      if (resp.data) {
        dispatch(searchResults(resp.data));
      }
    })
    .catch((error) => {
      console.log('An error occurred during searchPost', error.message);
      throw new Error('An error occurred during searchPost', error.message);
    });
};

export const fetchWork = (workId) => {
  console.log('fetching work', workId);
  console.log('recordUrl', recordUrl);
  return dispatch => axios
    .get(recordUrl, { params: { identifier: workId, recordType: 'editions' } })
    .then((resp) => {
      console.log('fetchWork response', resp);
      if (resp.data) {
        dispatch(workDetail(resp.data));
      }
    })
    .catch((error) => {
      console.log('An error occurred during fetchWork', error.message);
      throw new Error('An error occurred during fetchWork', error.message);
    });
};

export const fetchTotalWorks = () => dispatch => axios
  .get(totalWorksUrl)
  .then((resp) => {
    if (resp.data) {
      dispatch(totalWorks(resp.data));
    }
  })
  .catch((error) => {
    console.log('An error occurred during fetchTotalWorks', error.message);
    throw new Error('An error occurred during fetchTotalWorks', error.message);
  });

export const serverPost = (query) => {
  const sField = query.field && selectFields[query.field];
  let queryBody;
  if (sField) {
    queryBody = buildQueryBody(Object.assign({}, query, { field: sField }));
  }
  queryBody = buildQueryBody(Object.assign({}, query));

  return axios
    .post(searchUrl, queryBody)
    .then((resp) => {
      serverState.searchQuery = query;
      serverState.searchResults = { data: resp.data };
      return serverState;
    })
    .catch((error) => {
      console.log('An error occurred during serverPost', error.message);
      throw new Error('An error occurred during serverPost', error.message);
    });
};

export const serverFetchWork = workId => axios
  .get(recordUrl, { params: { identifier: workId, recordType: 'editions' } })
  .then((resp) => {
    serverState.workDetail = { work: resp.data };
    return serverState;
  })
  .catch((error) => {
    console.log('An error occurred during serverFetchWork', error.message);
    throw new Error('An error occurred during serverFetchWork', error.message);
  });

export const loading = isLoading => dispatch => dispatch(loadingState(isLoading));
export const error = errorMsg => dispatch => dispatch(errorState(errorMsg));

export default {
  searchPost,
  fetchWork,
  fetchTotalWorks,
  serverPost,
  serverFetchWork,
  userQuery,
  resetSearch,
  loading,
  error,
};
