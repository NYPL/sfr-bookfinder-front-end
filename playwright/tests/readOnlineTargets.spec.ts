import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

When(
  "I click Read Online for the first title",
  async function (this: CustomWorld) {
    await this.page.locator("text=Read Online >> nth=0").click();
  }
);
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

Then(
  "I click the Read Online button and expect to be on the Hathi Trust website",
  async function (this: CustomWorld) {
    await this.page.locator("text=Read Online >> nth=0").click();
    await expect(
      this.page.frameLocator(".iframe-reader").locator("h1")
    ).toHaveText(
      "Introduction to Africa; a selective guide to background reading. ..."
    );
  }
);
