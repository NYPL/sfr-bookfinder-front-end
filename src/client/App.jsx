/* eslint-disable no-underscore-dangle */
import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../app/stores/configureStore';

import './styles/main.scss';

import routes from '../app/routes/routes';

if (global.loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

const hashLinkScroll = () => {
  const { hash } = global.window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = global.document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
};

global.window.onload = () => {
  const appElement = global.document.getElementById('app');
  const preloadedState = global.window.__PRELOADED_STATE__;

  delete global.window.__PRELOADED_STATE__;

  const store = configureStore(preloadedState);

  ReactDOM.hydrate(
    <Provider store={store}>
      <Router
        history={browserHistory}
        onUpdate={hashLinkScroll}
      >
        {routes.default}
      </Router>
    </Provider>,
    appElement,
  );
};
