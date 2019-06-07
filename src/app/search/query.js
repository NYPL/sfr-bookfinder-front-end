import { initialSearchQuery } from '../stores/InitialState';

export const getRequestParams = (query = {}) => {
  const { field = 'keyword', workId = '' } = query;
  const q = query.query || '*';
  let ret = Object.assign({}, query, { query: q, field, workId });

  if (query.filters && typeof query.filters === 'string') {
    const filters = JSON.parse(query.filters);
    ret = Object.assign({}, ret, { filters });
  }
  if (query.sort && typeof query.sort === 'string') {
    const sort = JSON.parse(query.sort);
    ret = Object.assign({}, ret, { sort });
  }

  return ret;
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
  console.log('query', query);
  if (!query.query) {
    throw new Error('A valid query string must be passed');
  }

  let queryField = query.field || initialSearchQuery.field;
  if (Array.isArray(query.field)) {
    queryField = query.field.join('|');
  }
  const parsedQuery = parseQuery(query.query);
  let ret = Object.assign({}, initialSearchQuery, query, { query: parsedQuery, field: queryField });
  if (query.filters && typeof query.filters === 'string') {
    const filters = JSON.parse(query.filters);
    ret = Object.assign({}, ret, { filters });
  }
  if (query.sort && typeof query.sort === 'string') {
    const sort = JSON.parse(query.sort);
    ret = Object.assign({}, ret, { sort });
  }
  return ret;
};

export const getQueryString = query => Object.keys(query)
  .map(key => [key, query[key]]
    .map((o) => {
      let ret = o;
      if (typeof o === 'object') {
        ret = JSON.stringify(o);
      }
      return encodeURIComponent(ret);
    })
    .join('='))
  .join('&');

export default {
  getRequestParams,
  buildQueryBody,
};
