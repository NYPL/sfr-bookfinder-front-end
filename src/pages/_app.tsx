import React, { useEffect } from "react";
import type { AppProps } from "next/app";
// import gaUtils, * as gtag from "../lib/Analytics";
import { useRouter } from "next/router";

import "@nypl/design-system-react-components/dist/styles.css";
import "~/styles/main.scss";
import Head from "next/head";
import appConfig from "~/config/appConfig";
import { documentTitles } from "../constants/labels";
import "@nypl/web-reader/dist/index.css";
import { FeatureFlagProvider } from "../context/FeatureFlagContext";
import { pageViewData } from "../constants/analytics";
import { trackPageview } from "../lib/Analytics";

/**
 * Determines if we are running on server or in the client.
 * @return {boolean} true if running on server
 */
function isServerRendered(): boolean {
  return typeof window === "undefined";
}

/**
 * Sets page title and sends analytics data
 * @param query the router query
 * @returns the title of the page (as shown in browser tab)
 */
const setTitle = (query: any) => {
  if (query.workId) {
    return documentTitles.workItem;
  } else if (query.editionId) {
    return documentTitles.editionItem;
  } else if (query.query) {
    return documentTitles.search;
  } else if (query.linkId) {
    return documentTitles.readItem;
  } else if (query.collectionId) {
    return documentTitles.collection;
  } else {
    return documentTitles.home;
  }
};

const sendAnalytics = (query: any) => {
  if (query.workId) {
    trackPageview(pageViewData.workItem);
  } else if (query.editionId) {
    trackPageview(pageViewData.editionItem);
  } else if (query.query) {
    trackPageview(pageViewData.search);
  } else if (query.linkId) {
    trackPageview(pageViewData.readItem);
  } else if (query.collectionId) {
    trackPageview(pageViewData.readItem);
  } else {
    trackPageview(pageViewData.home);
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isServerRendered()) {
      sendAnalytics(router.query);
    }
  });

  return (
    <>
      <Head>
        <title>{setTitle(router.query)}</title>

        <link rel="icon" href={appConfig.favIconPath} />

        <script src={appConfig.analytics} async />
      </Head>
      <FeatureFlagProvider>
        <Component {...pageProps} />
      </FeatureFlagProvider>
    </>
  );
}

export default MyApp;
