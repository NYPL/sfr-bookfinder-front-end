import axios from "axios";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import appConfig from "~/config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/fields' or its... Remove this comment to see the full error message
import { fields } from "~/src/constants/fields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/stores/InitialState' or ... Remove this comment to see the full error message
import serverState from "~/src/stores/InitialState";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/SearchQuery' or its... Remove this comment to see the full error message
import { buildSearchQuery } from "~/src/util/SearchQuery";

export const Actions = {
  SEARCH: "SEARCH",
  FETCH_WORK: "FETCH_WORK",
  FETCH_EDITION: "FETCH_EDITION",
  SET_QUERY: "SET_QUERY",
  RESET_SEARCH: "RESET_SEARCH",
  GET_TOTAL_WORKS: "GET_TOTAL_WORKS",
  LOADING: "LOADING",
  ERRORMSG: "ERRORMSG",
};

export const errorState = (errorMsg: any) => ({
  type: Actions.ERRORMSG,
  errorMsg,
});

export const loadingState = (loading: any) => ({
  type: Actions.LOADING,
  loading,
});

export const userQuery = (query: any) => ({
  type: Actions.SET_QUERY,
  searchQuery: query,
});

export const searchResults = (results: any) => ({
  type: Actions.SEARCH,
  results,
});

export const workDetail = (work: any) => ({
  type: Actions.FETCH_WORK,
  work,
});

export const editionDetail = (edition: any) => ({
  type: Actions.FETCH_EDITION,
  edition,
});

export const resetSearch = () => ({
  type: Actions.RESET_SEARCH,
  reset: true,
});

export const totalWorks = (total: any) => ({
  type: Actions.GET_TOTAL_WORKS,
  total,
});

const appEnv = process.env.APP_ENV || "production";
const apiUrl = appConfig.api[appEnv];
const { searchPath, recordPath, editionPath } = appConfig.api;
const totalWorksPath = appConfig.booksCount.apiUrl;
const searchUrl = apiUrl + searchPath[appEnv];
const recordUrl = apiUrl + recordPath;
const editionUrl = apiUrl + editionPath;
const totalWorksUrl = apiUrl + totalWorksPath;

export const searchPost = (query: any) => {
  const sField = query.field && fields[query.field];
  let queryBody: any;
  if (sField) {
    queryBody = buildSearchQuery(Object.assign({}, query, { field: sField }));
  }
  queryBody = buildSearchQuery(Object.assign({}, query));
  return (dispatch: any) =>
    axios
      .post(searchUrl, queryBody)
      .then((resp) => {
        if (resp.data) {
          console.log("resp.data", resp.data);
          dispatch(searchResults(resp.data));
        }
      })
      .catch((error) => {
        console.log("An error occurred during searchPost", error.message);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
        throw new Error("An error occurred during searchPost", error.message);
      });
};

export const detailRefinePost = (query: any) => {
  const queryBody = Object.assign({}, query);
  queryBody.identifier = queryBody.workId;
  delete queryBody.workId;
  return (dispatch: any) =>
    axios
      .post(recordUrl, queryBody)
      .then((resp) => {
        if (resp.data) {
          dispatch(workDetail(resp.data));
        }
      })
      .catch((error) => {
        console.log("An error occurred during detailRefinePost", error.message);
        throw new Error(
          "An error occurred during detailRefinePost",
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
          error.message
        );
      });
};

export const editionDetailRefinePost = (query: any) => {
  const queryBody = Object.assign({}, query);
  queryBody.editionIdentifier = queryBody.editionId;
  delete queryBody.editionId;
  return (dispatch: any) =>
    axios
      .post(editionUrl, queryBody)
      .then((resp) => {
        if (resp.data) {
          dispatch(editionDetail(resp.data));
        }
      })
      .catch((error) => {
        console.log(
          "An error occurred during editionDetailRefinePost",
          error.message
        );
        throw new Error(
          "An error occurred during editionDetailRefinePost",
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
          error.message
        );
      });
};

export const fetchWork = (query: any) => (dispatch: any) =>
  axios
    .get(recordUrl, {
      params: {
        identifier: query.workId,
        recordType: "editions",
        showAll: query.showAll,
      },
    })
    .then((resp) => {
      if (resp.data) {
        dispatch(workDetail(resp.data));
      }
    })
    .catch((error) => {
      console.log("An error occurred during fetchWork", error.message);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
      throw new Error("An error occurred during fetchWork", error.message);
    });

export const fetchTotalWorks = () => (dispatch: any) =>
  axios
    .get(totalWorksUrl)
    .then((resp) => {
      if (resp.data) {
        dispatch(totalWorks(resp.data));
      }
    })
    .catch((error) => {
      console.log("An error occurred during fetchTotalWorks", error.message);
      throw new Error(
        "An error occurred during fetchTotalWorks",
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
        error.message
      );
    });

export const fetchEdition = (query: any) => (dispatch: any) =>
  axios
    .get(editionUrl, {
      params: { editionIdentifier: query.editionId, showAll: query.showAll },
    })
    .then((resp) => {
      if (resp.data) {
        dispatch(editionDetail(resp.data));
      }
    })

    .catch((error) => {
      console.log("An error occurred during fetchEdition", error.message);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
      throw new Error("An error occurred during fetchEdition", error.message);
    });

export const serverPost = (query: any) => {
  const sField = query.field && fields[query.field];
  let queryBody;
  if (sField) {
    queryBody = buildSearchQuery(Object.assign({}, query, { field: sField }));
  }
  queryBody = buildSearchQuery(Object.assign({}, query));
  return axios
    .post(searchUrl, { query: queryBody })
    .then((resp) => {
      serverState.searchQuery = query;
      serverState.searchResults = { data: resp.data };
      return serverState;
    })
    .catch((error) => {
      console.log("An error occurred during serverPost", error.message);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
      throw new Error("An error occurred during serverPost", error.message);
    });
};

export const serverFetchWork = (query: any) =>
  axios
    .get(recordUrl, {
      params: {
        identifier: query.workId,
        recordType: "editions",
        showAll: query.showAll,
      },
    })
    .then((resp) => {
      serverState.workResult = { work: resp.data };
      return serverState;
    })
    .catch((error) => {
      console.log("An error occurred during serverFetchWork", error.message);
      throw new Error(
        "An error occurred during serverFetchWork",
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
        error.message
      );
    });

export const serverFetchEdition = (query: any) =>
  axios
    .get(editionUrl, {
      params: { editionIdentifier: query.editionId, showAll: query.showAll },
    })
    .then((resp) => {
      serverState.editionResult = { edition: resp.data };
      return serverState;
    })
    .catch((error) => {
      console.log("An error occurred during serverFetchEdition", error.message);
      throw new Error(
        "An error occurred during serverFetchEdition",
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
        error.message
      );
    });

export const loading = (isLoading: any) => (dispatch: any) =>
  dispatch(loadingState(isLoading));
export const error = (errorMsg: any) => (dispatch: any) =>
  dispatch(errorState(errorMsg));

export default {
  searchPost,
  detailRefinePost,
  editionDetailRefinePost,
  fetchWork,
  fetchTotalWorks,
  fetchEdition,
  serverPost,
  serverFetchWork,
  serverFetchEdition,
  userQuery,
  resetSearch,
  loading,
  error,
};
