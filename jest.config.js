// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>$1",
  },
  setupFilesAfterEnv: ["./setupTests.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  resetMocks: true,
};