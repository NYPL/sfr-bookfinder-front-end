module.exports = {
  default: {
    paths: ["playwright/features/**/*.feature"],
    import: ["playwright/tests/**/*.ts", "playwright/support/**/*.ts"],
  },
};
