import React from "react";
import Collection from "~/src/components/Collection/Collection";

import Layout from "~/src/components/Layout/Layout";
import { collectionFetcher } from "~/src/lib/api/CollectionApi";
import { CollectionQuery, CollectionResult } from "~/src/types/CollectionQuery";

export async function getServerSideProps(context: any) {
  const collectionQuery: CollectionQuery = {
    identifier: context.query.collectionId,
    page: context.query.page ?? 1,
    perPage: context.query.perPage ?? 10,
    sort: context.query.sort ?? "relevance",
  };

  const collectionResult: CollectionResult = await collectionFetcher(
    collectionQuery
  );
  return {
    props: {
      collectionResult: collectionResult,
      collectionQuery: collectionQuery,
    },
  };
}

const CollectionResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <Collection
        collectionResult={props.collectionResult}
        collectionQuery={props.collectionQuery}
      />
    </Layout>
  );
};

export default CollectionResults;
