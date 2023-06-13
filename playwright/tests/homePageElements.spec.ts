import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Then("I see the list of collection cards", async function (this: CustomWorld) {
  const collectionCountLocator = await this.page
    .locator("//b[contains(text(), 'Collection')]")
    .count(); // count number of collection cards
  await expect(collectionCountLocator).toBeGreaterThan(0); // at least one card exists with the text "Collection"

  await expect(
    this.page.getByRole("link", { name: "Collection" }).first()
  ).toHaveAttribute("href", /collection/); // first card is a link
  await expect(
    this.page.getByRole("img", { name: "Collection" }).first()
  ).toBeVisible(); // first card has an image
  await expect(
    this.page.getByRole("heading", { name: /Items/ }).first()
  ).toBeVisible(); // first card has "Items" text
});
