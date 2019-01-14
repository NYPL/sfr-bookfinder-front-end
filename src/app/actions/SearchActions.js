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
  console.log('Item fetched', item);
  return { 
    type: Actions.FETCH_WORK,
    item,
  };
};

export const search = (query, field = 'q') => {
  const appEnv = process.env.APP_ENV || 'production';
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURIComponent(query) : '*';
  // Need a client to send the search and receive results
  // Need to pass the results to a renderer
  const esQueryPath = appConfig.esUrl.basePath;
  const esUrl = appConfig.esUrl[appEnv] + esQueryPath;

  return (dispatch) => {
    return axios.get(esUrl, { params: { q: userQuery } })
      .then((resp) => {
        if (resp.data) {
          dispatch(searchResults(resp.data));
        }
      })
      .catch((error) => {
        console.log('Error communicating with Elasticsearch', esUrl, userQuery, error);
        throw new Error('Error communicating with Elasticsearch', esUrl, userQuery, error);
      });
  };
};

export const fetchWork = (workId = 'http://www.gutenberg.org/ebooks/1001') => {
  const appEnv = process.env.APP_ENV || 'production';
  const esDetailPath = appConfig.esUrl.detailPath;
  const esUrl = appConfig.esUrl[appEnv] + esDetailPath;

  return (dispatch) => {
    console.log('Dispatch item fired', workId);
    return axios.get(esUrl, { params: { recordID: workId } })
      .then((resp) => {
        console.log('Item response', resp);
        if (resp.data) {
          dispatch(workDetail(resp.data));
        }
      })
      .catch((error) => {
        console.log('Error communicating with Elasticsearch', esUrl, error);
        throw new Error('Error communicating with Elasticsearch', esUrl, error);
      });
  };
};

export default { search, fetchWork };
