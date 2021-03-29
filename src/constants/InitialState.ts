import { ApiSearchQuery, SearchQuery } from "../types/SearchQuery";

export const initialApiSearchQuery: ApiSearchQuery = {
  per_page: 10,
  page: 0,
  total: 0,
  filters: [],
  sort: [],
  query: [{ keyword: "" }],
};

export const initialSearchQuery: SearchQuery = {
  perPage: 10,
  page: 0,
  filters: [],
  filterYears: { start: null, end: null },
  sort: { field: "relevance", dir: "DESC" },
  queries: [],
  showAll: false,
};

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
