import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I want to do an author search", async function (this: CustomWorld) {
  return await this.page.goto(`${this.parameters.appUrl}`);
  //return await this.page.goto("https://digital-research-books-beta.nypl.org/");
});
When("I change the dropdown to author", async function (this: CustomWorld) {
  const dropdown = await this.page.$("[aria-label='Select a search category']");
  await dropdown.selectOption({ value: "author" });
});

When("I input an author search term", async function (this: CustomWorld) {
  await this.page.locator("[aria-label='Item Search']").fill("Corelli, Marie");
  await this.page.locator('[data-testid="button"]').click();
});

Then(
  "I expect at least 5 title by my author",
  async function (this: CustomWorld) {
    await this.page
      .locator("//h1[contains(text(), 'Digital Research Books')]")
      .waitFor();
    const textIWant = this.page.locator("a", { hasText: " Corelli, Marie" });
    expect(await textIWant.count()).toBeGreaterThan(5);
  }
);
