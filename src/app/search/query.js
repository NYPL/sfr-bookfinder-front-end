export const getRequestParams = (query = {}) => {
  const { q } = query || '*';
  const { field } = query || 'title';
  const { workId } = query || '';

  return { q, field, workId };
};

export default getRequestParams;
