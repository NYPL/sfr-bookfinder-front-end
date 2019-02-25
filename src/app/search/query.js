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
 */
const addFieldQuery = (queryString, field = 'keyword') => {
  if (!queryString) {
    throw new Error('A valid query string must be passed');
  }
  let fieldQuery = [];
  /**
   * Strip punctuation and process spaces as plus signs for final split.
   * ES characters to escape before sending: + - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /
   * For multiple strings in a query, join with a space.
   */
  const queryArr = queryString.replace(/[=(&&)(||)><!(){}\[\]^"~\*\?:\/-]/g, '\\$&').trim().replace(/\s+/g, '+').split('+');
  const esQuery = (queryArr.length > 1) ? queryArr.join(' ') : queryArr.join('');

  // TODO: add an additional check on empty queries after the terms are processed.

  fieldQuery.push({ field, value: esQuery });

  return fieldQuery;
};

/**
 * Uses a special format as provided by the ResearchNow Search API.
 * Format with possible values:
 * {
 *   queries:
 *   [{
 *        field: 'keyword',
 *        value: 'branch'
 *   }],
 *   filters:
 *   [{
 *        field: 'language',
 *        value: 'fr'
 *   }],
 *   sort:
 *   [{
 *        field: 'title.keyword',
 *        dir: 'asc'
 *   }],
 *   aggregations:
 *   [{
 *        type: 'terms',
 *        field: 'title.keyword'
 *   }],
 *   per_page: 10,
 *   page: 0
 * }
 * 
 * @param {object} queryObj
 * @return {object}
 */
export const buildQueryBody = (queryObj = {}) => {
  let queryBody = {};
  if (queryObj.query) {
    const { userQuery, field } = queryObj.query;
    queryBody.queries = addFieldQuery(userQuery, field);
  }

  return queryBody;
};

export default {
  getRequestParams,
  buildQueryBody,
};
