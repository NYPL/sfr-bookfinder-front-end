import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
// import useScroll from 'react-router-scroll';
import { Router, browserHistory } from 'react-router';
// import Iso from 'iso';
import { Provider } from 'react-redux';
import store from '../app/stores/ReduxStore';
import Application from '../app/components/Application/Application';

// import alt from '../app/alt';

import './styles/main.scss';

import routes from '../app/routes/routes';

if (loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

window.onload = () => {
  // const store = createStore(searchResults);
  const appHistory = browserHistory;
  const appElement = document.getElementById('app');
  console.log(store);

  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    appElement,
  );

  // Render Isomorphically
  // Iso.bootstrap((state, container) => {
  //   console.log('Application rendered Isomorphically.');
  //   alt.bootstrap(state);

  //   ReactDOM.render(
  //     <Router history={appHistory}>{routes.client}</Router>,
  //     container,
  //   );
  // });
};
