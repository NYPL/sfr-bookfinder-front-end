import React from "react";

import Layout from "~/src/components/Layout/Layout";
import WorkDetail from "~/src/components/Work/Work";
import { workFetcher } from "~/src/lib/api/SearchApi";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";

export async function getServerSideProps(context: any) {
  // Get Query from location
  const contextQuery: WorkQuery = context.query;

  //TODO: Default query
  const workQuery: WorkQuery = {
    identifier: context.query.workId,
    recordType: contextQuery.recordType ? contextQuery.recordType : "editions",
    showAll: contextQuery.showAll ? contextQuery.showAll : "false",
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
