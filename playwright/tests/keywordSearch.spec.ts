import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

When("I input a search term", async function (this: CustomWorld) {
  await this.page.locator('[aria-label="Item Search"]').fill("IBM 1401");
  await this.page.locator("#searchbar-button-search-bar").click();
});

Then(
  "I count how many titles have my keyword",
  async function (this: CustomWorld) {
    await this.page
      .locator("//h1[contains(text(), 'Digital Research Books')]")
      .waitFor();
    const textIWant = this.page.locator("a", { hasText: "IBM 1401" });
    expect(await textIWant.count()).toBeGreaterThan(3);
  }
);
