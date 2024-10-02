import appConfig from "~/config/appConfig";
import { CollectionQuery } from "~/src/types/CollectionQuery";
import { Opds2Feed } from "~/src/types/OpdsModel";
import {
  toApiCollectionQuery,
  toLocationQuery,
} from "~/src/util/apiConversion";
import { log } from "../newrelic/NewRelic";

const apiEnv = process.env["APP_ENV"];
const apiUrl = process.env["API_URL"] || appConfig.api.url[apiEnv];

const { collectionPath } = appConfig.api;
const collectionUrl = apiUrl + collectionPath;
export const collectionFetcher = async (query: CollectionQuery) => {
  const collectionApiQuery = toApiCollectionQuery(query);

  const url = new URL(collectionUrl + "/" + query.identifier);
  url.search = new URLSearchParams(
    toLocationQuery(collectionApiQuery)
  ).toString();
  const res = await fetch(url.toString());
  const collectionResult: Opds2Feed = await res.json();

  if (res.ok) {
    return { collections: collectionResult, statusCode: null };
  } else {
    const err = new Error(collectionResult.message);
    log(err, JSON.stringify(collectionResult));
    return { collections: collectionResult, statusCode: res.status };
  }
};
