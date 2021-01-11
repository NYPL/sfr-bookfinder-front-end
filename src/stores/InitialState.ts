import PropTypes from "prop-types";
import { ApiSearchQuery, SearchQuery } from "../types/SearchQuery";

export const initialApiSearchQuery: ApiSearchQuery = {
  per_page: 10,
  page: 0,
  total: 0,
  filters: [],
  sort: [],
  queries: [{ query: "", field: "keyword" }],
};

export const initialSearchQuery: SearchQuery = {
  perPage: 10,
  page: 0,
  filters: [],
  filterYears: { start: null, end: null },
  sort: { field: "relevance", dir: "DESC" },
  queries: [],
};

type searchQueryPropTypes = {
  per_page?: string | number;
  page?: string | number;
  total?: string | number;
  filters?: any[];
  queries?: any[];
  showQueries?: any[];
  sort?: any[];
};

const searchQueryPropTypes: PropTypes.Requireable<searchQueryPropTypes> = PropTypes.shape(
  {
    per_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    filters: PropTypes.arrayOf(PropTypes.any),
    queries: PropTypes.arrayOf(PropTypes.any),
    showQueries: PropTypes.arrayOf(PropTypes.any),
    sort: PropTypes.arrayOf(PropTypes.any),
  }
);
export { searchQueryPropTypes };

const initialState = {
  searchResults: {},
  searchQuery: initialApiSearchQuery,
  workResult: { instances: [], editions: [] },
  totalWorks: {},
};

export const initialEditionState = {
  query: {},
  editionResult: {},
};

export default initialState;
