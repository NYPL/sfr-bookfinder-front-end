import appConfig from "~/config/appConfig";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { ApiSearchQuery, ApiSearchResult } from "../../types/SearchQuery";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";
import { toLocationQuery } from "~/src/util/apiConversion";
import { LinkResult } from "~/src/types/LinkQuery";
import { ApiLanguageResponse } from "~/src/types/LanguagesQuery";
import { LOGIN_LINK_BASE } from "~/src/constants/links";

const apiEnv = process.env["APP_ENV"];
const apiUrl = process.env["API_URL"] || appConfig.api.url[apiEnv];

const { searchPath, recordPath, editionPath, readPath, languagesPath } =
  appConfig.api;
const searchUrl = apiUrl + searchPath;
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const readUrl = apiUrl + readPath;
const languagesUrl = apiUrl + languagesPath;

const defaultWorkQuery: WorkQuery = {
  identifier: "",
  showAll: "true",
};

const defaultEditionQuery = {
  editionIdentifier: "",
  showAll: "true",
};

export const proxyUrlConstructor = () => {
  return (
    process.env["NEXT_PUBLIC_PROXY_URL"] || apiUrl + "/utils/proxy?proxy_url="
  );
};

export const searchResultsFetcher = async (apiQuery: ApiSearchQuery) => {
  if (!apiQuery || !apiQuery.query) {
    throw new Error("no query");
  }

  const searchApiQuery = {
    ...apiQuery,
  };
  const url = new URL(searchUrl);
  url.search = new URLSearchParams(toLocationQuery(searchApiQuery)).toString();

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

export const fulfillFetcher = async (fulfillUrl, nyplIdentityCookie) => {
  const url = new URL(fulfillUrl);
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${nyplIdentityCookie.access_token}`,
    },
  });
  if (res.ok) {
    return res.url;
  } else {
    // redirect to the NYPL login page if access token is invalid
    if (res.status === 401) {
      return LOGIN_LINK_BASE + encodeURIComponent(window.location.href);
    }
    throw new Error(`Unable to download UP PDF`);
  }
};
