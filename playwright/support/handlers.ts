import { http, HttpResponse } from "msw";

const isAuthenticated = (request) => {
  const auth = request.headers.get("authorization");
  return auth === "Bearer access-token";
};

/** A collection of handlers to be used by default for all tests. */
const handlers = [
  http.get("https://drb-api-qa.nypl.org/fulfill/9350262", ({ request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json({
        status: 403,
      });
    }
    return HttpResponse.json({
      status: 200,
      body: JSON.stringify([{ downloaded: true }]),
    });
  }),
];

export default handlers;
