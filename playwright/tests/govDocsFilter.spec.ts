import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

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
