const withTM = require("next-transpile-modules")([
  "library-simplified-webpub-viewer",
]);
const path = require("path");
const { AIRTABLE_API_KEY } = process.env;

const config = {
  env: {
    AIRTABLE_API_KEY: AIRTABLE_API_KEY,
  },
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = withTM(config);
