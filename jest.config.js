// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>$1",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["./setupTests.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  resetMocks: true,
};
