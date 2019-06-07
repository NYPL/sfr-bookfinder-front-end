export const sortMap = {
  Relevance: [],
  'Title A-Z': [{ field: 'title', dir: 'ASC' }],
  'Title Z-A': [{ field: 'title', dir: 'DESC' }],
};

export const numbersPerPage = [10, 20, 50, 100];

export default { sortMap, numbersPerPage };
