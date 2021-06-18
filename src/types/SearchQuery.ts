/* eslint-disable camelcase */

import { FacetItem, Query, Sort } from "./DataModel";
import { ApiWork } from "./WorkQuery";

export type ApiSearchQuery = {
  query: string;
  filter?: string;
  sort?: string;
  size?: number;
  page?: number;
  showAll?: string;
};

export type ApiFilter = {
  field: string;
  value: any;
};

export type Filter = {
  field: string;
  value: string | number;
};

export type SearchQuery = {
  filters?: Filter[];
  page?: number;
  perPage?: number;
  queries: Query[];
  // While the API supports sorting by multiple parameters, the front end only supports one parameter
  sort?: Sort;
  showAll?: boolean;
};

export const SearchQueryDefaults: SearchQuery = {
  filters: [],
  page: 1,
  perPage: 10,
  queries: [],
  sort: { field: "relevance", dir: "DESC" },
  showAll: false,
};

export type ApiSearchResult = {
  status?: number;
  timestamp?: string;
  responseType?: string;
  data?: {
    totalWorks?: number;
    facets: { formats: FacetItem[]; languages: FacetItem[] };
    paging: {
      currentPage: number;
      firstPage: number;
      lastPage: number;
      nextPage: number;
      previousPage: number;
      recordsPerPage: number;
    };
    works: ApiWork[];
  };
};
