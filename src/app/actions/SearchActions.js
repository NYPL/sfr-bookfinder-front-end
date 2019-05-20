import axios from 'axios';
import appConfig from '../../../appConfig';
import selectFields from '../constants/fields';
import serverState from '../stores/InitialState';
import { buildQueryBody } from '../search/query';

axios.interceptors.request.use(
  (config) => {
    console.log('intercept request', config);
    return config;
  },
  (error) => {
    console.log('intercept request error', error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    console.log('intercept response', response);
    return response;
  },
  (error) => {
    console.log('intercept response error', error);
    return Promise.reject(error);
  },
);

export const Actions = {
  SEARCH: 'SEARCH',
  FETCH_WORK: 'FETCH_WORK',
  SET_QUERY: 'SET_QUERY',
  RESET_SEARCH: 'RESET_SEARCH',
};

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

const appEnv = process.env.APP_ENV || 'production';
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath } = appConfig.api;
const searchUrl = apiUrl + searchPath;
const recordUrl = apiUrl + recordPath;

export const searchPost = (query) => {
  const uQuery = query.query || '*';
  const sField = query.field && selectFields[query.field] ? selectFields[query.field] : 'keyword';
  const queryBody = buildQueryBody(Object.assign({}, query, { query: uQuery, field: sField }));

  return dispatch => axios
    .post(searchUrl, queryBody)
    .then((resp) => {
      if (resp.data) {
        dispatch(searchResults(resp.data));
      }
    })
    .catch((error) => {
      console.log('An error occurred during searchPost', error.message);
      throw new Error('An error occurred during searchPost', error.message);
    });
};

export const fetchWork = workId => dispatch => axios
  .get(recordUrl, { params: { identifier: workId } })
  .then((resp) => {
    if (resp.data) {
      dispatch(workDetail(resp.data));
    }
  })
  .catch((error) => {
    console.log('An error occurred during fetchWork', error.message);
    throw new Error('An error occurred during fetchWork', error.message);
  });

export const serverPost = (query) => {
  // Need a parsed query input to use for each filter
  const uQuery = query.query || '*';
  const sField = query.field && selectFields[query.field] ? selectFields[query.field] : 'keyword';
  const queryBody = buildQueryBody(Object.assign({}, query, { query: uQuery, field: sField }));

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
  .get(recordUrl, { params: { identifier: workId } })
  .then((resp) => {
    serverState.workDetail = { work: resp.data };
    return serverState;
  })
  .catch((error) => {
    console.log('An error occurred during serverFetchWork', error.message);
    throw new Error('An error occurred during serverFetchWork', error.message);
  });

export default {
  searchPost,
  fetchWork,
  serverPost,
  serverFetchWork,
  userQuery,
  resetSearch,
};
