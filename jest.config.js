// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "testUtils",
    "fixtures",
    "componentHelpers",
  ],
  setupFiles: ["./jest.setEnv.ts"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  resetMocks: true,
};
