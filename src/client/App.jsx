import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../app/stores/configureStore';

import './styles/main.scss';

import routes from '../app/routes/routes';

if (loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

window.onload = () => {
  const appElement = document.getElementById('app');
  const preloadedState = window.__PRELOADED_STATE__;

  delete window.__PRELOADED_STATE__;

  const store = configureStore(preloadedState);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes.default}</Router>
    </Provider>,
    appElement,
  );
};
