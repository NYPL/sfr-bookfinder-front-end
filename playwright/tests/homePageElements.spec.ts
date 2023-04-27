import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I am on the DRB home page", async function (this: CustomWorld) {
  return await this.page.goto(`${this.parameters.appUrl}`);
});

Then("I see the site name", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//h1[contains(text(), 'Digital Research Books')]")
  ).toBeVisible();
});

Then("I see the Home breadcrumb", async function (this: CustomWorld) {
  await expect(this.page.locator("a", { hasText: "Home" })).toBeVisible();
});

Then("I see the Research breadcrumb", async function (this: CustomWorld) {
  await expect(
    this.page.locator('.breadcrumb-label:text-is("Research")')
  ).toBeVisible();
});

Then(
  "I see the Digital Research Books Beta breadcrumb",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator(
        '.breadcrumb-label:text-is("Digital Research Books Beta")'
      )
    ).toBeVisible();
  }
);

Then("I see the site name H1", async function (this: CustomWorld) {
  await expect(this.page.locator("//h1")).toContainText(
    "Digital Research Books"
  );
});

Then("I see the intro text", async function (this: CustomWorld) {
  await expect(
    this.page.locator(
      "text=Find millions of digital books for research from multiple sources"
    )
  ).toBeVisible();
});

Then(
  "I see first H2 - Search the Worlds Research Collections",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator("text=Search the World's Research Collections")
    ).toBeVisible();
  }
);

Then("I see search type drop down", async function (this: CustomWorld) {
  await expect(
    this.page.locator('[aria-label="Select a search category"]')
  ).toBeVisible();
});
Then("I see input field", async function (this: CustomWorld) {
  await expect(this.page.locator("[aria-label='Item Search']")).toBeVisible();
});

Then("I see search button", async function (this: CustomWorld) {
  await expect(this.page.locator("#searchbar-button-search-bar")).toBeVisible();
});

Then("I see advanced search link", async function (this: CustomWorld) {
  await expect(this.page.locator("text=Advanced Search")).toBeVisible();
});

Then("I see second H2 - Search Examples", async function (this: CustomWorld) {
  await expect(this.page.locator("//h2")).toBeVisible();
  await expect(this.page.locator("//h2")).toContainText("Search Examples");
});
Then("I see 5 search examples", async function (this: CustomWorld) {
  const searchexamples = this.page.locator("//*[@id='subject-list']/li/a");
  await expect(searchexamples).toHaveCount(5);
});

// 1. write assertion to find Recently Added Collections heading
// 2. Confirm heading is visible

// 1. Find a locator that is not dependent on user content
// 2. Assert that locator is visible

Then("I see the footer", async function (this: CustomWorld) {
  await expect(this.page.locator("#footer")).toBeVisible();
});
Then("I see the feedback button", async function (this: CustomWorld) {
  await expect(
    await this.page.locator("button", { hasText: "Feedback" })
  ).toBeVisible();
});
