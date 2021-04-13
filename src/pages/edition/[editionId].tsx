import React from "react";

import Layout from "~/src/components/Layout/Layout";
import Edition from "~/src/components/EditionDetail/Edition";
import { editionFetcher } from "~/src/lib/api/SearchApi";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";

export async function getServerSideProps(context: any) {
  const editionQuery: EditionQuery = {
    editionIdentifier: context.query.editionId,
    showAll: context.query.showAll,
  };

  const editionResult: EditionResult = await editionFetcher(editionQuery);
  console.log("editionResult", editionResult);
  return {
    props: { editionResult: editionResult },
  };
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <Edition editionResult={props.editionResult} />
    </Layout>
  );
};

export default WorkResults;
