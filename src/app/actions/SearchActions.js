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
  const recordUrl = apiUrl + recordPath;
  return (dispatch) => {
    return axios.get(recordUrl, { params: { recordID: workId } })
      .then((resp) => {
        if (resp.data) {
          dispatch(workDetail(resp.data));
          // Do I need to change state of the searchResults here?
          dispatch(searchResults());
        }
      })
      .catch((error) => {
        console.log('An error occurred during fetchWork', error);
        throw new Error('An error occurred during fetchWork', error);
      });
  };
};

export default { searchGet, searchPost, fetchWork };
