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
  // Strip punctuation and process spaces as plus signs for final split.
  const queryArr = queryString.replace(/[.,\/#!$%\^&;:{}=\-_`~()]/g, '').trim().replace(/\s+/g, '+').split('+');

  // For each string in queryArr, add a field query object.
  queryArr.map(query => (
    fieldQuery.push({ field, value: encodeURIComponent(query) })
  ));

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
