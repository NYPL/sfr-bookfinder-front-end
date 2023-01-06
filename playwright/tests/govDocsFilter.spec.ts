import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given(
  "I want to filter by government docs",
  async function (this: CustomWorld) {
    return await this.page.goto(`${this.parameters.appUrl}`);
  }
);

When("I search for swimming", async function (this: CustomWorld) {
  await this.page.locator('[aria-label="Item Search"]').fill("swimming");
  await this.page.locator("#searchbar-button-search-bar").click();
});

Then(
  "I click the Government Documents filter",
  async function (this: CustomWorld) {
    await this.page
      .locator("//span[contains(text(), 'Show only US government documents')]")
      .click();
  }
);

Then(
  "for at least 4 titles on the page, I should see United States in the author field",
  async function (this: CustomWorld) {
    await this.page
      .locator("//h1[contains(text(), 'Digital Research Books')]")
      .waitFor();
    const textIWant = this.page.locator("a", { hasText: "United States" });
    expect(await textIWant.count()).toBeGreaterThan(3);
  }
);
