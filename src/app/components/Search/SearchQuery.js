import axios from 'axios';
import appConfig from '../../../../appConfig';

function performSearch(query, filter) {
  // Need a filter to use; default to 'q'
  const defaultFilter = filter;
  // Need a parsed query input to use for each filter
  const userQuery = (query) ? encodeURI(query) : 'test';
  // Need a client to send the search and receive results
  // Need to pass the results to a renderer
  const apiUrl = appConfig.esUrl.development;
  let queryResp = {};

  queryResp = axios.get(apiUrl, { params: { q: userQuery } })
    .then((resp) => {
      if (resp.data) {
        // Update the search results object?
        const response = resp.data;
        return response;
      }
    })
    .catch((err) => {
      console.log('Query error', err);
    });

  return queryResp;
}

export default performSearch;
