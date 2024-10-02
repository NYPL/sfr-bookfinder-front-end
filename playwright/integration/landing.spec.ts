import { test, expect } from "../support/test-utils";
import {
  INVALID_COLLECTION_PATH,
  HOME_PATH,
  COLLECTION_PATH,
} from "~/mocks/mockEnv";
import { server } from "~/mocks/server";

test.afterEach(() => server.resetHandlers());
test.afterAll(() => server.close());

test("View landing page with collection", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}${HOME_PATH}`);
  const collectionHeading = page.getByRole("heading", {
    name: "Recently Added Collections",
    level: 2,
  });
  expect(collectionHeading).toBeVisible();
  const collectionLink = await page
    .getByRole("link", {
      name: /Baseball: A Collection by Mike Benowitz/,
    })
    .getAttribute("href");
  expect(collectionLink).toContain(COLLECTION_PATH);
});

test("Shows error boundary for invalid collection", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}${INVALID_COLLECTION_PATH}`);

  const alert = page.getByRole("alert");
  const errorText = alert.getByText("Something went wrong on our end");
  await expect(errorText).toBeVisible();
});
