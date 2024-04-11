import { test, expect } from "../support/test-utils";
import { LIMITED_ACCESS_WORK_PATH } from "../support/routes";

test.describe("Limited access item", () => {
  test("should pass auth cookie to /fulfill", async ({ page, port }) => {
    await page.goto(`http://localhost:${port}${LIMITED_ACCESS_WORK_PATH}`);
    const requestPromise = page.waitForRequest(
      "https://drb-api-qa.nypl.org/fulfill/9350262"
    );
    await page
      .getByRole("link", { name: "Educating economists Download PDF" })
      .click();
    const request = await requestPromise;
    console.log(request);
  });
});
