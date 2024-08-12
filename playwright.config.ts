import { devices, PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";

// uses the .env.test env file
dotenv.config({ path: "./.env.testing" });

const config: PlaywrightTestConfig = {
  testDir: "playwright/integration",
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,
  },

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Reporter to use
  reporter: "html",

  use: {
    // headless: true,
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://localhost:3000",

    /* When running tests locally, record a trace for each test, but remove it from successful runs.
     * On CI, turn this feature off. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? "off" : "retain-on-failure",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
