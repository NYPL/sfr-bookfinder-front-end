export const getRequestParams = (query = {}) => {
  let ret = Object.assign({}, query);
  if (query.query && !query.field) {
    ret = Object.assign({}, ret, { field: 'keyword' });
  }
  if (query.field && !query.query) {
    ret = Object.assign({}, ret, { query: '*' });
  }

  if (query.filters && typeof query.filters === 'string') {
    const filters = JSON.parse(query.filters);
    ret = Object.assign({}, ret, { filters });
  }
  if (query.sort && typeof query.sort === 'string') {
    const sort = JSON.parse(query.sort);
    ret = Object.assign({}, ret, { sort });
  }
  if (query.queries && typeof query.queries === 'string') {
    const queries = JSON.parse(query.queries);
    ret = Object.assign({}, ret, { queries });
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
    && queryString
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
  let ret = Object.assign({}, query);
  let queryField = query.field;
  if (Array.isArray(query.field)) {
    queryField = query.field.join('|');
  }
  if (queryField) {
    ret = Object.assign({}, ret, { field: queryField });
  } else if (query.query) {
    ret = Object.assign({}, ret, { field: 'keyword' });
  }
  const parsedQuery = parseQuery(query.query);
  if (parsedQuery) {
    ret = Object.assign({}, ret, { query: parsedQuery });
  }
  if (query.filters && typeof query.filters === 'string') {
    const filters = JSON.parse(query.filters);
    ret = Object.assign({}, ret, { filters });
  }
  if (query.sort && typeof query.sort === 'string') {
    const sort = JSON.parse(query.sort);
    ret = Object.assign({}, ret, { sort });
  }
  if (query.queries && typeof query.queries === 'string') {
    const queries = JSON.parse(query.queries);
    ret = Object.assign({}, ret, { queries });
  } else if (query.queries) {
    const queries = query.queries.map(q => ({ query: parseQuery(q.query), field: q.field }));
    ret = Object.assign({}, ret, { queries });
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
