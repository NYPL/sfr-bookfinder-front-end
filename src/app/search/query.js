import { isArray as _isArray } from 'underscore';
import { initialSearchQuery } from '../stores/InitialState';

export const getRequestParams = (query = {}) => {
  const { field = 'keyword', workId = '' } = query;
  const q = query.query || '*';

  return Object.assign({}, query, { query: q, field, workId });
};

/**
 * Strip punctuation and process spaces as plus signs for final split.
 * ES characters to escape before sending: + - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /
 * @param {string} queryString
 *
 * @returns {string}
 */
const parseQuery = (queryString) => {
  const queryArr = queryString
    .replace(/[=(&&)(||)><!(){}\[\]^"~\*\?:\/-]/g, '$&')
    .trim()
    .replace(/\s+/g, '+')
    .split('+')
    .join(' ');
  return queryArr;
};

/**
 * @param {string} query, {string} field
 * @return {object}
 */
export const buildQueryBody = (query) => {
  if (!query.query) {
    throw new Error('A valid query string must be passed');
  }

  let queryField = query.field || initialSearchQuery.field;
  if (_isArray(query.field)) {
    queryField = query.field.join('|');
  }
  const parsedQuery = parseQuery(query.query);
  return Object.assign({}, initialSearchQuery, query, { query: parsedQuery, field: queryField });
};

export const getQueryString = query => new URLSearchParams(query).toString();

// export const getQueryString = query => Object.keys(query)
//   .map(key => [key, query[key]].map(encodeURIComponent).join('='))
//   .join('&');

export default {
  getRequestParams,
  buildQueryBody,
};
