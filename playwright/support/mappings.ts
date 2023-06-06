import { itemDetailURL } from "./constants";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

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
  "search category dropdown": "[aria-label='Select a search category']",
  keyword: "[value='keyword']",
  author: "[value='author']",
  title: "[value='title']",
  subject: "[value='subject']",
  "keyword search box": "#search-Keyword",
  "author search box": "#search-Author",
  "subject search box": "#search-Subject",
  "title search box": "#search-Title",
  "homepage search box": "[aria-label='Item Search']",
  "username field": "#code",
  "password field": "#pin",
};

export const inputs = {
  "IBM 1401": "IBM 1401",
  "Laurie, Edward J.": "Laurie, Edward J.",
  "revolution": "revolution",
  "France": "France",
  "Corelli, Marie": "Corelli, Marie",
  "Africa": "Africa",
  "catalog username": process.env.CATALOG_USERNAME,
  "catalog password": process.env.CATALOG_USER_PIN,
};