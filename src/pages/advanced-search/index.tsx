import React from "react";
import AdvancedSearch from "~/src/components/AdvancedSearch/AdvancedSearch";
import Layout from "~/src/components/Application/Layout";
import { languagesFetcher } from "../../lib/api/SearchApi";
import { ApiLanguageResponse } from "../../types/LanguagesQuery";
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
      languages: languageResponse.data.languages,
    },
  };
}

const AdvancedSearchPage: React.FC<any> = (props) => {
  return (
    <Layout>
      <AdvancedSearch
        searchQuery={props.searchQuery}
        languages={props.languages}
      />
    </Layout>
  );
};
export default AdvancedSearchPage;
