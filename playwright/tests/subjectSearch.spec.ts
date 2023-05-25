import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

When("I change the dropdown to subject", async function (this: CustomWorld) {
  const dropdown = await this.page.$("[aria-label='Select a search category']");
  await dropdown.selectOption({ value: "subject" });
});

When("I input a subject search term", async function (this: CustomWorld) {
  await this.page.locator("[aria-label='Item Search']").fill("Petroleum");
});

Then("I expect to see the subject listed", async function (this: CustomWorld) {
  const targetlink = this.page.getByRole("link", {
    name: "Petroleum",
    exact: true,
  });
  expect(await targetlink.isVisible());
});
