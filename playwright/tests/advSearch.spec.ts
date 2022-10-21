import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I want to do an advanced search", async function (this: CustomWorld) {
  return await this.page.goto(`${this.parameters.appUrl}`);
});

When("I click the adavanced search link", async function (this: CustomWorld) {
  await this.page.locator("//a[contains(text(), 'Advanced Search')]").click();
});

Then(
  "I should see the advanced search heading",
  async function (this: CustomWorld) {
    const heading = await this.page.locator("h1").innerText();
    expect(heading).toBe("Advanced Search");
  }
);
Then(
  "I should see the labels and inputs for the form fields",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator("//label[@id='search-Keyword-label']")
    ).toBeVisible();
    await expect(
      this.page.locator("//input[@id='search-Keyword']")
    ).toBeVisible();
    await expect(
      this.page.locator("//label[@id='search-Author-label']")
    ).toBeVisible();
    await expect(
      this.page.locator("//input[@id='search-Author']")
    ).toBeVisible();
    await expect(
      this.page.locator("//label[@id='search-Title-label']")
    ).toBeVisible();
    await expect(
      this.page.locator("//input[@id='search-Title']")
    ).toBeVisible();
    await expect(
      this.page.locator("//label[@id='search-Subject-label']")
    ).toBeVisible();
    await expect(
      this.page.locator("//input[@id='search-Subject']")
    ).toBeVisible();
    await expect(
      this.page.locator("//label[@id='date-filter-from-label']")
    ).toBeVisible();
    await expect(
      this.page.locator("//input[@id='date-filter-from']")
    ).toBeVisible();
    await expect(
      this.page.locator("//label[@id='date-filter-to-label']")
    ).toBeVisible();
    await expect(
      this.page.locator("//input[@id='date-filter-to']")
    ).toBeVisible();
    await expect(
      this.page.locator("//button[@id='submit-button']")
    ).toBeVisible();
    await expect(
      this.page.locator("//button[@id='reset-button']")
    ).toBeVisible();
  }
);
When(
  "I supply a keyword and author and submit",
  async function (this: CustomWorld) {
    await this.page;
    this.page.locator("//input[@id='search-Keyword']").fill("IBM 1401");
    await this.page.waitForTimeout(500);
    this.page.locator("//input[@id='search-Author']").fill("Laurie, Edward J.");
    await this.page.waitForTimeout(500);
    await this.page.locator("#submit-button").click();
    await this.page.waitForTimeout(500);
  }
);
