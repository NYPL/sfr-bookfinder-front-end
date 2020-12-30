import React from "react";
import Layout from "~/src/components/Application/Layout";
import WebpubViewer from "~/src/components/WebpubViewer";

const WebReaderPage: React.FC<any> = () => {
  return (
    <Layout>
      <WebpubViewer />
    </Layout>
  );
};
export default WebReaderPage;
