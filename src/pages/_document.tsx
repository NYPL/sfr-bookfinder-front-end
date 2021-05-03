import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { Header, navConfig } from "@nypl/dgx-header-component";
import Footer from "@nypl/dgx-react-footer";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Header
            skipNav={{ target: "mainContent" }}
            navData={navConfig.current}
          />
          <Main />
          <Footer urlType="absolute" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
