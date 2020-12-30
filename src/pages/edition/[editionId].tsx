import React, { useState } from "react";

import Layout from "~/src/components/Application/Layout";
import EditionDetail from "~/src/components/Edition/Edition";
import { editionFetcher } from "~/src/lib/api/SearchApi";
import { EditionQuery } from "~/src/types/EditionQuery";
import { WorkQuery } from "~/src/types/WorkQuery";

export async function getServerSideProps(context: any) {
  console.log("context query", context.query);

  //TODO: Default query
  const editionQuery: EditionQuery = {
    editionIdentifier: context.query.editionId,
  };

  const editionResults = await editionFetcher(editionQuery);
  return {
    props: { editionResults: editionResults },
  };
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <EditionDetail editionResult={props.editionResults} />
    </Layout>
  );
};

export default WorkResults;
