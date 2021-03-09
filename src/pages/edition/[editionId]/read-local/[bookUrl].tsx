import React from "react";
import Layout from "~/src/components/Layout/Layout";
import ReaderLayout from "~/src/components/ReaderLayout/ReaderLayout";
import WebpubViewer from "~/src/components/WebpubViewer/WebpubViewer";

const WebReaderPage: React.FC<any> = () => {
  return (
    <Layout>
      <ReaderLayout>
        <WebpubViewer />
      </ReaderLayout>
    </Layout>
  );
};
export default WebReaderPage;
