/* eslint-disable react/prop-types */
import React from "react";

import { Provider } from 'react-redux';
import configureStore from '~/src/stores/configureStore';
import '~/styles/main.scss';


function MyApp({ Component, pageProps }) {
  const store = configureStore(pageProps.initialReduxState)

  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
