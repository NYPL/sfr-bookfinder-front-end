import { isArray as _isArray } from 'underscore';

export const getRequestParams = (query = {}) => {
  const { q = '*' } = query;
  const { field = 'keyword' } = query;
  const { workId = '' } = query;

  return { q, field, workId };
};

/**
 * Strip punctuation and process spaces as plus signs for final split.
 * ES characters to escape before sending: + - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /
 * @param {string} queryString
 *
 * @returns {string}
*/
const parseQuery = (queryString) => {
  const queryArr = queryString.replace(/[=(&&)(||)><!(){}\[\]^"~\*\?:\/-]/g, '\$&')
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
export const buildQueryBody = (query, field = 'keyword') => {
  if (!query) {
    throw new Error('A valid query string must be passed');
  }

  let queryField = field;
  if (_isArray(field)) {
    queryField = field.join('|');
  }
  const parsedQuery = parseQuery(query);
  return { query: parsedQuery, field: queryField };
};

export default {
  getRequestParams,
  buildQueryBody,
};
