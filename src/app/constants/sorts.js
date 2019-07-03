export const sortMap = {
  Relevance: [],
  'Title A-Z': [{ field: 'title', dir: 'ASC' }],
  'Title Z-A': [{ field: 'title', dir: 'DESC' }],
  'Author A-Z': [{ field: 'author', dir: 'ASC' }],
  'Author Z-A': [{ field: 'author', dir: 'DESC' }],
  'Year Published (Old-New)': [{ field: 'date', dir: 'ASC' }],
  'Year Published (New-Old)': [{ field: 'date', dir: 'DESC' }],
};

export const numbersPerPage = [10, 20, 50, 100];

export default { sortMap, numbersPerPage };
