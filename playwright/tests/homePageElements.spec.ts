import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I am on the DRB home page", async function (this: CustomWorld) {
  return await this.page.goto("https://digital-research-books-beta.nypl.org/");
});

Then("I see the site name", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//h1[contains(text(), 'Digital Research Books')]")
  ).toBeVisible();
});

Then("I see the Home breadcrumb", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//ol/li/a/span[contains(text(), 'Home')]")
  ).toBeVisible();
});

Then("I see the Research breadcrumb", async function (this: CustomWorld) {
  await expect(
    this.page.locator("//ol/li[2]/a/span[contains(text(), 'Research')]")
  ).toBeVisible();
});

Then(
  "I see the Digital Research Books Beta breadcrumb",
  async function (this: CustomWorld) {
    await expect(
      this.page.locator(
        "//ol/li[3]/span/span[contains(text(), 'Digital Research Books Beta')]"
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
  await expect(this.page.locator("//*[@data-testid='button']")).toBeVisible();
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
Then("I see the footer", async function (this: CustomWorld) {
  await expect(this.page.locator("footer")).toBeVisible();
});
Then("I see the feedback button", async function (this: CustomWorld) {
  await expect(
    await this.page.locator("button", { hasText: "Feedback" })
  ).toBeVisible();
});
