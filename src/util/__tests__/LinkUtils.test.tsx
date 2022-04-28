import { getBackToSearchUrl, getBackUrl } from "../LinkUtils";

describe("Generates back url", () => {
  const host = "drb-qa.nypl.org";
  test("getBackUrl returns '/' for external referer", () => {
    const referer = "https://jira.nypl.org/";
    const backUrl = getBackUrl(referer, host);
    expect(backUrl).toEqual("/");
  });

  test("getBackUrl returns previous page for internal referer", () => {
    const referer =
      "https://drb-qa.nypl.org/search?query=keyword%3A%22climate+change%22&filter=format%3Apdf";
    const backUrl = getBackUrl(referer, host);
    expect(backUrl).toEqual(referer);
  });
});

describe("Generate back to serach url", () => {
  const host = "drb-qa.nypl.org";
  test("getBackToSearchUrl returns null for non-search referer", () => {
    const referer = "https://drb-qa.nypl.org/edition/1780467?featured=2178893";
    const backUrl = getBackToSearchUrl(referer, host);
    expect(backUrl).toEqual(null);
  });

  test("getBackToSearchUrl returns to search page for search referer", () => {
    const referer =
      "https://drb-qa.nypl.org/search?query=keyword%3A%22climate+change%22&filter=format%3Apdf";
    const backUrl = getBackToSearchUrl(referer, host);
    expect(backUrl).toEqual(referer);
  });
});
