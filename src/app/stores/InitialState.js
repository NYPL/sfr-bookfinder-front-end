import PropTypes from 'prop-types';

export const initialSearchQuery = {
  query: '',
  field: 'keyword',
  showQuery: '',
  showField: '',
  per_page: 10,
  page: 1,
};

export const searchQueryPropTypes = PropTypes.shape({
  query: PropTypes.string,
  field: PropTypes.string,
  showQuery: PropTypes.string,
  showField: PropTypes.string,
  per_page: PropTypes.number || PropTypes.string,
  page: PropTypes.number || PropTypes.string,
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
