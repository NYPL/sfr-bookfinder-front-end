import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

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
When("I supply a keyword and author", async function (this: CustomWorld) {
  await this.page;
  this.page.locator("//input[@id='search-Keyword']").fill("IBM 1401");
  await this.page.waitForTimeout(500);
  this.page.locator("//input[@id='search-Author']").fill("Laurie, Edward J.");
  await this.page.waitForTimeout(500);
});
Then(
  "I expect to see H1 with both keyword and author",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator("h1", {
        hasText: "IBM 1401",
      })
    ).toBeVisible();
    await expect(
      this.page.locator("h1", {
        hasText: "Laurie, Edward J.",
      })
    ).toBeVisible();
  }
);
Then(
  'I expect to see H2 with the title "Computers and how they work"',
  async function (this: CustomWorld) {
    await expect(
      this.page.locator("h2", {
        hasText: "Computers and how they work",
      })
    ).toBeVisible();
  }
);

const numResults = [];

When("I search for revolution", async function (this: CustomWorld) {
  await this.page.locator("//input[@id='search-Keyword']").fill("revolution");
});

When(
  "I collect the number of results for revolution",
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

When("I search for revolution and France", async function (this: CustomWorld) {
  await this.page.locator("//input[@id='search-Keyword']").fill("revolution");
  await this.page.locator("//input[@id='search-Subject']").fill("France");
});

When(
  "I collect the number of results for revolution and France",
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

When(
  "I collect the number of results for English language",
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
  "I expect to see the number of results decrease with each new addition",
  async function (this: CustomWorld) {
    expect(numResults[1]).toBeLessThan(numResults[0]);
    expect(numResults[2]).toBeLessThan(numResults[1]);
  }
);
