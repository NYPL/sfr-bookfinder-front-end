import React from "react";
import Layout from "~/src/components/Layout/Layout";
import ReaderLayout from "~/src/components/ReaderLayout/ReaderLayout";
import { readFetcher } from "~/src/lib/api/SearchApi";
import { LinkResult } from "~/src/types/LinkQuery";
export async function getServerSideProps(context: any) {
  const linkResult: LinkResult = await readFetcher(context.query.linkId);
  return {
    props: { linkResult: linkResult },
  };
}

const WebReaderPage: React.FC<any> = (props) => {
  return (
    <Layout>
      <ReaderLayout linkResult={props.linkResult} />
    </Layout>
  );
};
export default WebReaderPage;
