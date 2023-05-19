import { When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/setup";
import { elements, pages } from "../support/mappings";

When(
  /^I click the "([^"]*)"$/,
  async function (this: CustomWorld, elementKey: keyof typeof elements) {
    const element = elements[elementKey];
    return await this.page.locator(element).click();
  }
);

// trying to use built in locators
// When(
//   /^I click the "([^"]*)"$/,
//   async function (this: CustomWorld, elementId: keyof typeof elements) {
//     const path = elements[elementId];
//     return await path.click();
//   }
// );
