import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I am on the DRB home page", async function (this: CustomWorld) {
  // return await this.page.goto("https://drb-qa.nypl.org/");
  return await this.page.goto("https://digital-research-books-beta.nypl.org/");
  // return await this.page.goto("https://sfr-bookfinder-front-end.vercel.app/");
});

Then("I see the site name", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//h1[contains(text(), 'Digital Research Books')]")
  ).toBeVisible();
});

Then("I see the Home breadcrumb", async function (this: CustomWorld) {
  await expect(
    this.page.locator(
      "//span[@class='breadcrumb-label'][contains(text(), 'Home')]"
    )
  ).toBeVisible();
});

Then("I see the Research breadcrumb", async function (this: CustomWorld) {
  await expect(
    this.page.locator(
      "//span[@class='breadcrumb-label'][contains(text(), 'Home')]"
    )
  ).toBeVisible();
});

Then(
  "I see the Digital Research Books Beta breadcrumb",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator(
        "//span[@class='breadcrumb-label'][contains(text(), 'Digital Research Books Beta')]"
      )
    ).toBeVisible();
  }
);

Then("I see the site name H1", async function (this: CustomWorld) {
  //   await expect(this.page.locator("//h1")).toBeVisible();
  // });
  await expect(this.page.locator("//h1")).toContainText(
    "Digital Research Books"
  );
});

Then("I see the intro text", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//div[@data-testid='hero-content']/p/span")
  ).toContainText(
    "Find millions of digital books for research from multiple sources"
  );
});

Then(
  "I see first H2 - Search the Worlds Research Collections",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator("//main[@id='mainContent']/div[1]")
    ).toContainText("Search the World's Research Collections");
  });

Then("I see search type drop down", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//select[@aria-label='Select a search category']")
  ).toBeVisible();
});

Then("I see input field", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//*[@id='searchbar-textinput-search-bar']")
  ).toBeVisible();
});

Then("I see search button", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//*[@id='searchbar-button-search-bar']")
  ).toBeVisible();
});

Then("I see advanced search link", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//*[@id='mainContent']/div[1]/div/div[2]/a")
  ).toBeVisible();
});

Then("I see second H2 - Search Examples", async function (this: CustomWorld) {
  await expect(this.page.locator("//h2")).toBeVisible();
  await expect(this.page.locator("//h2")).toContainText("Search Examples");
});