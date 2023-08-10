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
  "Latin language checkbox": "`span:text('Latin')`",
  "Russian language checkbox": "span:text('Russian')",
  "publication year apply button": "#year-filter-button",
  "first read online button": "text=Read Online >> nth=0",
  "first read online button for all edition": "text=Read Online >> nth=1",
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
  "publication year from filter": "#date-filter-from",
  "publication year to filter": "#date-filter-to",
  "advanced search heading": "h1:text('Advanced Search')",
  "advanced search breadcrumb": "//a[@href='/advanced-search']",
  "keyword search label": "#search-Keyword-label",
  "author search label": "#search-Author-label",
  "subject search label": "#search-Subject-label",
  "title search label": "#search-Title-label",
  "date filter from label": "#date-filter-from-label",
  "date filter from field": "#date-filter-from",
  "date filter to label": "#date-filter-to-label",
  "date filter to field": "#date-filter-to",
  "advanced search clear button": "#reset-button",
  "keyword heading": "h1:text('IBM 1401')",
  "author heading": "h1:text('Laurie, Edward J.')",
  "russian language subheader": "//div[contains(text(),'Russian')]",
  "search result link": "a:text('Computers and how they work')",
  "delivery location heading": "h2:text('Choose a delivery location')",
  "site name heading": "h1:text('Digital Research Books')",
  "Home breadcrumb link": "a[href='https://www.nypl.org'] > .breadcrumb-label",
  "Research breadcrumb link":
    "a[href='https://www.nypl.org/research'] > .breadcrumb-label",
  "Digital Research Books Beta breadcrumb link":
    "span.breadcrumb-label:text('Digital Research Books Beta')",
  "intro text":
    "span:text('Find millions of digital books for research from multiple sources')",
  "search heading": "h1:text('Search the World')",
  "collections heading": "h2:text('Recently Added Collections')",
  footer: "#nypl-footer",
  "feedback button": "button:text('Feedback')",
  "item title": "#work-title",
  "item author": "div:text('By') > a:text('Library of Congress')",
  "item featured edition heading": "#featured-edition",
  "item featured edition cover": "[alt='Placeholder Cover'] >> nth=0",
  "item featured edition year": "a:text('Edition') >> nth=0",
  "item featured edition publisher": "div:text('Published by') >> nth=0",
  "item featured edition language": "div:text('Languages') >> nth=0",
  "item featured edition license": "[href='/license'] >> nth=0",
  "item details heading": "#details-list-heading",
  "item details authors heading": "dt:text('Authors')",
  "item details authors": "dd > a:text('Library of Congress')",
  "item details subjects heading": "dt:text('Subjects')",
  "item details subjects": "a:text('Africa, Sub-Saharan')",
  "item details languages heading": "dt:text('Languages')",
  "item details languages": "li:text('English')",
  "item all editions heading": "#all-editions",
  "items currently available online toggle text":
    "span + span:text('Show only items currently available online')",
  "items currently available online toggle":
    "span:text('Show only items currently available online')",
  "second item edition": "a:text('Edition') >> nth=1",
  "Hathi Trust website":
    "iframe[src='https://babel.hathitrust.org/cgi/pt?id=mdp.39015034622749']",
  "first search result subject": "a:text('Petroleum')",
  "first search result title": "a:text('IBM 1401') >> nth=0",
  "first search result author":
    "span:text('By') > a:text('Corelli, Marie') >> nth=0",
  "first search result keyword": "a:text('IBM 1401') >> nth=0",
  "first government document author": "a:text('United States') >> nth=0",
  "first search result language": "div:text('Latin') >> nth=0",
  "first search result edition": "a:text('1900 Edition') >> nth=0",
  "first collection card link": "a[href^='/collection/'] >> nth=0",
  "number of results": "#page-counter",
  "Robot Soccer title": "//a[text()='Robot soccer']",
  "e-reader table of contents button": "[aria-label='Table of Contents']",
  "e-reader settings button": "[aria-label='Settings']",
  "e-reader full screen button": "[aria-label='Toggle full screen']",
  "e-reader back to DRB button":
    "//span[text()='Back to Digital Research Books']",
  "not yet available text": "//div[text()='Not yet available']",
  "accessibility footer link": "//a[@href='http://www.nypl.org/accessibility']",
  "press footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/media-center']",
  "careers footer link": "//a[@href='http://www.nypl.org/careers']",
  "space rental footer link": "//a[@href='http://www.nypl.org/spacerental']",
  "privacy footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy']",
  "other policies footer link": "//a[@href='http://www.nypl.org/policies']",
  "terms and conditions footer link":
    "//a[@href='http://www.nypl.org/terms-conditions']",
  "governance footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/leadership/board-trustees']",
  "rules and regulations footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/legal-notices/rules-and-regulations']",
  "about footer link": "//a[@href='http://www.nypl.org/help/about-nypl']",
  "language footer link": "//a[@href='http://www.nypl.org/language']",
  "accessibility page heading": "//h1[text()='Accessibility at NYPL']",
  "press page heading": "//h1[text()='Press Releases']",
  "careers page heading": "//h1[text()='Careers at NYPL']",
  "space rental page heading": "//h1//span[text()='Space Rental']",
  "privacy page heading":
    "//h1[text()='The New York Public Library Privacy Policy']",
  "other policies page heading": "//h1[text()='Policies']",
  "terms and conditions page heading": "//h1[text()='Terms & Conditions']",
  "governance page heading":
    "//h1[text()='The New York Public Library Board of Trustees']",
  "rules and regulations page heading":
    "//h1[text()='General Policies and Rules']",
  "about page heading": "//h1[text()='About The New York Public Library']",
  "language page heading": "//h1[text()='Language']",
  "The Novels of Jane Austen link": "//a[text()='The novels of Jane Austen']",
  "The Novels of Jane Austen heading":
    "//h1[text()='The novels of Jane Austen']",
  "back to search results button": "//a[text()='Back to search results']",
};

export const inputs = {
  "IBM 1401": "IBM 1401",
  "Laurie, Edward J.": "Laurie, Edward J.",
  revolution: "revolution",
  France: "France",
  "Corelli, Marie": "Corelli, Marie",
  Africa: "Africa",
  "catalog username": process.env.CATALOG_USERNAME,
  "catalog password": process.env.CATALOG_USER_PIN,
  swimming: "swimming",
  "New York": "New York",
  "1900": "1900",
  petroleum: "petroleum",
  "Robot Soccer": "Robot Soccer",
  "Jane Austen": "Jane Austen",
};
