import { Given } from "@cucumber/cucumber";
import { CustomWorld } from "../support/setup";
import { pages } from "../support/mappings";

Given(
    /^I go to the "([^"]*)" page$/,
    async function (this: CustomWorld, pageId: keyof typeof pages) {
      const path = pages[pageId].route;
      await this.page.goto(`${this.parameters.appUrl}/${path}`, {
        waitUntil: "networkidle"
      });
    }
  );