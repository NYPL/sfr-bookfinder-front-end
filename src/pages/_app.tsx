import React from "react";
import type { AppProps } from "next/app";

import "@nypl/design-system-react-components/dist/styles.css";
import "~/styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
