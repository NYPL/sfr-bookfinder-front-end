import appConfig from "~/config/appConfig";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { searchQuery } from "../../stores/Reducers";
import { ApiSearchQuery, SearchQuery } from "../../types/SearchQuery";
import { ApiSearchResult } from "../../types/DataModel";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";

//TODO env variables
const appEnv = "development";
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath, editionPath, languagesPath } = appConfig.api;
const totalWorksPath = appConfig.booksCount.apiUrl;
const searchUrl = apiUrl + searchPath[appEnv];
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const languagesUrl = apiUrl + languagesPath;
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

export const searchResultsFetcher = async (query: ApiSearchQuery) => {
  //TODO Error handling
  if (!query || !query.queries) {
    throw new Error("no query");
  }

  const res = await fetch(searchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query), // body data type must match "Content-Type" header
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

export const languagesFetcher = async () => {
  const res = await fetch(languagesUrl);
  if (res.ok) {
    return res.json();
  } else {
    console.log("res not ok", res.status, res.statusText);
  }
};
