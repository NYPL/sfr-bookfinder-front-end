export const getRequestParams = (query = {}) => {
  const q = query.q || 'test';
  const filters = query.filters || {};

  return { q, filters };
};

export default getRequestParams;
