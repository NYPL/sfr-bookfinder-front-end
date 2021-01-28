import React, { useState } from "react";

import Layout from "~/src/components/Layout/Layout";
import Search from "../../components/Search/Search";
import { parseLocationQuery } from "../../util/SearchUtils";
import { ApiSearchQuery } from "../../types/SearchQuery";
import { searchResultsFetcher } from "../../lib/api/SearchApi";
import { toSearchQuery } from "~/src/util/apiConversion";

export async function getServerSideProps(context: any) {
  console.log("push calls rerender");
  // Get Query from location
  const searchQuery: ApiSearchQuery = context.query;
  // const queryString: string = Object.keys(searchQuery)[0];

  const parsedQuery = parseLocationQuery(searchQuery);

  // Fetch first set of search results
  const searchResults = await searchResultsFetcher(parsedQuery);

  return {
    props: {
      searchQuery: toSearchQuery(parsedQuery),
      searchResults: searchResults,
    },
  };
}

const SearchResults: React.FC<any> = (props) => {
  console.log("page searchQuery", props.searchQuery);
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
