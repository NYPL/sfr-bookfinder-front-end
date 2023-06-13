import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Then("I expect to see the subject listed", async function (this: CustomWorld) {
  const targetlink = this.page.getByRole("link", {
    name: "Petroleum",
    exact: true,
  });
  expect(await targetlink.isVisible());
});
