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
  "first login for options button": "text=Log in for options >> nth=0",
  "government documents checkbox": "//span[contains(text(), 'Show only US government documents')]",
  "Latin language checkbox": "//label[contains(.,'Latin')]",
  "year filter button": "#year-filter-button",
  "first read online button": "text=Read Online >> nth=0",
  "first request button": "[href='https://www.nypl.org/research/collections/shared-collection-catalog/hold/request/b10715506-i13895605']",
  "English language checkbox": "//*[@id='languages-checkbox-group-0-wrapper']/label/span[1]"
};

// trying to use built in locators
// export const elements = {
//   "advanced search link": "'a', { hasText: 'Advanced Search' }",
//   "government documents checkbox": "getByRole('checkbox').hasText('Show only US government documents')"
// };