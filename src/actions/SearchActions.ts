import axios from 'axios';
import appConfig from '~/config/appConfig';
import { fields } from '~/src/constants/fields';
import serverState from '~/src/stores/InitialState';
import { buildSearchQuery } from '~/src/util/SearchQuery';

export const Actions = {
  SEARCH: 'SEARCH',
  FETCH_WORK: 'FETCH_WORK',
  FETCH_EDITION: 'FETCH_EDITION',
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

export const editionDetail = edition => ({
  type: Actions.FETCH_EDITION,
  edition,
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
const { searchPath, recordPath, editionPath } = appConfig.api;
const totalWorksPath = appConfig.booksCount.apiUrl;
const searchUrl = apiUrl + searchPath[appEnv];
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const totalWorksUrl = apiUrl + totalWorksPath;

export const searchPost = (query) => {
  const sField = query.field && fields[query.field];
  let queryBody;
  if (sField) {
    queryBody = buildSearchQuery(Object.assign({}, query, { field: sField }));
  }
  queryBody = buildSearchQuery(Object.assign({}, query));
  return dispatch => axios
    .post(searchUrl, queryBody)
    .then((resp) => {
      if (resp.data) {
        console.log("resp.data", resp.data);
        dispatch(searchResults(resp.data));
      }
    })
    .catch((error) => {
      console.log('An error occurred during searchPost', error.message);
      throw new Error('An error occurred during searchPost', error.message);
    });
};

export const detailRefinePost = (query) => {
  const queryBody = Object.assign({}, query);
  queryBody.identifier = queryBody.workId;
  delete queryBody.workId;
  return dispatch => axios
    .post(recordUrl, queryBody)
    .then((resp) => {
      if (resp.data) {
        dispatch(workDetail(resp.data));
      }
    })
    .catch((error) => {
      console.log('An error occurred during detailRefinePost', error.message);
      throw new Error('An error occurred during detailRefinePost', error.message);
    });
};

export const editionDetailRefinePost = (query) => {
  const queryBody = Object.assign({}, query);
  queryBody.editionIdentifier = queryBody.editionId;
  delete queryBody.editionId;
  return dispatch => axios
    .post(editionUrl, queryBody)
    .then((resp) => {
      if (resp.data) {
        dispatch(editionDetail(resp.data));
      }
    })
    .catch((error) => {
      console.log('An error occurred during editionDetailRefinePost', error.message);
      throw new Error('An error occurred during editionDetailRefinePost', error.message);
    });
};

export const fetchWork = query => dispatch => axios
  .get(recordUrl, { params: { identifier: query.workId, recordType: 'editions', showAll: query.showAll } })
  .then((resp) => {
    if (resp.data) {
      dispatch(workDetail(resp.data));
    }
  })
  .catch((error) => {
    console.log('An error occurred during fetchWork', error.message);
    throw new Error('An error occurred during fetchWork', error.message);
  });

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

export const fetchEdition = query => dispatch => axios
  .get(editionUrl, { params: { editionIdentifier: query.editionId, showAll: query.showAll } })
  .then((resp) => {
    if (resp.data) {
      dispatch(editionDetail(resp.data));
    }
  })

  .catch((error) => {
    console.log('An error occurred during fetchEdition', error.message);
    throw new Error('An error occurred during fetchEdition', error.message);
  });

export const serverPost = (query) => {
  const sField = query.field && fields[query.field];
  let queryBody;
  if (sField) {
    queryBody = buildSearchQuery(Object.assign({}, query, { field: sField }));
  }
  queryBody = buildSearchQuery(Object.assign({}, query));
  return axios
    .post(searchUrl, { query: queryBody })
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

export const serverFetchWork = query => axios
  .get(recordUrl, { params: { identifier: query.workId, recordType: 'editions', showAll: query.showAll } })
  .then((resp) => {
    serverState.workResult = { work: resp.data };
    return serverState;
  })
  .catch((error) => {
    console.log('An error occurred during serverFetchWork', error.message);
    throw new Error('An error occurred during serverFetchWork', error.message);
  });

export const serverFetchEdition = query => axios
  .get(editionUrl, { params: { editionIdentifier: query.editionId, showAll: query.showAll } })
  .then((resp) => {
    serverState.editionResult = { edition: resp.data };
    return serverState;
  })
  .catch((error) => {
    console.log('An error occurred during serverFetchEdition', error.message);
    throw new Error('An error occurred during serverFetchEdition', error.message);
  });

export const loading = isLoading => dispatch => dispatch(loadingState(isLoading));
export const error = errorMsg => dispatch => dispatch(errorState(errorMsg));

export default {
  searchPost,
  detailRefinePost,
  editionDetailRefinePost,
  fetchWork,
  fetchTotalWorks,
  fetchEdition,
  serverPost,
  serverFetchWork,
  serverFetchEdition,
  userQuery,
  resetSearch,
  loading,
  error,
};
