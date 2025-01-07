import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import "@nypl/design-system-react-components/dist/styles.css";
import "~/styles/main.scss";
import Head from "next/head";
import appConfig from "~/config/appConfig";
import { documentTitles } from "../constants/labels";
import "@nypl/web-reader/dist/index.css";
import { FeatureFlagProvider } from "../context/FeatureFlagContext";
import { trackPageview } from "../lib/adobe/Analytics";
import { pageNames } from "../constants/analytics";
import { getQueryDecodedString } from "../util/SearchQueryUtils";
import NewRelicSnippet from "../lib/newrelic/NewRelic";
import ErrorBoundary from "../components/ErrorBoundary";
import { FeedbackProvider } from "../context/FeedbackContext";
import { ParsedUrlQuery } from "querystring";
import Script from "next/script";

if (process.env.APP_ENV === "testing") {
  const { initMocks } = await import("mocks");
  await initMocks();
}

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
const setTitle = (query: ParsedUrlQuery) => {
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

const sendAnalytics = (query: ParsedUrlQuery, pathname: string) => {
  if (query.workId) {
    trackPageview(pageNames.workItem + query.workId);
  } else if (query.editionId) {
    trackPageview(pageNames.editionItem + query.editionId);
  } else if (query.query) {
    const searchPageName = pageNames.search + getQueryDecodedString(query);
    trackPageview(searchPageName);
  } else if (query.linkId) {
    trackPageview(pageNames.readItem + query.linkId);
  } else if (query.collectionId) {
    trackPageview(pageNames.collection + query.collectionId);
  } else if (pathname === "/advanced-search") {
    trackPageview(pageNames.advancedSearch);
  } else if (pathname === "/about") {
    trackPageview(pageNames.about);
  } else if (pathname === "/copyright") {
    trackPageview(pageNames.copyright);
  } else {
    trackPageview(pageNames.home);
  }
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!isServerRendered()) {
      if (!router.query.linkId) {
        document.getElementById("nypl-header").style.display = "block";
        document.getElementById("nypl-footer").style.display = "block";
      }
      sendAnalytics(router.query, router.pathname);
    }
  });

  return (
    <>
      {/* OptinMonster */}
      <Script
        id="optinmonster"
        dangerouslySetInnerHTML={{
          __html: `(function(d,u,ac){var s=d.createElement('script');s.type='text/javascript';s.src='https://a.omappapi.com/app/js/api.min.js';s.async=true;s.dataset.user=u;s.dataset.account=ac;d.getElementsByTagName('head')[0].appendChild(s);})(document,12468,1044);`,
        }}
      ></Script>
      {/* /OptinMonster */}
      <Head>
        <title>{setTitle(router.query)}</title>

        <link rel="icon" href={appConfig.favIconPath} />
      </Head>
      <FeedbackProvider>
        <ErrorBoundary>
          <NewRelicSnippet />
          <FeatureFlagProvider>
            <Component {...pageProps} />
          </FeatureFlagProvider>
        </ErrorBoundary>
      </FeedbackProvider>
    </>
  );
};

export default MyApp;
