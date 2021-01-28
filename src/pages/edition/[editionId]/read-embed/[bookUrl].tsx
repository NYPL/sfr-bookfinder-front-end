import React from "react";
import IFrameReader from "~/src/components/IFrameReader/IFrameReader";
import Layout from "~/src/components/Layout/Layout";

const WebReaderPage: React.FC<any> = () => {
  return (
    <Layout>
      <IFrameReader />
    </Layout>
  );
};
export default WebReaderPage;