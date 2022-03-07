import React from "react";
import { getBackUrl } from "../pages/read/[linkId]";

describe("Generates back url", () => {
  const host = "drb-qa.nypl.org";
  test("getBackUrl returns '/' for external referer", () => {
    const referer = "https://jira.nypl.org/";
    const backUrl = getBackUrl(referer, host);
    expect(backUrl).toEqual("/");
    console.log(backUrl);
  });

  test("getBackUrl returns previous page for internal referer", () => {
    const referer =
      "https://drb-qa.nypl.org/search?query=keyword%3A%22climate+change%22&filter=format%3Apdf";
    const backUrl = getBackUrl(referer, host);
    expect(backUrl).toEqual(referer);
    console.log(backUrl);
  });
});