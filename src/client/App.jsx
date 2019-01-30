import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
// import useScroll from 'react-router-scroll';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
// import store from '../app/stores/ReduxStore';

import './styles/main.scss';

import routes from '../app/routes/routes';

// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from '../app/stores/Reducers';

if (loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

window.onload = () => {
  const appHistory = browserHistory;
  const appElement = document.getElementById('app');

  const preloadedState = window.__PRELOADED_STATE__;

  delete window.__PRELOADED_STATE__;

  const store = createStore(searchReducer, preloadedState);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={appHistory}>{routes.default}</Router>
    </Provider>,
    appElement,
  );
};
