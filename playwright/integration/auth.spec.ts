import { test, expect } from "../support/test-utils";
import {
  EDD_WORK_PATH,
  LIMITED_ACCESS_WORK_PATH,
  NYPL_LOGIN_URL,
} from "../support/routes";

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test.describe("Limited access item", () => {
  test("should redirect to log in page with correct redirect_uri", async ({
    page,
    port,
  }) => {
    await page.goto(`http://localhost:${port}${LIMITED_ACCESS_WORK_PATH}`);
    await page
      .getByRole("link", { name: "Educating economists Download PDF" })
      .click();
    await page.waitForURL(`**${NYPL_LOGIN_URL}**`);
    const url = new URL(page.url());
    const redirectUri = url.searchParams.get("redirect_uri");
    expect(redirectUri).toContain(LIMITED_ACCESS_WORK_PATH);
  });
});

test.describe("EDD item", () => {
  test("should redirect to log in page with correct redirect_uri", async ({
    page,
    port,
  }) => {
    await page.goto(`http://localhost:${port}${EDD_WORK_PATH}`);
    await page
      .getByRole("link", {
        name: "Log in to request scan for South Africa [microform]",
      })
      .click();
    await page.waitForURL(`**${NYPL_LOGIN_URL}**`);
    const url = new URL(page.url());
    const redirectUri = url.searchParams.get("redirect_uri");
    expect(redirectUri).toContain(EDD_WORK_PATH);
  });
});
