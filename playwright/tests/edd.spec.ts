import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";
import dotenv from "dotenv";
import { getByRole } from "@testing-library/react";
dotenv.config({ path: ".env.local" });

When("I have done a keyword search", async function (this: CustomWorld) {
  await this.page.locator('[aria-label="Item Search"]').fill("Africa");
});

Then("I log in to the catalog", async function (this: CustomWorld) {
  await this.page.locator("#code").fill(process.env.CATALOG_USERNAME);
  await this.page.locator("#pin").fill(process.env.CATALOG_USER_PIN);
});

Then(
  "I expect to see delivery options",
  { timeout: 60000 }, // takes longer than the default 30000ms
  async function (this: CustomWorld) {
    //console.log(await (this.page.locator('#place-hold-form').getAttribute("class")))
    // const deliveryLocation = this.page.getByRole("form", {
    //   name: "Choose a delivery location",
    // });
    //const deliveryLocation = this.page.locator('.nypl-request-form-title');
    await expect(this.page.locator('[class="nypl-request-form-title"]')).toBeVisible();
  }
);
