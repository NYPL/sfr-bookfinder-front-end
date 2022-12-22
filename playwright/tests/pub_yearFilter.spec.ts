import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given(
  "I want to filter by publication year",
  async function (this: CustomWorld) {
    return await this.page.goto(`${this.parameters.appUrl}`);
  }
);

When(
  "I search for New York to test publication year filter",
  async function (this: CustomWorld) {
    await this.page.locator('[aria-label="Item Search"]').fill("New York");
    await this.page.locator("#searchbar-button-search-bar").click();
  }
);

Then("I input publication years 1900-1900", async function (this: CustomWorld) {
  await this.page
    .locator('[aria-describedby="date-filter-from-helperText"]')
    .fill("1900");
  await this.page
    .locator('[aria-describedby="date-filter-to-helperText"]')
    .fill("1900");
  await this.page.locator("#year-filter-button").click();
});

Then(
  "for at least 9 titles on the page, I should see a publication year of 1900",
  async function (this: CustomWorld) {
    await this.page
      .locator("//h1[contains(text(), 'Digital Research Books')]")
      .waitFor();
    const textIWant = this.page.locator("//h4/a", {
      hasText: "1900 Edition",
    });
    expect(await textIWant.count()).toBeGreaterThan(8);
  }
);
