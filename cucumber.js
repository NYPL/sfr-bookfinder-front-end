module.exports = {
  default: {
    // paths: ["playwright/features/**/*.feature"],
    import: ["playwright/tests/**/*.ts", "playwright/support/**/*.ts"],
  },
  worldParameters: {
    appUrl: "https://digital-research-books-beta.nypl.org/",
    headless: false,
  },
};
