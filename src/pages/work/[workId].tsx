import React from "react";

import Layout from "~/src/components/Layout/Layout";
import WorkDetail from "~/src/components/Work/Work";
import { workFetcher } from "~/src/lib/api/SearchApi";
import { WorkQuery, WorkResult } from "~/src/types/WorkQuery";
import { getBackToSearchUrl } from "~/src/util/LinkUtils";

export async function getServerSideProps(context: any) {
  //TODO: Default query
  const workQuery: WorkQuery = {
    identifier: context.query.workId,
    showAll: context.query.showAll,
  };

  const backUrl = getBackToSearchUrl(
    context.req.headers.referer,
    context.req.headers.host
  );

  const workResult: WorkResult = await workFetcher(workQuery);
  return {
    props: { workResult: workResult, backUrl: backUrl },
  };
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <WorkDetail workResult={props.workResult} backUrl={props.backUrl} />
    </Layout>
  );
};

export default WorkResults;
