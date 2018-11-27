import appConfig from '../../../appConfig';
import { getRequestParams } from '../../app/search/query';

function search(query, filters, results) {
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
        console.log(resp.data);
        // Update the search results object?
        results(resp.data);
      } else {
        console.log('API not responding', apiUrl);
      }
    })
    .catch((error) => {
      console.log('Query error', error);
    });

  return queryResp;
}

function searchServer(req, res, next) {
  const { q, filters } = getRequestParams(req.query);

  search(
    q,
    filters,
    (results) => {
      res.locals.data.Store = {
        searchResults: results,
        searchKeyword: q,
        error: {},
      };

      next();
    },
    (error) => {
      console.log('Error returning results server side.', error);
      next();
    },
  );
}

export default { searchServer, search };
