import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given(
    "I am on the DRB home page for searching",
    async function (this: CustomWorld) {
        return await this.page.goto(
            "https://digital-research-books-beta.nypl.org/"
        );
    }
);

When("I input a search term", async function (this: CustomWorld) {
    await this.page.locator("#searchbar-textinput-search-bar").fill("IBM 1401");
    await this.page.locator("#searchbar-button-search-bar").click();
});

Then(
    "I count how many titles have my keyword",
    async function (this: CustomWorld) {
        await this.page.locator("//h1[contains(text(), 'Digital Research Books')]").waitFor();
        const textIWant = this.page.locator("//h2/a[contains(text(),'IBM 1401')]");
        expect(await textIWant.count()).toBeGreaterThan(3);
        console.log(textIWant);
    }
);
