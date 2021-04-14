import React from "react";

import AdvancedSearch from "~/src/components/AdvancedSearch/AdvancedSearch";
import Layout from "~/src/components/Layout/Layout";
import { toSearchQuery } from "~/src/util/apiConversion";
import { languagesFetcher } from "../../lib/api/SearchApi";
import { ApiLanguageResponse } from "../../types/LanguagesQuery";
import { ApiSearchQuery } from "../../types/SearchQuery";
export async function getServerSideProps(context: any) {
  // Get Query from location
  const searchQuery: ApiSearchQuery = context.query;
  // Fetch all languages
  const languageResponse: ApiLanguageResponse = await languagesFetcher();
  return {
    props: {
      searchQuery: searchQuery.query ? toSearchQuery(searchQuery) : {},
      languages: languageResponse,
    },
  };
}

const AdvancedSearchPage: React.FC<any> = (props) => {
  const { searchQuery, languages } = props;

  return (
    <Layout>
      <AdvancedSearch searchQuery={searchQuery} languages={languages} />
    </Layout>
  );
};
export default AdvancedSearchPage;
