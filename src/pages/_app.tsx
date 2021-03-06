import React from "react";
import type { AppProps } from "next/app";
import gaUtils, * as gtag from "../lib/Analytics";
import { useRouter } from "next/router";

import "@nypl/design-system-react-components/dist/styles.css";
import "~/styles/main.scss";
import Head from "next/head";
import appConfig from "~/config/appConfig";
import { documentTitles } from "../constants/labels";

/**
 * Determines if we are running on server or in the client.
 * @return {boolean} true if running on server
 */
function isServerRendered(): boolean {
  return typeof window === "undefined";
}

// Get the Google Analytics code for the HTML snippet below.
const isProduction = true;
const gaCode = gtag.getGoogleGACode(isProduction);
// Set up Google Analytics if it isn't already. There's an HTML snippet in the
// DOM below that initializes GA. If it fails, this tries again. The HTML
// snippet is better since it works without javascript.
if (!isServerRendered()) {
  gaUtils.setupAnalytics(isProduction);
}

/**
 * Sets page title
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
  } else {
    return documentTitles.home;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{setTitle(router.query)}</title>

        <link rel="icon" href={appConfig.favIconPath} />
        {/* <!-- Google Analytics --> */}
        {/* We can't directly put the script into this component because React
            doesn't allow it, so we must add it through the
            `dangerouslySetInnerHTML` prop.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
              ga('create', '${gaCode}', 'auto');
              ga('send', 'pageview');
            `,
          }}
        />
        {/* <!-- End Google Analytics --> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
