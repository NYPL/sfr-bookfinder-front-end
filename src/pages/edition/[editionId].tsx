import React from "react";
import Layout from "~/src/components/Layout/Layout";
import Edition from "~/src/components/EditionDetail/Edition";
import { editionFetcher } from "~/src/lib/api/SearchApi";
import { EditionQuery, EditionResult } from "~/src/types/EditionQuery";
import { getBackToSearchUrl } from "~/src/util/LinkUtils";
import { documentTitles } from "~/src/constants/labels";
import Head from "next/head";
import { MAX_TITLE_LENGTH } from "~/src/constants/editioncard";
import { truncateStringOnWhitespace } from "~/src/util/Util";

export async function getServerSideProps(context: any) {
  const editionQuery: EditionQuery = {
    editionIdentifier: context.query.editionId,
    showAll: context.query.showAll,
  };

  const backUrl = getBackToSearchUrl(
    context.req.headers.referer,
    context.req.headers.host
  );

  const editionResult: EditionResult = await editionFetcher(editionQuery);
  return {
    props: { editionResult: editionResult, backUrl: backUrl },
  };
}

const WorkResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <Head>
        <title>
          {truncateStringOnWhitespace(
            props.editionResult.data.title,
            MAX_TITLE_LENGTH
          ) +
            " | " +
            documentTitles.editionItem}
        </title>
      </Head>
      <Edition editionResult={props.editionResult} backUrl={props.backUrl} />
    </Layout>
  );
};

export default WorkResults;
