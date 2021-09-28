import React from "react";
import ReaderLayout from "~/src/components/ReaderLayout/ReaderLayout";
import { readFetcher, proxyUrlConstructor } from "~/src/lib/api/SearchApi";
import { LinkResult } from "~/src/types/LinkQuery";

export async function getServerSideProps(context: any) {
  try {
    const linkResult: LinkResult = await readFetcher(context.query.linkId);
    const proxyUrl: string = proxyUrlConstructor();
    return {
      props: {
          linkResult: linkResult,
          proxyUrl: proxyUrl,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

const WebReaderPage: React.FC<any> = (props) => {
  return <ReaderLayout linkResult={props.linkResult} proxyUrl={props.proxyUrl} />;
};
export default WebReaderPage;
