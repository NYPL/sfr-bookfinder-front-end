import { itemDetailURL } from "./constants";
import { CustomWorld } from "../support/setup";
import { getByRole } from "@testing-library/react";
import type { Page } from '@playwright/test'

export type Pages = {
  route: string;
};

export const pages: { [name: string]: Pages } = {
  home: {
    route: "/",
  },
  "item detail": {
    route: itemDetailURL,
  },
  "search result": {
    route: "/search?query=subject%3ASub-saharan+Africa",
  },
  "work details": {
    route: "/work/01a28167-8c8d-4141-a32f-718539d5c8a4?featured=949699",
  },
};

export const elements = {
  "advanced search link": "[href='/advanced-search']",
  "advanced search button": "#submit-button",
  "search button": "#searchbar-button-search-bar",
  "requestable checkbox": "text=Requestable",
  "login button": "[value='Submit']",
  "government documents checkbox": "//span[contains(text(), 'Show only US government documents')]",
  "Latin language checkbox": "//label[contains(.,'Latin')]",
  "year filter button": "#year-filter-button"
};

// trying to use built in locators
// export const elements = {
//   "advanced search link": "'a', { hasText: 'Advanced Search' }",
//   "government documents checkbox": "getByRole('checkbox').hasText('Show only US government documents')"
// };