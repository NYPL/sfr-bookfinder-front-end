import React from "react";

import Layout from "~/src/components/Layout/Layout";
import Landing from "../components/Landing/Landing";
import { collectionFetcher } from "../lib/api/CollectionApi";
import { CollectionResult } from "../types/CollectionQuery";

export async function getServerSideProps() {
  // Fetch all collections
  const collectionResult: CollectionResult = await collectionFetcher({
    identifier: "list",
    perPage: 8,
  });

  return {
    props: {
      collections: collectionResult,
    },
  };
}

const LandingPage: React.FC<any> = (props) => {
  return (
    <Layout>
      <Landing collections={props.collections} />
    </Layout>
  );
};

export default LandingPage;
