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
  filters?: Filter[];
  sort?: Sort[];
  per_page?: number;
  page?: number;
  // TODO: Ask Mike what are these for
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

export type Filter = {
  field: string;
  value: string | DateRange;
};

export type DateRange = {
  value: { start: number; end: number };
};

export interface SearchQuery {
  filters?: Filter[];
  page?: number;
  perPage?: number;
  queries: Query[];
  showQueries?: Query[];
  sort?: Sort[];
}
