import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I want to do a subject search", async function (this: CustomWorld) {
  return await this.page.goto(`${this.parameters.appUrl}`);
});
When("I change the dropdown to subject", async function (this: CustomWorld) {
  const dropdown = await this.page.$("[aria-label='Select a search category']");
  await dropdown.selectOption({ value: "subject" });
});

When(
  "I input a subject search term and submit",
  async function (this: CustomWorld) {
    await this.page.locator("[aria-label='Item Search']").fill("Petroleum");
    await this.page.locator('[data-testid="button"]').click();
  }
);

Then(
  "Then for each title on the page, I visit the details page and expect to see the subject listed",
  async function (this: CustomWorld) {
    const titles = this.page.locator("h2 a");

    for (let i = 0; i < 10; ++i) {
      await titles.nth(i);
      await titles.nth(i).click();
      // wait for All Editions heading to load so we know subjects are loaded
      await this.page
        .locator("//h3[contains(text(), 'All Editions')]")
        .waitFor();
      const targetlink = this.page.locator("//a[starts-with(., 'Petroleum')]");
      expect(await targetlink.isVisible()).toBe(true);
      await this.page.goBack();
    }
  }
);
