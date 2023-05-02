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
  await expect(
    this.page.getByRole("heading", { name: "Digital Research Books" })
  ).toBeVisible();
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

// 1. Write assertion to find Recently Added Collections heading
// 2. Confirm heading is visible
Then("I see the collections heading", async function (this: CustomWorld) {
  await expect(this.page.getByRole('heading', { name: 'Recently Added Collections' })).toBeVisible();
})

// 1. Find a locator that is not dependent on user content
// 2. Assert that locator is visible
// Things we could assert: 
// - there's at least one card
// - the card has the text "Collection"
// - the card is a link
// - the card has the text "Items"
// - the card has an image
Then("I see the list of collection cards", async function (this: CustomWorld) {
  const collectionCountLocator = await this.page.locator("//b[contains(text(), 'Collection')]").count(); // count number of collection cards
  await expect(collectionCountLocator).toBeGreaterThan(0); // at least one card exists with the text "Collection"

  // use firstCollection Card to condense code - not working bc of hierarchy
  //const firstCollectionCard = await this.page.getByRole("heading", { name: "Recently Added Collections" }).first(); // find first card
  //await expect(firstCollectionCard.filter({ has: this.page.getByRole("link") })).toHaveAttribute("href", /collection/); // first card is a link
  //await expect(firstCollectionCard.getByRole("img")).toBeVisible(); // first card has an image
  
  // confirm first card is a link, has an image, and has "Items" text
  await expect(this.page.getByRole("link", { name: "Collection"}).first()).toHaveAttribute("href", /collection/); // first card is a link
  await expect(this.page.getByRole("img", { name: "Collection" }).first()).toBeVisible(); // first card has an image
  await expect(this.page.getByRole("heading", { name: /Items/ }).first()).toBeVisible(); // first card has "Items" text
  
  // confirm correct link is located
  const linkLocator = await this.page.getByRole("link", { name: "Collection" }).first().getAttribute("href");
  console.log("collection card href attribute:", linkLocator);

  // confirm correct image is located
  const imgLocator = await this.page.getByRole("img", { name: "Collection" }).first().getAttribute("src");
  console.log("collection card img src attribute:", imgLocator);

  // confirm correct "Items" text is located
  const itemsLocator = await this.page.getByRole("heading", { name: /Items/ }).first().innerText();
  console.log("collection card items text:", itemsLocator);
})

Then("I see the footer", async function (this: CustomWorld) {
  await expect(this.page.locator("#footer")).toBeVisible();
});
Then("I see the feedback button", async function (this: CustomWorld) {
  await expect(
    await this.page.locator("button", { hasText: "Feedback" })
  ).toBeVisible();
});
