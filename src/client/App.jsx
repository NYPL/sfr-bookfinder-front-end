import '@babel/polyfill';
import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../app/stores/Store';

import './styles/main.scss';

import routes from '../app/routes/routes';

if (global.loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

const appElement = global.document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes.default}</Router>
  </Provider>,
  appElement,
);
