import React, { useState } from "react";

import Layout from "~/src/components/Application/Layout";
import Search from "../../components/Search/Search";
import { parseLocationQuery } from "../../util/SearchUtils";
// import { searchResultsFetcher } from "../hooks/useSearch";
import { ApiSearchQuery } from "../../types/SearchQuery";
import { searchResultsFetcher } from "../../lib/api/SearchApi";

export async function getServerSideProps(context: any) {
  // NextJS passes context.query as an object { querystring : ''}
  // This seems to be a bug and is expected to be fixed on subsequent NextJS updates
  type ContextQuery = { [key: string]: string };

  // Get Query from location
  const searchQuery: ApiSearchQuery = context.query;
  // const queryString: string = Object.keys(searchQuery)[0];

  const parsedQuery = parseLocationQuery(searchQuery);

  // Fetch first set of search results
  const searchResults = await searchResultsFetcher(parsedQuery);
  return {
    props: { searchQuery: parsedQuery, searchResults: searchResults },
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
