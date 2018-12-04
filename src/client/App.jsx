import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
// import useScroll from 'react-router-scroll';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../app/stores/ReduxStore';

import './styles/main.scss';

import routes from '../app/routes/routes';

if (loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

window.onload = () => {
  const appHistory = browserHistory;
  const appElement = document.getElementById('app');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={appHistory}>{routes.client}</Router>
    </Provider>,
    appElement,
  );
};
