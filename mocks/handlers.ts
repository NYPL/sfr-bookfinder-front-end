import { http, HttpResponse, passthrough } from "msw";
import { workDetailWithUp } from "~/src/__tests__/fixtures/WorkDetailFixture";
import {
  API_URL,
  DOWNLOAD_PATH,
  FULFILL_PATH,
  LIMITED_ACCESS_WORK_PATH,
} from "./mockEnv";

const isAuthenticated = (request) => {
  const auth = request.headers.get("authorization");
  return auth === "Bearer access-token";
};

const workUrl = new URL(LIMITED_ACCESS_WORK_PATH, API_URL).toString();
const fulfillUrl = new URL(FULFILL_PATH, API_URL).toString();
const downloadUrl = new URL(DOWNLOAD_PATH, API_URL).toString();

/** A collection of handlers to be used by default for all tests. */
const handlers = [
  /**
   * Allow normal requests to pass through
   */
  http.all("/_next/*", passthrough),
  http.all("/img/*", passthrough),
  http.all("/__nextjs_original-stack-frame", passthrough),
  http.all("/fonts/*", passthrough),
  http.all("/css/*", passthrough),
  http.get("/js/*", passthrough),
  http.get("/favicon.ico", passthrough),
  http.get("/favicon.ico", passthrough),
  http.get("https://test-sfr-covers.s3.amazonaws.com/*", passthrough),
  http.get("https://ds-header.nypl.org/*", passthrough),

  http.get(workUrl, () => {
    return HttpResponse.json(workDetailWithUp);
  }),

  http.get(fulfillUrl, ({ request }) => {
    if (!isAuthenticated(request)) {
      return new HttpResponse(null, {
        status: 401,
      });
    }
    return new HttpResponse(null, {
      status: 302,
      headers: {
        Location: "/test-download-pdf",
      },
    });
  }),

  http.get(downloadUrl, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
];

export default handlers;
