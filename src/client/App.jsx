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

// Activate or Deactivate feature flags
const featureFlag = window.location.toString().split('feature=')[1];
let activeFeatures = [];
if (featureFlag) {
  // eslint-disable-next-line no-underscore-dangle
  if (!FeatureFlags.store._isFeatureActive(activeFeatures)) {
    FeatureFlags.utils.activateFeature(featureFlag);
    activeFeatures.push(featureFlag);
  }
// eslint-disable-next-line no-underscore-dangle
} else if (FeatureFlags.store._isFeatureActive(activeFeatures)) {
  FeatureFlags.utils.deactivateFeature(featureFlag);
  activeFeatures = [];
}

browserHistory.listen(location => gaUtils.trackPageview(`${location.pathname}${location.search}`));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes.default}</Router>
  </Provider>,
  appElement,
);
