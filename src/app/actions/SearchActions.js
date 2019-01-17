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

export const search = (query, field = 'q') => {
  const appEnv = process.env.APP_ENV || 'production';
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURIComponent(query) : '*';
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
      .catch((error) => {
        console.log('Error communicating with Elasticsearch', apiUrl, userQuery, error);
        throw new Error('Error communicating with Elasticsearch', apiUrl, userQuery, error);
      });
  };
};

export default { search };
