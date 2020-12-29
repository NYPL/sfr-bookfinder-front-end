import appConfig from "~/config/appConfig";
import {
  ApiSearchQuery,
  SearchQuery,
  Query,
  Filter,
  Sort,
} from "../types/SearchQuery";

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
export function parseLocationQuery(queryString: any): SearchQuery {
  console.log("parse Location query0", queryString);
  const query = queryString;

  const parseIfString = (value) => {
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
      showQueries,
      sort,
    }: {
      filters: Filter[] | string;
      page: number | string;
      perPage: number | string;
      queries: Query[] | string;
      showQueries: Query[] | string;
      sort: Sort[] | string;
    } = query;

    const newQuery: SearchQuery = {
      queries: parseIfString(queries),
      filters: filters ? parseIfString(filters) : initialApiQuery.filters,
      page: page ? parseIfString(page) : initialApiQuery.page,
      perPage: perPage ? parseIfString(perPage) : initialApiQuery.per_page,
      //TODO: Filter out viaf
      showQueries: showQueries
        ? parseIfString(showQueries)
        : parseIfString(queries),
      //TODO: Something's wrong with sort
      sort: sort ? parseIfString(sort) : initialApiQuery.sort,
    };
    return newQuery;
  }
}

//Takes a SearchQuery object and parses it into a location string
export const queryToString = (query: SearchQuery) =>
  query &&
  Object.keys(query)
    .map((key) =>
      [key, query[key]]
        .map((o) => {
          let ret = o;
          if (typeof o === "object") {
            ret = JSON.stringify(o);
          }
          return encodeURIComponent(ret);
        })
        .join("=")
    )
    .join("&");
