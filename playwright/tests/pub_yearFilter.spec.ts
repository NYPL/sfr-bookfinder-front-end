import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

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
