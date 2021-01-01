import { ApiSearchQuery, SearchQuery } from "../types/SearchQuery";

export const getRequestParams = (query = {}) => {
  let ret = Object.assign({}, query);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'query' does not exist on type '{}'.
  if (query.query && !query.field) {
    ret = Object.assign({}, ret, { field: "keyword" });
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'field' does not exist on type '{}'.
  if (query.field && !query.query) {
    ret = Object.assign({}, ret, { query: "*" });
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type '{}'.
  if (query.filters && typeof query.filters === "string") {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type '{}'.
    const filters = JSON.parse(query.filters);
    ret = Object.assign({}, ret, { filters });
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type '{}'.
  if (query.sort && typeof query.sort === "string") {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type '{}'.
    const sort = JSON.parse(query.sort);
    ret = Object.assign({}, ret, { sort });
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'queries' does not exist on type '{}'.
  if (query.queries && typeof query.queries === "string") {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'queries' does not exist on type '{}'.
    const queries = JSON.parse(query.queries);
    ret = Object.assign({}, ret, { queries });
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'showQueries' does not exist on type '{}'... Remove this comment to see the full error message
  if (query.showQueries && typeof query.showQueries === "string") {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showQueries' does not exist on type '{}'... Remove this comment to see the full error message
    const showQueries = JSON.parse(query.showQueries);
    ret = Object.assign({}, ret, { showQueries });
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
const parseQuery = (queryString: any) => {
  const queryArr =
    queryString &&
    queryString
      .replace(/[=(&&)(||)><!(){}\[\]^"~\*\?:\/-]/g, "$&")
      .trim()
      .replace(/\s+/g, "+")
      .split("+")
      .join(" ");
  return queryArr;
};

export const getQueryString = (query: any) =>
  query &&
  Object.keys(query)
    .map((key) =>
      [key, query[key]]
        .map((o) => {
          let ret = o;
          if (typeof o === "object") {
            ret = JSON.stringify(o);
          }
          return encodeURIComponent(ret);
        })
        .join("=")
    )
    .join("&");

export default {
  getRequestParams,
};
