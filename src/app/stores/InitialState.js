import PropTypes from 'prop-types';

export const initialSearchQuery = {
  query: '',
  field: 'keyword',
  showQuery: '',
  showField: '',
  per_page: 10,
  page: 0,
  total: 0,
  filters: [],
  sort: [],
  queries: [],
};

export const searchQueryPropTypes = PropTypes.shape({
  query: PropTypes.string,
  field: PropTypes.string,
  showQuery: PropTypes.string,
  showField: PropTypes.string,
  per_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filters: PropTypes.arrayOf(PropTypes.any),
  queries: PropTypes.arrayOf(PropTypes.any),
  sort: PropTypes.arrayOf(PropTypes.any),
});

const initialState = {
  searchResults: {},
  searchQuery: initialSearchQuery,
  workDetail: { instances: [] },
  totalWorks: {},
};

export default initialState;
