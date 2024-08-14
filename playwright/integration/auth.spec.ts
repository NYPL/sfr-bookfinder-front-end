import { test, expect } from "../support/test-utils";
import {
  API_URL,
  FULFILL_PATH,
  LIMITED_ACCESS_WORK_PATH,
  NYPL_LOGIN_URL,
} from "~/mocks/mockEnv";
import { server } from "~/mocks/server";

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
  server.listen({
    onUnhandledRequest: "bypass",
  });
});
test.afterEach(() => server.resetHandlers());
test.afterAll(() => server.close());

test.describe("Cookie authentication", () => {
  test("redirects to NYPL log in page with no cookie", async ({
    page,
    port,
  }) => {
    await page.goto(`http://localhost:${port}${LIMITED_ACCESS_WORK_PATH}`);
    await page.getByRole("link", { name: "title Download PDF" }).click();
    await page.waitForURL(`**${NYPL_LOGIN_URL}**`);
    const url = new URL(page.url());
    const redirectUri = url.searchParams.get("redirect_uri");
    expect(redirectUri).toContain(LIMITED_ACCESS_WORK_PATH);
  });

  test("redirects to NYPL login page with expired cookie", async ({
    page,
    port,
    setCookie,
  }) => {
    const cookieExpiration = new Date("1970-01-01T00:00:00.000Z").getTime();
    setCookie(cookieExpiration);

    await page.goto(`http://localhost:${port}${LIMITED_ACCESS_WORK_PATH}`);
    await page.getByRole("link", { name: "title Download PDF" }).click();
    await page.waitForURL(`**${NYPL_LOGIN_URL}**`);
    const url = new URL(page.url());
    const redirectUri = url.searchParams.get("redirect_uri");
    expect(redirectUri).toContain(LIMITED_ACCESS_WORK_PATH);
  });

  test("redirects to download with valid auth cookie", async ({
    page,
    port,
    setCookie,
    context,
  }) => {
    await setCookie();
    const cookies = await context.cookies();
    const authCookie = cookies.find(
      (cookie) => cookie.name === "nyplIdentityPatron"
    );
    expect(authCookie.path).toBe("/");

    await page.goto(`http://localhost:${port}${LIMITED_ACCESS_WORK_PATH}`);

    const responsePromise = page.waitForResponse(`${API_URL}${FULFILL_PATH}`);
    await page.getByRole("link", { name: "title Download PDF" }).click();
    const response = await responsePromise;
    expect(response.status()).toBe(302);
  });
});
