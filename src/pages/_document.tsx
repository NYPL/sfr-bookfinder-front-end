import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import appConfig from "~/config/appConfig";

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
        <body>
          <div id="nypl-header"></div>
          <script
            src="https://ds-header.nypl.org/header.min.js?containerId=nypl-header"
            async
          ></script>
          <Main />
          <div id="nypl-footer" style={{ marginTop: "2rem" }}></div>
          <script
            src="https://ds-header.nypl.org/footer.min.js?containerId=nypl-footer"
            async
          ></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
