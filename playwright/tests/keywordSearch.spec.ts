import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

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
