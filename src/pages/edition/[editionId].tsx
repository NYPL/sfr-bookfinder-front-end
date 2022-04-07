import React from "react";

import Layout from "~/src/components/Layout/Layout";
import Edition from "~/src/components/EditionDetail/Edition";
import { editionFetcher } from "~/src/lib/api/SearchApi";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";
import { getBackToSearchUrl } from "~/src/util/LinkUtils";

export async function getServerSideProps(context: any) {
  const editionQuery: EditionQuery = {
    editionIdentifier: context.query.editionId,
    showAll: context.query.showAll,
  };

  const backUrl = getBackToSearchUrl(
    context.req.headers.referer,
    context.req.headers.host
  );

  const editionResult: EditionResult = await editionFetcher(editionQuery);
  return {
    props: { editionResult: editionResult, backUrl: backUrl },
  };
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <Edition editionResult={props.editionResult} backUrl={props.backUrl} />
    </Layout>
  );
};

export default WorkResults;
