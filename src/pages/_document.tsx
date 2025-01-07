import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import appConfig from "~/config/appConfig";
import Script from "next/script";

type DocumentProps = {
  browserTimingHeader: string;
};

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script src={appConfig.analytics} async />
        </Head>
        <body
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div id="nypl-header" style={{ flexShrink: 0 }}></div>
          <Script
            src="https://ds-header.nypl.org/header.min.js?containerId=nypl-header"
            strategy="beforeInteractive"
            async
          ></Script>
          <Main />
          <div
            id="nypl-footer"
            style={{ marginTop: "auto", paddingTop: "2rem" }}
          ></div>
          <Script
            src="https://ds-header.nypl.org/footer.min.js?containerId=nypl-footer"
            strategy="lazyOnload"
            async
          ></Script>
          {/* OptinMonster */}
          <Script
            id="optinmonster"
            dangerouslySetInnerHTML={{
              __html: `(function(d,u,ac){var s=d.createElement('script');s.type='text/javascript';s.src='https://a.omappapi.com/app/js/api.min.js';s.async=true;s.dataset.user=u;s.dataset.account=ac;d.getElementsByTagName('head')[0].appendChild(s);})(document,12468,1044);`,
            }}
          ></Script>
          {/* /OptinMonster */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
