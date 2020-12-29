import appConfig from "~/config/appConfig";
import { searchQuery } from "../stores/Reducers";
import { ApiSearchQuery, SearchQuery } from "../types/SearchQuery";
import { ApiSearchResult } from "../types/SearchResults";

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

//TODO: Lower Priority: combine SearchQuery and ApiSearchQuery
// ShowQueries can be derived
// RecordType and total can be passed through
function getApiQuery(query: SearchQuery): ApiSearchQuery {
  const newQuery = {
    queries: query.queries,
    recordType: initialApiQuery.recordType,
    filters: query.filters ? query.filters : initialApiQuery.filters,
    sort: query.sort ? query.sort : initialApiQuery.sort,
    per_page: query.perPage ? query.perPage : initialApiQuery.per_page,
    page: query.page ? query.page : initialApiQuery.page,
    total: initialApiQuery.total,
  };
  return newQuery;
}

export const searchResultsFetcher = async (query: SearchQuery) => {
  console.log("useSearch query", query);
  //TODO Error handling
  if (!query.queries) {
    throw new Error("no query");
  }

  const apiQuery = getApiQuery(query);

  const res = await fetch(searchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiQuery), // body data type must match "Content-Type" header
  });

  if (res.ok) {
    const searchResult: ApiSearchResult = await res.json();
    return searchResult;
  } else {
    //TODO Error handling
    console.log("res not ok", res.status, res.statusText);
  }
};