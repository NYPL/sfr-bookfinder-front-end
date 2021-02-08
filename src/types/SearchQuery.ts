/* eslint-disable camelcase */

export type searchFields =
  | "keyword"
  | "author"
  | "title"
  | "subject"
  | "viaf"
  | "lcnaf";

export type ApiSearchQuery = {
  // Field and Query appear in the API but are used in legacy Simple Search.  We no longer use them.
  /* field: string;
   query: string; */
  queries: Query[];
  recordType?: "instances" | "editions";
  filters?: ApiFilter[];
  sort?: [] | Sort[];
  per_page?: number;
  page?: number;
  prev_page_sort?: string[];
  next_page_sort?: string[];
  total?: number;
};

//Refer to sorts.ts
export type Sort = { field: string; dir: string };

export interface Query {
  query: string;
  field: searchFields;
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
  filterYears?: DateRange;
  page?: number;
  perPage?: number;
  queries: Query[];
  // While the API supports sorting by multiple parameters, the front end only supports one parameter
  sort?: Sort;
  showAll?: boolean;
};

export const SearchQueryDefaults: SearchQuery = {
  filters: [],
  filterYears: { start: "", end: "" },
  page: 0,
  perPage: 10,
  queries: [],
  sort: { field: "relevance", dir: "DESC" },
  showAll: false,
};
