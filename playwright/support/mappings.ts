import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export type Pages = {
  route: string;
};

export const pages: { [name: string]: Pages } = {
  home: {
    route: "/",
  },
  "search results": {
    route: "/search?query=subject%3ASub-saharan+Africa",
  },
  "item details": {
    route: "/work/01a28167-8c8d-4141-a32f-718539d5c8a4?featured=949699",
  },
  "collection": {
    route: "/collection/297da3a0-bcdb-4eb3-a520-a330fd8fa370",
  },
  "advanced search": {
    route: "/advanced-search",
  },
  "edition details": {
    route: "/edition/949698",
  },
  "about": {
    route: "/about",
  },
  "license": {
    route: "/license",
  },
  "read online": {
    route: "/read/4440666",
  },
};

export const elements = {
  /** advSearch locators */
  "advanced search link": "[href='/advanced-search']",
  "advanced search button": "#submit-button",
  /** end advSearch locators */

  "search button": "#searchbar-button-search-bar",
  
  "requestable checkbox": "text=Requestable",

  /** gov docs locators */
  "government documents checkbox":
    "span:text('Show only US government documents')",

  /** language locators */
  "Latin language checkbox": "span:text('Latin')",
  "Russian language checkbox": "span:text('Russian')",
  
  /** pub year filter locators */
  "publication year apply button": "#year-filter-button",

  /** ReadOnlineTargets locators */
  "first read online button": "a:text('Read Online') >> nth=0",
  "Hathi Trust website":
    "iframe[src='https://babel.hathitrust.org/cgi/pt?id=mdp.39015034622749']",
  /** end ReadOnlineTargets locators */

  "first request button":
    "[href='https://www.nypl.org/research/collections/shared-collection-catalog/hold/request/b10715506-i13895605']",
  "English language checkbox": "span:text('English')",
  "first search result link": "h2 a >> nth=0",

  /** home page search locators */
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

  /** advanced search locators */
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

  /** item or search result specific */
  "keyword heading": "h1:text('IBM 1401')",
  "author heading": "h1:text('Laurie, Edward J.')",
  "Russian language subheader": "span:text('Russian')",
  "search result link": "a:text('Computers and how they work')",
  "delivery location heading": "h2:text('Choose a delivery location')",

  /** home page locators */
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
  "first collection card link": "a[href^='/collection/'] >> nth=0",
  "number of results": "#page-counter", // need?
  /** end home page locators */

  /** log in */
  "login button": "[value='Submit']",
  "first login for options button": "text=Log in for options >> nth=0",
  "username field": "#code",
  "password field": "#pin",

  /** itemDetailPageElements locators */
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
  "first read online button for all editions": "a:text('Read Online') >> nth=1",
  "second item edition": "a:text('Edition') >> nth=1",
  "The Novels of Jane Austen link":
  "//a[text()='The novels of Jane Austen'] >> nth=0",
  "The Novels of Jane Austen heading":
    "//h1[text()='The novels of Jane Austen']",
  "back to search results button": "a:text('Back to search results')",
  /** end itemDetailPageElements locators */

  /** author/keyword/subject/title searches */
  "first search result subject": "a:text('Petroleum')",
  "first search result title": "a:text('IBM 1401') >> nth=0",
  "first search result author":
    "span:text('By') > a:text('Corelli, Marie') >> nth=0",
  "first search result keyword": "a:text('IBM 1401') >> nth=0",
  "first government document author": "a:text('United States') >> nth=0",
  "first search result language": "div:text('Latin') >> nth=0",
  "first search result edition": "a:text('1900 Edition') >> nth=0",
  /** end searches */



  /** ereader locators */
  "Robot Soccer title": "//a[text()='Robot soccer'] >> nth=0",
  "e-reader table of contents button": "[aria-label='Table of Contents']",
  "e-reader settings button": "[aria-label='Settings']",
  "e-reader full screen button": "[aria-label='Toggle full screen']",
  "e-reader back to DRB button":
    "//span[text()='Back to Digital Research Books']",
  /** end ereader locators */
  
  "not yet available text": "//div[text()='Not yet available']",
  

  /** header locators */
  "header logo": "a[aria-label='The New York Public Library']",
  "my account header link": "[aria-label='My Account']",
  "catalog header link": "span:text('Go To The Catalog')",
  "research catalog header link": "span:text('Go To The Research Catalog')",
  "close my account header link": "[aria-label='Close']",
  "locations header link": "[href='https://www.nypl.org/locations']",
  "library card header link": "[href='https://www.nypl.org/library-card/new']",
  "email updates header link":
    "[href='https://pub.email.nypl.org/subscriptioncenter']",
  "donate header link": "[href='https://www.nypl.org/donate-button']",
  "shop header link":
    "[href='https://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_source=nypl.org&utm_medium=referral']",
  "books music movies header link":
    "[href='https://www.nypl.org/books-music-movies']",
  "research header link": "[href='https://www.nypl.org/research'] >> nth=0",
  "education header link": "[href='https://www.nypl.org/education']",
  "events header link": "[href='https://www.nypl.org/events']",
  "connect header link": "[href='https://www.nypl.org/connect']",
  "give header link": "[href='https://www.nypl.org/give']",
  "get help header link": "[href='https://www.nypl.org/get-help']",
  "search header link": "#searchButton",
  "search header label": "#searchInput-label",
  "search header text field": "#searchInput",
  "search books music movies radio button": "span:text('Search books, music, and movies')",
  "search research catalog radio button": "span:text('Search the Research Catalog')",
  "search library website radio button": "span:text('Search the library website')",
  "search header button": "#search-btn",
  "close search header link": "[aria-label='Close Search']",
  /** end header locators */
  /** footer locators */
  "accessibility footer link": "//a[@href='http://www.nypl.org/accessibility']",
  "press footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/media-center']",
  "careers footer link": "//a[@href='http://www.nypl.org/careers']",
  "space rental footer link": "//a[@href='http://www.nypl.org/spacerental']",
  "privacy policy footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy']",
  "other policies footer link": "//a[@href='http://www.nypl.org/policies']",
  "terms and conditions footer link":
    "//a[@href='http://www.nypl.org/terms-conditions']",
  "governance footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/leadership/board-trustees']",
  "rules and regulations footer link":
    "//a[@href='http://www.nypl.org/help/about-nypl/legal-notices/rules-and-regulations']",
  "about NYPL footer link": "//a[@href='http://www.nypl.org/help/about-nypl']",
  "language footer link": "//a[@href='http://www.nypl.org/language']",
  /** end footer locators */
  "feedback and help button": "//button[@id='open']",
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
  "1800": "1800",
  "1835": "1835",
  petroleum: "petroleum",
  "Robot Soccer": "Robot Soccer",
  "Jane Austen": "Jane Austen",
};
