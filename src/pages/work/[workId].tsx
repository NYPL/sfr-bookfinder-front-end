import React from "react";

import Layout from "~/src/components/Layout/Layout";
import WorkDetail from "~/src/components/Work/Work";
import { workFetcher } from "~/src/lib/api/SearchApi";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";

export async function getServerSideProps(context: any) {
  //TODO: Default query
  const workQuery: WorkQuery = {
    identifier: context.query.workId,
    showAll: context.query.showAll,
  };

  const workResult: WorkResult = await workFetcher(workQuery);
  return {
    props: { workResult: workResult },
  };
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <WorkDetail workResult={props.workResult} />
    </Layout>
  );
};

export default WorkResults;
