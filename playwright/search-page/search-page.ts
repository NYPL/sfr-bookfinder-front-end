import { expect, Locator, Page } from "@playwright/test";

class SearchPage {
  readonly page: Page;
  readonly homepageSearchBox: Locator;
  readonly searchButton: Locator;

  readonly requestableCheckbox: Locator;
  readonly firstLoginForOptionsButton: Locator;
  readonly governmentDocumentsCheckbox: Locator;
  readonly firstGovernmentDocumentAuthor: Locator;

  readonly latinLanguageCheckbox: Locator;
  readonly spanishLanguageCheckbox: Locator;
  readonly japaneseLanguageCheckbox: Locator;
  readonly polishLanguageCheckbox: Locator;
  readonly portugueseLanguageCheckbox: Locator;
  readonly firstSearchResultLatinLanguage: Locator;
  readonly firstSearchResultSpanishLanguage: Locator;
  readonly firstSearchResultJapaneseLanguage: Locator;
  readonly firstSearchResultPolishLanguage: Locator;
  readonly firstSearchResultPortugueseLanguage: Locator;

  readonly publicationYearFromFilter: Locator;
  readonly publicationYearToFilter: Locator;
  readonly publicationYearApplyButton: Locator;
  readonly firstSearchResultEdition: Locator;

  readonly firstReadOnlineButton: Locator;
  readonly hathiTrustWebsite: Locator;

  readonly categoryDropdown: Locator;
  readonly firstSearchResultLink: Locator;
  readonly firstSearchResultKeyword: Locator;
  readonly firstSearchResultSubject: Locator;
  readonly firstSearchResultTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homepageSearchBox = page.locator("[aria-label='Item Search']");
    this.searchButton = page.locator("#searchbar-button-search-bar");

    this.requestableCheckbox = page.locator("span:text('Requestable')");
    this.firstLoginForOptionsButton = page.locator(
      "a:text('Log in to request scan') >> nth=0"
    );
    this.governmentDocumentsCheckbox = page.locator(
      "span:text('Show only US government documents')"
    );
    this.firstGovernmentDocumentAuthor = page.locator(
      "a:text('United States') >> nth=0"
    );
    this.firstSearchResultKeyword = page.locator("a:text('IBM 1401') >> nth=0");
    this.firstReadOnlineButton = page.locator("a:text('Read Online') >> nth=0");
    this.hathiTrustWebsite = page.locator(
      "iframe[src='https://babel.hathitrust.org/cgi/pt?id=hvd.32044079201976']"
    );

    this.latinLanguageCheckbox = page.locator("span:text('Latin')");
    this.spanishLanguageCheckbox = page.locator("span:text('Spanish')");
    this.japaneseLanguageCheckbox = page.locator("span:text('Japanese')");
    this.polishLanguageCheckbox = page.locator("span:text('Polish')");
    this.portugueseLanguageCheckbox = page.locator("span:text('Portuguese')");
    this.firstSearchResultLatinLanguage = page.locator(
      "div:text('Latin') >> nth=0"
    );
    this.firstSearchResultSpanishLanguage = page.locator(
      "div:text('Spanish') >> nth=0"
    );
    this.firstSearchResultJapaneseLanguage = page.locator(
      "div:text('Japanese') >> nth=0"
    );
    this.firstSearchResultPolishLanguage = page.locator(
      "div:text('Polish') >> nth=0"
    );
    this.firstSearchResultPortugueseLanguage = page.locator(
      "div:text('Portuguese') >> nth=0"
    );

    this.publicationYearFromFilter = page.locator("#date-filter-from");
    this.publicationYearToFilter = page.locator("#date-filter-to");
    this.publicationYearApplyButton = page.locator("#year-filter-button");
    this.firstSearchResultEdition = page.locator(
      "a:text('1900 Edition') >> nth=0"
    );

    this.categoryDropdown = page.locator('select[name="category dropdown"]');
    this.firstSearchResultLink = page.locator("h2 a >> nth=0");
    this.firstSearchResultSubject = page.locator(
      "a:text('Petroleum') >> nth=0"
    );
    this.firstSearchResultTitle = page.locator("a:text('IBM 1401') >> nth=0");
  }

  async navigateToSearchPage() {
    await this.page.goto("/search?query=subject%3Awashington+dc");
  }

  async fillSearchBox(query: string) {
    await this.homepageSearchBox.fill(query);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async clickRequestableCheckbox() {
    await this.requestableCheckbox.click();
  }

  async verifyFirstLoginForOptionsButtonVisible() {
    await expect(this.firstLoginForOptionsButton).toBeVisible();
  }

  async clickGovernmentDocumentsCheckbox() {
    await this.governmentDocumentsCheckbox.click();
  }

  async verifyFirstGovernmentDocumentAuthorVisible() {
    await expect(this.firstGovernmentDocumentAuthor).toBeVisible();
  }

  async verifyFirstSearchResultKeywordVisible() {
    await expect(this.firstSearchResultKeyword).toBeVisible();
  }

  async clickLanguageCheckbox(languageCheckbox: Locator) {
    await languageCheckbox.click();
  }

  async verifyFirstSearchResultLanguageVisible(languageResult: Locator) {
    await expect(languageResult).toBeVisible();
  }

  async fillPublicationYearFrom(year: string) {
    await this.publicationYearFromFilter.fill(year);
  }

  async fillPublicationYearTo(year: string) {
    await this.publicationYearToFilter.fill(year);
  }

  async clickPublicationYearApplyButton() {
    await this.publicationYearApplyButton.click();
  }

  async verifyFirstSearchResultEditionVisible() {
    await expect(this.firstSearchResultEdition).toBeVisible();
  }

  async clickFirstReadOnlineButton() {
    await this.firstReadOnlineButton.click();
  }

  async verifyHathiTrustWebsiteVisible() {
    await expect(this.hathiTrustWebsite).toBeVisible();
  }

  async selectCategory(category: string) {
    await this.categoryDropdown.selectOption(category);
  }

  async clickFirstSearchResultLink() {
    await this.firstSearchResultLink.click();
  }

  async verifyFirstSearchResultSubjectVisible() {
    await expect(this.firstSearchResultSubject).toBeVisible();
  }

  async verifyFirstSearchResultTitleVisible() {
    await expect(this.firstSearchResultTitle).toBeVisible();
  }
}

export { SearchPage };
