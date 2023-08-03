import { Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/setup";
import { elements } from "../support/mappings";
import { expect } from "@playwright/test";

Then(
  /^the "([^"]*)" should be displayed$/,
  async function (this: CustomWorld, elementKey: keyof typeof elements) {
    const element = elements[elementKey];
    return expect(this.page.locator(element)).toBeVisible({
      timeout: 50000,
    });
  }
);

Then(
  /^the "([^"]*)" should be checked$/,
  async function (this: CustomWorld, elementKey: keyof typeof elements) {
    const element = elements[elementKey];
    return expect(this.page.locator(element).isChecked()).toBeTruthy();
  }
);
