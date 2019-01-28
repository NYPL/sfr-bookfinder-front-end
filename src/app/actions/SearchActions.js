import axios from 'axios';
import appConfig from '../../../appConfig';

export const Actions = {
  SEARCH: 'SEARCH',
  FETCH_WORK: 'FETCH_WORK',
};

export const searchResults = (results) => {
  return {
    type: Actions.SEARCH,
    results,
  };
};

export const workDetail = (item) => {
  return {
    type: Actions.FETCH_WORK,
    item,
  };
};

const appEnv = process.env.APP_ENV || 'production';
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath } = appConfig.api;
const searchUrl = apiUrl + searchPath;
const recordUrl = apiUrl + recordPath;

export const searchGet = (query) => {
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURIComponent(query) : '*';
  return (dispatch) => {
    return axios.get(searchUrl, { params: { q: userQuery } })
      .then((resp) => {
        if (resp.data) {
          dispatch(searchResults(resp.data));
        }
      })
      .catch((error) => {
        console.log('An error occurred during searchGet', error);
        throw new Error('An error occurred during searchGet', error);
      });
  };
};

export const searchPost = (query, field) => {
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURIComponent(query) : '*';

  return (dispatch) => {
    return axios.post(searchUrl, { queries: [{ field, value: userQuery }] })
      .then((resp) => {
        if (resp.data) {
          dispatch(searchResults(resp.data));
        }
      })
      .catch((error) => {
        console.log('An error occurred during searchPost', error);
        throw new Error('An error occurred during searchPost', error);
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
        console.log('An error occurred during fetchWork', error);
        throw new Error('An error occurred during fetchWork', error);
      });
  };
};

export const serverGet = (query) => {
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURIComponent(query) : '*';
  if (!userQuery) {
    throw new Error('No search terms were entered. Please enter some terms.');
  }
  return axios.get(searchUrl, { params: { q: userQuery } })
    .then((resp) => {
      searchResults(resp.data);
    })
    .catch((error) => {
      console.log('An error occurred during searchGet', error);
      throw new Error('An error occurred during searchGet', error);
    });
};

export const serverPost = (query, field) => {
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURIComponent(query) : '*';
  return axios.post(searchUrl, { queries: [{ field, value: userQuery }] })
    .then((resp) => {
      searchResults(resp.data);
    })
    .catch((error) => {
      console.log('An error occurred during searchPost', error);
      throw new Error('An error occurred during searchPost', error);
    });
};

export const serverFetchWork = (workId) => {
  return axios.get(recordUrl, { params: { recordID: workId } })
    .then((resp) => {
      workDetail(resp.data);
    })
    .catch((err) => {
      console.log('error thrown', err);
    });
};

export default {
  searchGet,
  searchPost,
  fetchWork,
  serverFetchWork,
};
