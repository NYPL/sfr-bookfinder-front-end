import appConfig from "~/config/appConfig";
import { CollectionQuery, CollectionResult } from "~/src/types/CollectionQuery";

const apiEnv = process.env["APP_ENV"];
const apiUrl = process.env["API_URL"] || appConfig.api.url[apiEnv];

const { collectionPath } = appConfig.api;
const collectionUrl = apiUrl + collectionPath;
export const collectionFetcher = async (query: CollectionQuery) => {
  const collectionApiQuery = {
    ...query,
  };

  const url = new URL(collectionUrl + "/" + query.identifier);
  url.search = new URLSearchParams(collectionApiQuery.toString()).toString();
  const res = await fetch(url.toString());

  if (res.ok) {
    try {
      const collectionResult: CollectionResult = await res.json();
      return collectionResult;
    } catch (e) {
      throw new Error(e.error);
    }
  } else {
    throw new Error(
      `cannot find collection with identifier ${query.identifier}`
    );
  }
};
