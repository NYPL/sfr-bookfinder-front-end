import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import newrelic from "newrelic";

type DocumentProps = {
  browserTimingHeader: string;
};

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Invoke the newrelic agent
    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
      allowTransactionlessInjection: true,
    });

    return { ...initialProps, browserTimingHeader };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
          />
        </Head>
        <body>
          <div id="nypl-header"></div>
          <script
            src="https://ds-header.nypl.org/header.min.js?containerId=nypl-header"
            async
          ></script>
          <Main />
          <div id="nypl-footer"></div>
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
