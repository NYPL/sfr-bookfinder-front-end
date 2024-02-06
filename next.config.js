const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname);

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
  },
};
