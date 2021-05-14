import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";
import appConfig from "~/config/appConfig";

//TODO: disable in dev and QA
const isProduction = true;
// const isProduction = process.env.NODE_ENV === "production";
const GA_TRACKING_ID = isProduction
  ? appConfig.analytics.production
  : appConfig.analytics.development;

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="icon" href={appConfig.favIconPath} />
          {/* enable analytics script only for production */}
          {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
