import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Then(
  "I expect to be on the Hathi Trust website",
  async function (this: CustomWorld) {
    await expect(
      this.page.frameLocator(".iframe-reader").locator("h1")
    ).toHaveText(
      "Introduction to Africa; a selective guide to background reading. ..."
    );
  }
);
