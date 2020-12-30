import appConfig from "~/config/appConfig";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { searchQuery } from "../../stores/Reducers";
import { ApiSearchQuery, SearchQuery } from "../../types/SearchQuery";
import { ApiSearchResult } from "../../types/DataModel";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";

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

const defaultWorkQuery: WorkQuery = {
  identifier: "",
  recordType: "editions",
  showAll: "false",
};

const defaultEditionQuery = {
  editionIdentifier: "",
  showAll: "false",
};

//TODO: Lower Priority: combine SearchQuery and ApiSearchQuery
// ShowQueries can be derived
// RecordType and total can be passed through

export const searchResultsFetcher = async (query: SearchQuery) => {
  //TODO Error handling
  if (!query.queries) {
    throw new Error("no query");
  }

  const apiQuery = {
    queries: query.queries,
    recordType: initialApiQuery.recordType,
    filters: query.filters ? query.filters : initialApiQuery.filters,
    sort: query.sort ? query.sort : initialApiQuery.sort,
    per_page: query.perPage ? query.perPage : initialApiQuery.per_page,
    page: query.page ? query.page : initialApiQuery.page,
    total: initialApiQuery.total,
  };

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

export const workFetcher = async (query: WorkQuery) => {
  const workApiQuery = {
    identifier: query.identifier,
    recordType: query.recordType
      ? query.recordType
      : defaultWorkQuery.recordType,
    showAll: query.showAll ? query.showAll : defaultWorkQuery.showAll,
  };

  const res = await fetch(recordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workApiQuery), // body data type must match "Content-Type" header
  });

  if (res.ok) {
    const workResult: WorkResult = await res.json();
    return workResult;
  } else {
    //TODO Error handling
    console.log("res not ok", res.status, res.statusText);
  }
};

export const editionFetcher = async (query: EditionQuery) => {
  const editionApiQuery = {
    editionIdentifier: query.editionIdentifier,
    showAll: query.showAll ? query.showAll : defaultEditionQuery.showAll,
  };

  const res = await fetch(editionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editionApiQuery), // body data type must match "Content-Type" header
  });

  if (res.ok) {
    const editionResult: EditionResult = await res.json();
    return editionResult;
  } else {
    //TODO Error handling
    console.log("res not ok", res.status, res.statusText);
  }
};
