import appConfig from "~/config/appConfig";
import {
  ApiSearchQuery,
  SearchQuery,
  Query,
  Filter,
  Sort,
} from "../types/SearchQuery";
import { toApiFilters, toApiQuery } from "./apiConversion";

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
      //TODO: Something's wrong with sort
      sort: sort ? parseIfString(sort) : initialApiQuery.sort,
    };
    return newQuery;
  }
}

//Takes a SearchQuery object and parses it into a location string
// export const queryToString = (searchQuery: SearchQuery) => {
//   // Get difference from defaultQuery
//   const apiQuery = toApiQuery(searchQuery);
//   console.log("apiQuery", apiQuery);
//   debugger;
//   return Object.keys(apiQuery)
//     .map((key) =>
//       [key, apiQuery[key]]
//         .map((o) => {
//           let ret = o;
//           if (typeof o === "object") {
//             ret = JSON.stringify(o);
//           }
//           return encodeURIComponent(ret);
//         })
//         .join("=")
//     )
//     .join("&");
// };

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
