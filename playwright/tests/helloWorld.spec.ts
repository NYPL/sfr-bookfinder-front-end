import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I am on the home page", async function (this: CustomWorld) {
  return await this.page.goto("https://sfr-bookfinder-front-end.vercel.app/");
});

Then("I see the DRB search input", async function (this: CustomWorld) {
  await expect(
    this.page.locator("[placeholder='Enter a search term ']")
  ).toBeVisible();
});
