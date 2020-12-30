import React, { useState } from "react";

import Layout from "~/src/components/Application/Layout";
import WorkDetail from "~/src/components/Work/Work";
import { workFetcher } from "~/src/lib/api/SearchApi";
import { WorkQuery } from "~/src/types/WorkQuery";

export async function getServerSideProps(context: any) {
  // Get Query from location
  const contextQuery: WorkQuery = context.query;

  //TODO: Default query
  const workQuery: WorkQuery = {
    identifier: context.query.workId,
    recordType: contextQuery.recordType ? contextQuery.recordType : "editions",
    showAll: contextQuery.showAll ? contextQuery.showAll : "false",
  };

  const workResults = await workFetcher(workQuery);
  return {
    props: { workResults: workResults },
  };
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <WorkDetail workResult={props.workResults} />
    </Layout>
  );
};

export default WorkResults;
