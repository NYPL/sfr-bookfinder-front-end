import React, { useState } from "react";

import Layout from "~/src/components/Layout/Layout";
import Edition from "~/src/components/EditionDetail/Edition";
import { editionFetcher } from "~/src/lib/api/SearchApi";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";
import { WorkQuery } from "~/src/types/WorkQuery";

export async function getServerSideProps(context: any) {
  //TODO: Default query
  const editionQuery: EditionQuery = {
    editionIdentifier: context.query.editionId,
  };

  const editionResult: EditionResult = await editionFetcher(editionQuery);
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
