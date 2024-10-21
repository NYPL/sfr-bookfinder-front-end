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
          <div id="nypl-header"></div>
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
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
