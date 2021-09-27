import appConfig from "~/config/appConfig";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { ApiSearchQuery, ApiSearchResult } from "../../types/SearchQuery";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";
import { toLocationQuery } from "~/src/util/apiConversion";
import { LinkResult } from "~/src/types/LinkQuery";
import { ApiLanguageResponse } from "~/src/types/LanguagesQuery";

const apiEnv = process.env["APP_ENV"];
const apiUrl = process.env["API_URL"] || appConfig.api.url[apiEnv];

const { searchPath, recordPath, editionPath, readPath, languagesPath } =
  appConfig.api;
const searchUrl = apiUrl + searchPath;
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const readUrl = apiUrl + readPath;
const languagesUrl = apiUrl + languagesPath;
export const proxyUrl =
  process.env["PROXY_URL"] || apiUrl + "/utils/proxy?proxy_url=";

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
    throw new Error(`cannot find work with identifier ${query.identifier}`);
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
    throw new Error(
      `cannot find work with identifier ${query.editionIdentifier}`
    );
  }
};

export const languagesFetcher = async () => {
  const url = new URL(languagesUrl);

  const res = await fetch(url.toString());
  if (res.ok) {
    const languagesResult: ApiLanguageResponse = await res.json();
    return languagesResult;
  } else {
    return {
      status: "Cannot find list of languages",
      data: [],
    };
  }
};

export const readFetcher = async (linkId: number) => {
  const url = new URL(readUrl + "/" + linkId);
  const res = await fetch(url.toString());

  if (res.ok) {
    const linkResult: LinkResult = await res.json();
    return linkResult;
  } else {
    throw new Error(`cannot find work with linkId ${linkId}`);
  }
};
