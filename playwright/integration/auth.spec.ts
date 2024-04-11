import { test, expect } from "../support/test-utils";
import { LIMITED_ACCESS_WORK_PATH, NYPL_LOGIN_URL } from "../support/routes";

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test.describe("Cookie authentication", () => {
  test("should redirect to NYPL log in page with correct redirect_uri with no cookie", async ({
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

  test("should redirect to NYPL login page with expired cookie", async ({
    page,
    port,
    addCookie,
  }) => {
    const cookieExpiration = new Date("1970-01-01T00:00:00.000Z").getTime();
    addCookie(cookieExpiration);

    await page.goto(`http://localhost:${port}${LIMITED_ACCESS_WORK_PATH}`);
    expect(
      await page
        .getByRole("link", { name: "Educating economists Download PDF" })
        .getAttribute("href")
    ).toContain(NYPL_LOGIN_URL);
  });

  test("should contain download link with valid auth cookie", async ({
    page,
    port,
    addCookie,
    context,
  }) => {
    addCookie();
    const cookies = await context.cookies();
    const authCookie = cookies.find(
      (cookie) => cookie.name === "nyplIdentityPatron"
    );
    expect(authCookie.path).toBe("/");

    await page.goto(`http://localhost:${port}${LIMITED_ACCESS_WORK_PATH}`);

    expect(
      await page
        .getByRole("link", { name: "Educating economists Download PDF" })
        .getAttribute("href")
    ).toContain("/fulfill/9350262");
  });
});
