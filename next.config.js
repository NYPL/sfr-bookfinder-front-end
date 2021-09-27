const path = require("path");

const config = {
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

module.exports = config;
