function getRequestParams(query = {}) {
  const q = query.q || '';
  const filters = query.filters || {};

  return { q, filters };
}

export default getRequestParams;
