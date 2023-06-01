import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

When("I change the dropdown to title", async function (this: CustomWorld) {
  const dropdown = await this.page.$("[aria-label='Select a search category']");
  await dropdown.selectOption({ value: "title" });
});

When("I input a title search term", async function (this: CustomWorld) {
  await this.page.locator("[aria-label='Item Search']").fill("IBM 1401");
});

Then(
  "I expect at least 5 titles with my title",
  async function (this: CustomWorld) {
    await this.page
      .locator("//h1[contains(text(), 'Digital Research Books')]")
      .waitFor();
    const textIWant = this.page.locator('//h2/a[contains(text(),"IBM 1401")]');
    expect(await textIWant.count()).toBeGreaterThan(3);
  }
);
