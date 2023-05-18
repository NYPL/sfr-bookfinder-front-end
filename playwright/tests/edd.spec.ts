import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

When("I have done a keyword search", async function (this: CustomWorld) {
  await this.page.locator('[aria-label="Item Search"]').fill("Africa");
});

Then(
  "I see a result with the 'Log in for options' text and I click it",
  async function (this: CustomWorld) {
    await this.page.locator("text=Log in for options >> nth=1").click();
  }
);

Then("I log in to the catalog", async function (this: CustomWorld) {
  await this.page.locator("#code").fill(process.env.CATALOG_USERNAME);
  await this.page.locator("#pin").fill(process.env.CATALOG_USER_PIN);
  //await this.page.locator('input[type="submit"] >> text="Submit"').click();
});

Then(
  "I click the first request button",
  { timeout: 60000 }, // takes longer than the default 30000ms
  async function (this: CustomWorld) {
    await this.page.getByRole("link", { name: "Request" }).first().click();
  }
);

Then(
  "I expect to see delivery options",
  //{ timeout: 60000 }, // takes longer than the default 30000ms
  async function (this: CustomWorld) {
    const deliveryLocation = this.page.getByRole("heading", {
      name: "Choose a delivery location",
    });
    await expect(deliveryLocation).toBeVisible();
  }
);
