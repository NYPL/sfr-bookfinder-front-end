import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";
import dotenv from "dotenv";
dotenv.config();

Given("I have done a keyword search", async function (this: CustomWorld) {
  await this.page.goto(`${this.parameters.appUrl}`);
  await this.page.locator('[aria-label="Item Search"]').fill("Africa");
  await this.page.locator("#searchbar-button-search-bar").click();
});
When("I click the requestable box", async function (this: CustomWorld) {
  await this.page.locator("text=Requestable").click();
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
  await this.page.locator('input[type="submit"] >> text="Submit"').click();
});
Then("I click the first request button", async function (this: CustomWorld) {
  await this.page.locator("text=Request >> nth=2").click();
});
Then("I expect to see delivery options", async function (this: CustomWorld) {
  await expect(this.page.locator("text=Have a small portion")).toBeVisible();
});
