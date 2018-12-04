import axios from 'axios';
import appConfig from '../../../appConfig';

export const Actions = {
  SEARCH: 'SEARCH',
};

export const searchResults = (results) => {
  return {
    type: Actions.SEARCH,
    results,
  };
};

export const search = (query, filter = 'q') => {
  const appEnv = process.env.NODE_ENV || 'production';
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURI(query) : '*';
  // Need a client to send the search and receive results
  // Need to pass the results to a renderer
  const apiUrl = appConfig.api[appEnv];

  return (dispatch) => {
    return axios.get(apiUrl, { params: { q: userQuery } })
      .then((resp) => {
        if (resp.data) {
          dispatch(searchResults(resp.data));
        }
      })
      .catch((err) => {
        console.log('Query error', err);
        throw new Error('Query error', err);
      });
  };
};

export default search;
