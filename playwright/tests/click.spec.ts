import { When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/setup";
import { elements } from "../support/mappings";

When(
  /^I click the "([^"]*)"$/,
  async function (this: CustomWorld, elementKey: keyof typeof elements) {
    const element = elements[elementKey];
    return await this.page.locator(element).click();
  }
);
