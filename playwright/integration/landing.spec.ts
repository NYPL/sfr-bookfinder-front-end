import { test, expect } from "../support/test-utils";
import { API_URL, COLLECTION_PATH, HOME_PATH } from "~/mocks/mockEnv";
import { server } from "~/mocks/server";
import { HttpResponse } from "msw";

test.afterEach(() => server.resetHandlers());
test.afterAll(() => server.close());

test("View landing page with collection", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}${HOME_PATH}`);
  const collectionHeading = page.getByRole("heading", {
    name: "Recently Added Collections",
    level: 2,
  });
  expect(collectionHeading).toBeVisible();
  const collectionLink = page.getByRole("link", {
    name: /Baseball: A Collection by Mike Benowitz/,
  });
  await expect(collectionLink).toHaveAttribute("href", COLLECTION_PATH);
});

test("Shows error boundary on error", async ({ page, port, http }) => {
  await page.goto(`http://localhost:${port}${HOME_PATH}`);
  server.use(
    http.get(new RegExp(API_URL), async () => {
      return HttpResponse.json(
        {
          status: 500,
          title: "Something went wrong",
          detail: "An unknown error occurred on the server",
        },
        { status: 500 }
      );
    })
  );

  const alert = page.getByRole("alert");
  const errorText = alert.getByText("An error 500 occurred on server");
  await expect(errorText).toBeVisible();
});
