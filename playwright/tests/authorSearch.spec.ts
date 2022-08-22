import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/setup";

Given("I want to do an author search", async function (this: CustomWorld) {
    return await this.page.goto("https://digital-research-books-beta.nypl.org/");
});
When("I change the dropdown to author", async function (this: CustomWorld) {
    const dropdown = await this.page.$("#searchbar-select-search-bar");
    await dropdown.selectOption({ value: "author" });
});

When("I input an author search term", async function (this: CustomWorld) {
    await this.page
        .locator("#searchbar-textinput-search-bar")
        .fill("Corelli, Marie");
    await this.page.locator("#searchbar-button-search-bar").click();
});

Then(
    "I expect at least 5 title by my author",
    async function (this: CustomWorld) {
        await this.page
            .locator("//h1[contains(text(), 'Digital Research Books')]")
            .waitFor();
        const textIWant = this.page.locator(
            "//div[@class='search-result css-0']/span[2]/a[contains(text(),\"Corelli, Marie\")]"
        );
        expect(await textIWant.count()).toBeGreaterThan(5);
    }
);
