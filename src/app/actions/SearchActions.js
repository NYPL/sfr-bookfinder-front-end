import axios from 'axios';
import appConfig from '../../../appConfig';
import searchFields from '../constants/fields';
import serverState from '../stores/InitialState';
import { buildQueryBody } from '../search/query';

export const Actions = {
  SEARCH: 'SEARCH',
  FETCH_WORK: 'FETCH_WORK',
  SET_QUERY: 'SET_QUERY',
  SET_FIELD: 'SET_FIELD',
};

export const userQuery = (query) => {
  return {
    type: Actions.SET_QUERY,
    userQuery: query,
  };
};

export const selectedField = (field) => {
  return {
    type: Actions.SET_FIELD,
    selectedField: field,
  };
};

export const searchResults = (results) => {
  return {
    type: Actions.SEARCH,
    results,
  };
};

export const workDetail = (work) => {
  return {
    type: Actions.FETCH_WORK,
    work,
  };
};

const appEnv = process.env.APP_ENV || 'production';
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath } = appConfig.api;
const searchUrl = apiUrl + searchPath;
const recordUrl = apiUrl + recordPath;

export const searchPost = (query, field) => {
  const selectQuery = query || '*';
  const selectField = (field && searchFields[field]) ? searchFields[field] : 'keyword';
  const queryBody = buildQueryBody({ query: { field: selectField, selectQuery } });

  return (dispatch) => {
    return axios.post(searchUrl, queryBody)
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
};

export const fetchWork = (workId) => {
  return (dispatch) => {
    return axios.get(recordUrl, { params: { recordID: workId } })
      .then((resp) => {
        if (resp.data) {
          dispatch(workDetail(resp.data));
        }
      })
      .catch((error) => {
        console.log('An error occurred during fetchWork', error.message);
        throw new Error('An error occurred during fetchWork', error.message);
      });
  };
};

export const serverPost = (query, field) => {
  // Need a parsed query input to use for each filter
  const selectQuery = query || '*';
  const selectField = (field && searchFields[field]) ? searchFields[field] : 'keyword';
  const queryBody = buildQueryBody({ query: { field: selectField, selectQuery } });

  return axios.post(searchUrl, queryBody)
    .then((resp) => {
      serverState.searchResults = { data: resp.data };
      return serverState;
    })
    .catch((error) => {
      console.log('An error occurred during serverPost', error.message);
      throw new Error('An error occurred during serverPost', error.message);
    });
};

export const serverFetchWork = (workId) => {
  return axios.get(recordUrl, { params: { recordID: workId } })
    .then((resp) => {
      serverState.workDetail = { work: resp.data };
      return serverState;
    })
    .catch((error) => {
      console.log('An error occurred during serverFetchWork', error.message);
      throw new Error('An error occurred during serverFetchWork', error.message);
    });
};

export default {
  searchPost,
  fetchWork,
  serverPost,
  serverFetchWork,
  userQuery,
  selectedField,
};
