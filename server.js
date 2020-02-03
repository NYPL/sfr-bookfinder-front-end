/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
import path from 'path';
import express from 'express';
import compress from 'compression';
import colors from 'colors';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { config as analyticsConfig } from 'dgx-react-ga';
import webpack from 'webpack';
import { Provider } from 'react-redux';
import apiRoutes from './src/server/ApiRoutes/ApiRoutes';
import routes from './src/app/routes/routes';
import configureStore from './src/app/stores/configureStore';
import appConfig from './appConfig';
import webpackConfig from './webpack.config.babel';

import { documentTitles } from './src/app/constants/labels';

const ROOT_PATH = __dirname;
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views');
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(compress());

// Disables the Server response from
// displaying Express as the server engine
app.disable('x-powered-by');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

app.set('port', process.env.PORT || 3001);

app.use(express.static(DIST_PATH));
// For images
app.use('*/src/client', express.static(INDEX_PATH));

app.use('/', apiRoutes);

app.get('/*', (req, res) => {
  const appRoutes = routes.default;

  match({ routes: appRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation);
    } else if (renderProps) {
      if (!res.data) {
        res.data = {};
      }

      const store = configureStore(res.data);

      const application = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );

      // ////// on development serve only the front-end to allow hot reloading /////
      // if (!isProduction) {
      // application = null;
      // }
      // /////

      let appTitle = documentTitles.home || appConfig.appTitle;
      if (req.url && req.url.match(/work\?/)) {
        appTitle = documentTitles.workItem;
      } else if (req.url && req.url.match(/search\?/)) {
        appTitle = documentTitles.search;
      }
      // First parameter references the ejs filename
      res.render('index', {
        application,
        appData: JSON.stringify(res.data).replace(/</g, '\\u003c'),
        appTitle,
        favicon: appConfig.favIconPath,
        gaCode: process.env.APP_ENV === 'production' ? appConfig.analytics.production : appConfig.analytics.development,
        webpackPort: WEBPACK_DEV_PORT,
        appEnv: process.env.APP_ENV,
        apiUrl: '',
        isProduction,
      });
    } else {
      console.log('Rendering error', error);
      res.status(404).send(error);
    }
  });
});

const server = app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(colors.red(error));
  }

  console.log(colors.yellow.underline(appConfig.appName));
  console.log(colors.green('Express server is listening at'), colors.cyan(`localhost:${app.get('port')}`));
});

// This function is called when you want the server to die gracefully
// i.e. wait for existing connections
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully.');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });
  // if after
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 1000);
};
// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
 */
if (!isProduction) {
  const WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    port: 3000,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With',
    },
  }).listen(3000, 'localhost', (error) => {
    if (error) {
      console.log(colors.red(error));
    }
    console.log(colors.magenta('Webpack Dev Server listening at'), colors.cyan('localhost:3000'));
  });
}
