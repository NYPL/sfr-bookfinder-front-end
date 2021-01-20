/**
 * Given a string such as:
 *
 * https://example.com/foo?bar=zip&name=Sam
 *
 * Will return:
 *
 * {
 *   bar: 'zip',
 *   name: 'Sam',
 * }
 */
export const queryFromUrl = (url: string) => {
  const [, ...queryStrings] = url.split("?");
  const queryString = queryStrings.join("?");
  const query = {};

  const entries = Array.from(new URLSearchParams(queryString).entries());

  for (const [key, value] of entries) {
    query[key] = value;
  }

  return query;
};
