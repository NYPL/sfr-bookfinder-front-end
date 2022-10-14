import {
  IWorldOptions,
  setWorldConstructor,
  setDefaultTimeout,
  World,
  After,
  Before,
} from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  BrowserContextOptions,
  chromium,
  Page,
} from "@playwright/test";

interface PlaywrightParameters {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  browser!: Browser;
  constructor(options: IWorldOptions) {
    super(options);
  }
  async init(
    contextOptions?: BrowserContextOptions
  ): Promise<PlaywrightParameters> {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();

    const browser = await this.newBrowser();
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    this.browser = browser;
    this.context = context;
    this.page = page;

    return { browser, context, page };
  }

  private newBrowser = async (): Promise<Browser> => {
    return await chromium.launch({
      headless: false,
      slowMo: 200,
    });
  };
}

setWorldConstructor(CustomWorld);

setDefaultTimeout(10 * 1000);

Before(async function (this: CustomWorld) {
  const contextOptions = {
    ignoreHTTPSErrors: true,
  };
  return await this.init(contextOptions);
});

After(async function (this: CustomWorld) {
  const { browser } = this;
  return await browser.close();
});
