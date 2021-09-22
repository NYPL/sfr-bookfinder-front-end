import React from "react";
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
  console.log("props", props);
  return <ReaderLayout linkResult={props.linkResult} />;
};
export default WebReaderPage;
