import { When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/setup";
import { elements, inputs } from "../support/mappings";

When(
    /^I fill in the "([^"]*)" with "([^"]*)"$/,
    async function (
      this: CustomWorld,
      elementKey: keyof typeof elements,
      inputKey: keyof typeof inputs
    ) {
      const locator = elements[elementKey];
      const inputText = inputs[inputKey];
      if (typeof inputText == "string") {
        return await this.page.type(locator, inputText);
      } else {
        throw new Error(`Input text is undefined. Input key: ${inputKey}`);
      }
    }
  );