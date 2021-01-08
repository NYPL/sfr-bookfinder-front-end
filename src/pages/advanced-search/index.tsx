import React from "react";
import { useRouter } from "next/router";

import AdvancedSearch from "~/src/components/AdvancedSearch/AdvancedSearch";
import Layout from "~/src/components/Application/Layout";
import { languagesFetcher } from "../../lib/api/SearchApi";
import {
  ApiLanguageResponse,
  languagesToFacets,
} from "../../types/LanguagesQuery";
import { ApiSearchQuery } from "../../types/SearchQuery";
import { parseLocationQuery } from "../../util/SearchUtils";
export async function getServerSideProps(context: any) {
  // Get Query from location
  const searchQuery: ApiSearchQuery = context.query;
  // const queryString: string = Object.keys(searchQuery)[0];

  const parsedQuery = parseLocationQuery(searchQuery);

  // Fetch all languages
  const languageResponse: ApiLanguageResponse = await languagesFetcher();
  return {
    props: {
      searchQuery: parsedQuery,
      languages: languageResponse,
    },
  };
}

const AdvancedSearchPage: React.FC<any> = (props) => {
  const { searchQuery, languages } = props;

  return (
    <Layout>
      <AdvancedSearch
        searchQuery={searchQuery}
        languages={languagesToFacets(languages)}
      />
    </Layout>
  );
};
export default AdvancedSearchPage;
