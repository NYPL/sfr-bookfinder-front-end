import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

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
