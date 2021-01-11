import appConfig from "~/config/appConfig";
import { initialSearchQuery } from "../stores/InitialState";
import {
  ApiSearchQuery,
  SearchQuery,
  Query,
  Filter,
  Sort,
  ApiFilter,
} from "../types/SearchQuery";
import {
  toApiFilters,
  toApiQuery,
  toFilters,
  toFilterYears,
} from "./apiConversion";
import {
  findFiltersExceptField,
  findFiltersForField,
} from "./SearchQueryUtils";

//TODO env variables
const appEnv = "development";
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath, editionPath } = appConfig.api;
const totalWorksPath = appConfig.booksCount.apiUrl;
const searchUrl = apiUrl + searchPath[appEnv];
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const totalWorksUrl = apiUrl + totalWorksPath;

const initialApiQuery: ApiSearchQuery = {
  queries: [],
  recordType: "editions",
  filters: [],
  sort: [
    {
      field: "title",
      dir: "asc",
    },
  ],
  per_page: 10,
  page: 0,
  total: 1000,
};

//Takes the query string from URL and parses it into a SearchQuery object
export function parseLocationQuery(queryString: any): ApiSearchQuery {
  const query = queryString;

  const parseIfString = (value: any) => {
    if (typeof value === "string") {
      return JSON.parse(value);
    } else {
      return value;
    }
  };

  //   const query: SearchQuery = JSON.parse(queryString);
  if (!query.queries && !query.showQueries) {
    //TODO: redirect
    return null;
  } else {
    const {
      filters,
      page,
      perPage,
      queries,
      sort,
    }: {
      filters: ApiFilter[] | string;
      page: number | string;
      perPage: number | string;
      queries: Query[] | string;
      showQueries: Query[] | string;
      sort: Sort[] | string;
    } = query;

    return {
      queries: parseIfString(queries),
      filters: filters ? parseIfString(filters) : initialApiQuery.filters,
      page: page ? parseIfString(page) : initialApiQuery.page,
      per_page: perPage ? parseIfString(perPage) : initialApiQuery.per_page,
      //TODO: Filter out viaf
      sort: sort ? parseIfString(sort) : initialApiQuery.sort,
    };
  }
}

/**
 * Converts an API search query object to a NextJS query object
 * NextJS Router accepts query objects of type { [key: string]: string }
 *
 * @param searchQuery
 */
export const toLocationQuery = (searchQuery: ApiSearchQuery) => {
  return Object.assign(
    {},
    ...Object.keys(searchQuery).map((key) => ({
      [key]: JSON.stringify(searchQuery[key]),
    }))
  );
};
