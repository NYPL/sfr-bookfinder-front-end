import '@babel/polyfill';
import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import { gaUtils } from 'dgx-react-ga';
import FeatureFlags from 'dgx-feature-flags';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../app/stores/Store';
import './styles/main.scss';

import routes from '../app/routes/routes';

if (global.loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

const appElement = global.document.getElementById('app');

// Used to activate/deactivate AB tests on global namespace.
if (!window.dgxFeatureFlags) {
  window.dgxFeatureFlags = FeatureFlags.utils;
}

browserHistory.listen(location => gaUtils.trackPageview(`${location.pathname}${location.search}`));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes.default}</Router>
  </Provider>,
  appElement,
);
