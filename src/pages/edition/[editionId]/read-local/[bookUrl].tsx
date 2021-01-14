import React from "react";
import Layout from "~/src/components/Layout/Layout";
import WebpubViewer from "~/src/components/WebpubViewer/WebpubViewer";

const WebReaderPage: React.FC<any> = () => {
  return (
    <Layout>
      <WebpubViewer />
    </Layout>
  );
};
export default WebReaderPage;
