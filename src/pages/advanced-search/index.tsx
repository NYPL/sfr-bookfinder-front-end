import React from "react";
import AdvancedSearch from "~/src/components/AdvancedSearch/AdvancedSearch";
import Layout from "~/src/components/Layout/Layout";
import { languagesFetcher } from "../../lib/api/SearchApi";
import { ApiLanguageResponse } from "../../types/LanguagesQuery";
import Error from "../_error";

export async function getServerSideProps() {
  // Fetch all languages
  const languageResponse: ApiLanguageResponse = await languagesFetcher();
  return {
    props: {
      languages: languageResponse,
    },
  };
}

const AdvancedSearchPage: React.FC<any> = (props) => {
  const { languages, status } = props;

  if (status !== 200) {
    return <Error statusCode={status} />;
  }

  return (
    <Layout>
      <AdvancedSearch languages={languages} />
    </Layout>
  );
};
export default AdvancedSearchPage;
