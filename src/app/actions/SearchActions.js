import axios from 'axios';
import { Actions } from './Actions';
import appConfig from '../../../appConfig';

export const searchResults = (results) => {
  return {
    type: Actions.SEARCH,
    results,
  };
};

export const search = (query, filter = 'q') => {
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURI(query) : 'test';
  // Need a client to send the search and receive results
  // Need to pass the results to a renderer
  const apiUrl = appConfig.esUrl.development;

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
