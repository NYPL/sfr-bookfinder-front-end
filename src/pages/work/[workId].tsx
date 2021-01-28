import React from "react";

import Layout from "~/src/components/Layout/Layout";
import WorkDetail from "~/src/components/Work/Work";
import { workFetcher } from "~/src/lib/api/SearchApi";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { workId } = params;

  if (!workId) {
    return { notFound: true };
  }

  try {
    const workQuery: WorkQuery = {
      identifier: workId,
    };

    const workResult: WorkResult = await workFetcher(workQuery);
    return {
      props: { workResult: workResult },
    };
  } catch (error) {
    return { notFound: true };
  }
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <WorkDetail workResult={props.workResult} />
    </Layout>
  );
};

export default WorkResults;
