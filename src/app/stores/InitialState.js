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
};

export const searchQueryPropTypes = PropTypes.shape({
  query: PropTypes.string,
  field: PropTypes.string,
  showQuery: PropTypes.string,
  showField: PropTypes.string,
  per_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

const initialState = {
  searchResults: {},
  searchQuery: initialSearchQuery,
  sort: {
    sortFilter: 'title',
    sortOrder: 'asc',
  },
  workDetail: { instances: [] },
};

export default initialState;
