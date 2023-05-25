import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

When("I have done a keyword search", async function (this: CustomWorld) {
  await this.page.locator('[aria-label="Item Search"]').fill("Africa");
});

Then("I log in to the catalog", async function (this: CustomWorld) {
  await this.page.locator("#code").fill(process.env.CATALOG_USERNAME);
  await this.page.locator("#pin").fill(process.env.CATALOG_USER_PIN);
});

Then("I expect to see delivery options", async function (this: CustomWorld) {
  const deliveryLocation = this.page.getByRole("heading", {
    name: "Choose a delivery location",
  });
  await expect(deliveryLocation).toBeVisible();
});
