import appConfig from "~/config/appConfig";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { ApiSearchQuery } from "../../types/SearchQuery";
import { ApiSearchResult } from "../../types/DataModel";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";
const { URL, URLSearchParams } = require("url");

//TODO env variables
const appEnv = "development";
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath, editionPath, languagesPath } = appConfig.api;
// const totalWorksPath = appConfig.booksCount.apiUrl;
const searchUrl = apiUrl + searchPath[appEnv];
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const languagesUrl = apiUrl + languagesPath;
// const totalWorksUrl = apiUrl + totalWorksPath;

const defaultWorkQuery: WorkQuery = {
  identifier: "",
  recordType: "editions",
  showAll: "false",
};

const defaultEditionQuery = {
  editionIdentifier: "",
  showAll: "true",
};

export const searchResultsFetcher = async (apiQuery: ApiSearchQuery) => {
  console.log("query", apiQuery);
  if (!apiQuery || !apiQuery.query) {
    throw new Error("no query");
  }
  const url = new URL(searchUrl);
  url.search = new URLSearchParams(apiQuery).toString();
  console.log("searchUrl", url);

  const res = await fetch(url);

  if (res.ok) {
    console.log("ok");
    const searchResult: ApiSearchResult = await res.json();
    return searchResult;
  } else {
    throw new Error(res.statusText);
  }
};

export const workFetcher = async (query: WorkQuery) => {
  const workApiQuery = {
    identifier: query.identifier,
    recordType: query.recordType
      ? query.recordType
      : defaultWorkQuery.recordType,
    showAll:
      typeof query.showAll !== "undefined"
        ? query.showAll
        : defaultWorkQuery.showAll,
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
    throw new Error(res.statusText);
  }
};

export const editionFetcher = async (query: EditionQuery) => {
  const editionApiQuery = {
    editionIdentifier: query.editionIdentifier,
    showAll:
      typeof query.showAll !== "undefined"
        ? query.showAll
        : defaultEditionQuery.showAll,
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
    throw new Error(res.statusText);
  }
};

export const languagesFetcher = async () => {
  const res = await fetch(languagesUrl);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};
