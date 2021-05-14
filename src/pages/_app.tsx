import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import * as gtag from "../lib/gtag";

import "@nypl/design-system-react-components/dist/styles.css";
import "~/styles/main.scss";
import { useRouter } from "next/router";
import appConfig from "~/config/appConfig";
//TODO: disable in dev and QA
const isProduction = true;
// const isProduction = process.env.NODE_ENV === "production";

const GA_TRACKING_ID = isProduction
  ? appConfig.analytics.production
  : appConfig.analytics.development;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url, GA_TRACKING_ID);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
