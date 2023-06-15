import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

const numResults = [];

Then(
  "the number of results for revolution should be displayed",
  async function (this: CustomWorld) {
    let val = (await this.page.locator("#page-counter").innerText()).valueOf();
    val = val.replace("Viewing 1 - 10 of ", "");
    val = val.replace(" items", "");
    val = val.replace(",", "");
    const num = parseInt(val);
    expect(num).toBeGreaterThan(0);
    numResults[0] = num;
  }
);

Then(
  "the number of results for revolution and France should be displayed",
  async function (this: CustomWorld) {
    let val = (await this.page.locator("#page-counter").innerText()).valueOf();
    val = val.replace("Viewing 1 - 10 of ", "");
    val = val.replace(" items", "");
    val = val.replace(",", "");
    const num = parseInt(val);
    expect(num).toBeGreaterThan(0);
    numResults[1] = num;
  }
);

Then(
  "the number of results for revolution, France, and English language should be displayed",
  async function (this: CustomWorld) {
    let val = (await this.page.locator("#page-counter").innerText()).valueOf();
    val = val.replace("Viewing 1 - 10 of ", "");
    val = val.replace(" items", "");
    val = val.replace(",", "");
    const num = parseInt(val);
    expect(num).toBeGreaterThan(0);
    numResults[2] = num;
  }
);

Then(
  "the number of results decrease with each new addition",
  async function (this: CustomWorld) {
    expect(numResults[1]).toBeLessThan(numResults[0]);
    expect(numResults[2]).toBeLessThan(numResults[1]);
  }
);
