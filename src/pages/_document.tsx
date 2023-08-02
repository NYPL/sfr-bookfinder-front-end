import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // Invoke the newrelic agent
    require("newrelic");
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
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
