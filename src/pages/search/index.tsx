import React from "react";

import Layout from "~/src/components/Layout/Layout";
import Search from "../../components/Search/Search";
import { parseLocationQuery } from "../../util/SearchUtils";
import { ApiSearchQuery } from "../../types/SearchQuery";
import { searchResultsFetcher } from "../../lib/api/SearchApi";
import { toSearchQuery } from "~/src/util/apiConversion";

export async function getServerSideProps(context: any) {
  // Get Query from location
  const searchQuery: ApiSearchQuery = context.query;

  console.log("searchQuery", searchQuery);
  const searchResults = await searchResultsFetcher(searchQuery);
  console.log("searchResults", searchResults);
  const convertedQuery = toSearchQuery(searchQuery);

  console.log("convertedQuery", convertedQuery);
  return {
    props: {
      searchQuery: convertedQuery,
      searchResults: searchResults,
    },
  };
}

const SearchResults: React.FC<any> = (props) => {
  return (
    <Layout>
      <Search
        searchQuery={props.searchQuery}
        searchResults={props.searchResults}
      />
    </Layout>
  );
};

export default SearchResults;
