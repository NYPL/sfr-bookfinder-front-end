import React from "react";

import Layout from "~/src/components/Layout/Layout";
import Search from "../../components/Search/Search";
import { ApiSearchQuery } from "../../types/SearchQuery";
import { searchResultsFetcher } from "../../lib/api/SearchApi";
import { toSearchQuery } from "~/src/util/apiConversion";

export async function getServerSideProps(context: any) {
  // Get Query from location
  console.log("context query", context.query);
  const searchQuery: ApiSearchQuery = context.query;
  console.log("apiquery", searchQuery);
  const searchResults = await searchResultsFetcher(searchQuery);
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
