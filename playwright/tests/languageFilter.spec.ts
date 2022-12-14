import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I want to filter by language", async function (this: CustomWorld) {
  return await this.page.goto(`${this.parameters.appUrl}`);
});

When("I search for New York", async function (this: CustomWorld) {
  await this.page.locator('[aria-label="Item Search"]').fill("New York");
  await this.page.locator("#searchbar-button-search-bar").click();
});

Then("I click the Latin filter", async function (this: CustomWorld) {
  await this.page.locator("//label[contains(.,'Latin')]").click();
});

Then(
  "for at least 10 titles on the page, I should see Latin in the language field",
  async function (this: CustomWorld) {
    await this.page
      .locator("//h1[contains(text(), 'Digital Research Books')]")
      .waitFor();
    const textIWant = this.page.locator("div", { hasText: "Languages: Latin" });
    expect(await textIWant.count()).toBeGreaterThan(20);
    console.log(textIWant);
  }
);
