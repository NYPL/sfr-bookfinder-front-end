import { itemDetailURL } from "./constants";

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
  "government documents checkbox":
    "span:text('Show only US government documents')",
  "Latin language checkbox": "span:text('Latin')",
  "year filter button": "#year-filter-button",
  "first read online button": "text=Read Online >> nth=0",
  "first request button":
    "[href='https://www.nypl.org/research/collections/shared-collection-catalog/hold/request/b10715506-i13895605']",
  "English language checkbox": "span:text('English')",
  "first search result link": "h2 a >> nth=0",
};
