import { isArray as _isArray } from 'underscore';

export const getRequestParams = (query = {}) => {
  const { q = '*' } = query;
  const { field = 'keyword' } = query;
  const { workId = '' } = query;

  return { q, field, workId };
};

/**
 * Format a single field query or field queries based on string sent. Strings
 * are broken up by word to AND them together by adding a separate field/value
 * object for each word given.
 *
 * @param {string} queryString
 * @param {string} field
 *
 * @returns {string}
const addFieldQuery = (queryString, field = 'keyword') => {
  if (!queryString) {
    throw new Error('A valid query string must be passed');
  }
  const fieldQuery = [];
  /**
   * Strip punctuation and process spaces as plus signs for final split.
   * ES characters to escape before sending: + - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /
   */
  /**
  const queryArr = queryString.replace(/[=(&&)(||)><!(){}\[\]^"~\*\?:\/-]/g, '\$&').trim()
  .replace(/\s+/g, '+').split('+');

  // TODO: add an additional check on empty queries after the terms are processed.

  fieldQuery.push({ field, value: queryArr.join(' ') });

  return fieldQuery;
};
 */


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
 * Uses a special format as provided by the ResearchNow Search API.
 * Format with possible values:
{
  "field": "keyword|title|author|subject",
  "query": "\"Personal Anecodotes\" OR narrative",
  "filters": [{
    "field": "language",
    "value": "it"
  }],
  "sort": [{
    "field": "title.keyword",
    "dir": "asc"
  }],
  "aggregations": [{
    "type": "terms",
    "field": "entities.name.keyword"
  }],
  "per_page": 10,
  "page": 0
}
 * @param {object} queryObj
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
