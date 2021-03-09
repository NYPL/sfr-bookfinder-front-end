import React from "react";
import IFrameReader from "~/src/components/IFrameReader/IFrameReader";
import Layout from "~/src/components/Layout/Layout";
import ReaderLayout from "~/src/components/ReaderLayout/ReaderLayout";

const WebReaderPage: React.FC<any> = () => {
  return (
    <Layout>
      <ReaderLayout>
        <IFrameReader />
      </ReaderLayout>
    </Layout>
  );
};
export default WebReaderPage;
