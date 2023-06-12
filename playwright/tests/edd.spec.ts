import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Then("I expect to see delivery options", async function (this: CustomWorld) {
  const deliveryLocation = this.page.getByRole("heading", {
    name: "Choose a delivery location",
  });
  await expect(deliveryLocation).toBeVisible();
});
