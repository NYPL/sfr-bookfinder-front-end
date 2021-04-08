import appConfig from "~/config/appConfig";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { ApiSearchQuery } from "../../types/SearchQuery";
import { ApiSearchResult } from "../../types/DataModel";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";
import { toLocationQuery } from "~/src/util/apiConversion";

//TODO env variables
const appEnv = "development";
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath, editionPath, languagesPath } = appConfig.api;
const searchUrl = apiUrl + searchPath[appEnv];
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const languagesUrl = apiUrl + languagesPath;

const defaultWorkQuery: WorkQuery = {
  identifier: "",
  showAll: "true",
};

const defaultEditionQuery = {
  editionIdentifier: "",
  showAll: "true",
};

export const searchResultsFetcher = async (apiQuery: ApiSearchQuery) => {
  if (!apiQuery || !apiQuery.query) {
    throw new Error("no query");
  }
  const url = new URL(searchUrl);
  url.search = new URLSearchParams(toLocationQuery(apiQuery)).toString();

  const res = await fetch(url.toString());

  if (res.ok) {
    const searchResult: ApiSearchResult = await res.json();
    return searchResult;
  } else {
    throw new Error(res.statusText);
  }
};

export const workFetcher = async (query: WorkQuery) => {
  const workApiQuery = {
    showAll:
      typeof query.showAll !== "undefined"
        ? query.showAll
        : defaultWorkQuery.showAll,
  };

  const url = new URL(recordUrl + "/" + query.identifier);
  url.search = new URLSearchParams(workApiQuery).toString();

  const res = await fetch(url.toString());

  if (res.ok) {
    const workResult: WorkResult = await res.json();
    return workResult;
  } else {
    throw new Error(res.statusText);
  }
};

export const editionFetcher = async (query: EditionQuery) => {
  const editionApiQuery = {
    showAll:
      typeof query.showAll !== "undefined"
        ? query.showAll
        : defaultEditionQuery.showAll,
  };

  const url = new URL(editionUrl + "/" + query.editionIdentifier);
  url.search = new URLSearchParams(editionApiQuery).toString();
  const res = await fetch(url.toString());

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
