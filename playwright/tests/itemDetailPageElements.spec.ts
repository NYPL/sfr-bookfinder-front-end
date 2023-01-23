import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";
import { itemDetailURL } from "../support/constants";

Given("I am on an item detail page", async function (this: CustomWorld) {
  return await this.page.goto(`${this.parameters.appUrl}/${itemDetailURL}`);
});

Then("I see the item title", async function (this: CustomWorld) {
  await expect(
    this.page.locator("#work-title", { hasText: "Introduction to Africa" })
  ).toBeVisible();
});

Then("I see the item author", async function (this: CustomWorld) {
  await expect(this.page.locator("text=By Library of Congress")).toBeVisible();
});

Then("I see the featured edition heading", async function (this: CustomWorld) {
  await expect(
    this.page.locator("#featured-edition", {
      hasText: "Featured Edition",
    })
  ).toBeVisible();
});

Then("I see multiple cover images", async function (this: CustomWorld) {
  const coverimage = this.page.locator('[data-testid="test"]');
  expect(await coverimage.count()).toBeGreaterThan(3);
});

Then("I see the edition year", async function (this: CustomWorld) {
  await expect(this.page.locator("//h4 >> nth=0")).toContainText("Edition");
});

Then("I see the edition publisher", async function (this: CustomWorld) {
  const publishedby = this.page.locator(
    '//div[contains(string(), "Published by")]'
  );
  expect(await publishedby.count()).toBeGreaterThan(10);
});

Then("I see the edition language", async function (this: CustomWorld) {
  const language = this.page.locator('//div[contains(string(), "Languages")]');
  expect(await language.count()).toBeGreaterThan(10);
});
Then("I see the edition license", async function (this: CustomWorld) {
  const license = this.page.locator('//div/a[contains(string(), "License")]');
  expect(await license.count()).toBeGreaterThan(2);
});

Then("I see the details heading", async function (this: CustomWorld) {
  await expect(
    this.page.locator("#details-list-heading", {
      hasText: "Details",
    })
  ).toBeVisible();
});

Then("I see the authors heading", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//dt[contains(text(),'Authors')]")
  ).toBeVisible();
});
Then("I see the author", async function (this: CustomWorld) {
  await expect(
    this.page.locator(
      "//dt[contains(text(),'Authors')]/following-sibling::dd/a[contains(text(),'Library of Congress')]"
    )
  ).toBeVisible();
});
Then("I see the subjects heading", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//dt[contains(text(),'Subjects')]")
  ).toBeVisible();
});
Then("I see the subjects", async function (this: CustomWorld) {
  await expect(
    this.page.locator(
      "//dt[contains(text(),'Subjects')]/following-sibling::dd/ul/li/a[contains(text(),'Africa, Sub-Saharan')]"
    )
  ).toBeVisible();
});
Then("I see the languages heading", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//dt[contains(text(),'Languages')]")
  ).toBeVisible();
});
Then("I see the language", async function (this: CustomWorld) {
  await expect(
    this.page.locator(
      "//dt[contains(text(),'Languages')]/following-sibling::dd/ul/li[contains(text(),'English')]"
    )
  ).toBeVisible();
});
Then("I see the all editions heading", async function (this: CustomWorld) {
  await expect(
    this.page.locator("#all-editions", {
      hasText: "All Editions",
    })
  ).toBeVisible();
});
Then(
  "I see the currently available online toggle text",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator(
        "//span[contains(text(),'Show only items currently available online')]"
      )
    ).toBeVisible();
  }
);
Then(
  "I see the currently available online toggle switch",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator(
        "//span[contains(text(),'Show only items currently available online')]//preceding-sibling::span"
      )
    ).toBeVisible();
  }
);
Then("I see at least one edition", async function (this: CustomWorld) {
  await expect(this.page.locator("(//h4/a)[2]")).toBeVisible();
});
