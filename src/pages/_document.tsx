import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@nypl/design-system-react-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // Invoke the newrelic agent
    require("newrelic");
    return { ...initialProps };
  }

  render() {
    const initialColorMode = "dark";
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
