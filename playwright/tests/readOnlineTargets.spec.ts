import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given(
  "I am on the home page for online targets testing",
  async function (this: CustomWorld) {
    return await this.page.goto(`${this.parameters.appUrl}`);
  }
);

When("I click Subject: Sub-saharan Africa", async function (this: CustomWorld) {
  await this.page.locator("text=Subject: Sub-saharan Africa").click();
});

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
//
When(
  "I visit the details page for the title",
  async function (this: CustomWorld) {
    return await this.page.goto(
      `${this.parameters.appUrl}work/01a28167-8c8d-4141-a32f-718539d5c8a4?featured=949699`
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
