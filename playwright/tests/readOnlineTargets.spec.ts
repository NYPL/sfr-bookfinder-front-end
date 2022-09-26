import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I am viewing search results", async function (this: CustomWorld) {
  await this.page.goto(`${this.parameters.appUrl}`);
  const dropdown = await this.page.$("[aria-label='Select a search category']");
  await dropdown.selectOption({ value: "title" });

  await this.page.locator("[aria-label='Item Search']").fill("cats");
  await this.page.locator('[data-testid="button"]').click();
});
