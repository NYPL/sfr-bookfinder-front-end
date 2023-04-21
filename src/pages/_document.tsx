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
            type="module"
            src="https://nypl-header-app-git-dsd-1416-header-js-endpoint-nypl.vercel.app/header.min.js?containerId=nypl-header"
            async
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
