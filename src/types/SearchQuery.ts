/* eslint-disable camelcase */

export type searchFields =
  | "keyword"
  | "author"
  | "title"
  | "subject"
  | "viaf"
  | "lcnaf";

export type ApiSearchQuery = {
  query: string;
  filter?: string;
  sort?: string;
  size?: number;
  page?: number;
  showAll?: boolean;
};

//Refer to sorts.ts
export type Sort = { field: string; dir: string };

export interface Query {
  query: string;
  field: string;
}

export type ApiFilter = {
  field: string;
  value: any;
};

export type Filter = {
  field: string;
  value: string | number;
};

export type DateRange = {
  start: number | "";
  end: number | "";
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
