import path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const sassPaths = require('@nypl/design-toolkit')
  .includePaths.map(sassPath => sassPath)
  .join('&');

// References the application's root path
const ROOT_PATH = path.resolve(__dirname);

// Sets the variable as either development or production
const ENV = process.env.NODE_ENV || 'development';

// Sets appEnv so the the header component will point to the search app on either Dev or Prod
const appEnv = process.env.APP_ENV ? process.env.APP_ENV : 'production';

// Holds the common settings for any environment
const commonSettings = {
  // path.resolve - resolves to an absolute path
  // This is the path and file of our top level
  // React App that is to be rendered.
  entry: path.resolve(ROOT_PATH, 'src/client/App.jsx'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    // Sets the output path to ROOT_PATH/dist
    path: path.resolve(ROOT_PATH, 'dist'),
    // Sets the name of the bundled application files
    // Additionally we can isolate vendor files as well
    filename: 'bundle.js',
  },
  plugins: [
    // Cleans the Dist folder after every build.
    // Alternately, we can run rm -rf dist/ as
    // part of the package.json scripts.
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.DefinePlugin({
      loadA11y: process.env.loadA11y || false,
      appEnv: JSON.stringify(appEnv),
    }),
  ],
};

/**
 * DEVELOPMENT ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional development specific settings.
 *
 */
// Need to configure webpack-dev-server and hot-reload
// module correctly.
if (ENV === 'development') {
  module.exports = merge(commonSettings, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        path.resolve(ROOT_PATH, 'src/client/App.jsx'),
      ],
    },
    output: {
      publicPath: 'http://localhost:3000/',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          APP_ENV: JSON.stringify('development'),
        },
      }),
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
        {
          test: /\.scss?$/,
          use: ['style-loader', 'css-loader', `sass-loader?includePaths=${sassPaths}`],
          include: path.resolve(ROOT_PATH, 'src'),
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: 'file-loader?name=assets/[name].[ext]',
          include: [path.resolve(__dirname, 'src/assets')],
        },
      ],
    },
  });
}

/**
 * PRODUCTION ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional production specific settings.
 *
 */
if (ENV === 'production') {
  module.exports = merge(commonSettings, {
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          APP_ENV: JSON.stringify(appEnv),
        },
      }),
    ],
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
        {
          test: /\.scss?$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', `sass-loader?includePaths=${sassPaths}`],
          include: path.resolve(ROOT_PATH, 'src'),
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: 'file-loader?name=assets/[name].[ext]',
          include: [path.resolve(__dirname, 'src/assets')],
        },
      ],
    },
  });
}
