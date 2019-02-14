export const getRequestParams = (query = {}) => {
  const { q = '*' } = query;
  const { field = 'keyword' } = query;
  const { workId = '' } = query;

  return { q, field, workId };
};

export default getRequestParams;
