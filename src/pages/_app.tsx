/* eslint-disable react/prop-types */
import React from "react";

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Provider } from "react-redux";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/stores/configureStore' o... Remove this comment to see the full error message
import configureStore from "~/src/stores/configureStore";
import "~/styles/main.scss";

function MyApp({ Component, pageProps }: any) {
  const store = configureStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
