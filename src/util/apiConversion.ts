/** Converts API responses to internal types */

import {
  ApiSearchQuery,
  Filter,
  Query,
  SearchQuery,
  SearchQueryDefaults,
  Sort,
} from "../types/SearchQuery";

/**
 * Takes an object of type `ApiSearchQuery` and returns a `SearchQuery` object.
 * This function does not add defaults if they are not passed.
 *
 * @param apiQuery
 */
export const toSearchQuery = (apiQuery: ApiSearchQuery): SearchQuery => {
  if (!apiQuery.query || apiQuery.query.length < 1) {
    throw new Error("Mising param `queries` in search request ");
  }

  const toQueries = (apiQueries: string): Query[] => {
    const separated = apiQueries.split(",");
    return separated.map((sep) => {
      const split = sep.split(":");
      return { field: split[0], query: split[1] };
    });
  };

  // The front end only sorts by the first Sort.
  const toSorts = (apiSort: string): Sort => {
    const split = apiSort.split(":");
    return { field: split[0], dir: split[1] };
  };

  const toFilters = (apiFilters: string): Filter[] => {
    const separated = apiFilters.split(",");
    const filters: Filter[] = separated.map((sep) => {
      const split = sep.split(":");
      return { field: split[0], value: split[1] };
    });
    return filters;
  };

  return {
    queries: toQueries(apiQuery.query),
    ...(apiQuery.filter && { filters: toFilters(apiQuery.filter) }),
    ...(apiQuery.page && { page: apiQuery.page }),
    ...(apiQuery.size && { perPage: apiQuery.size }),
    ...(apiQuery.sort && { sort: toSorts(apiQuery.sort) }),
    ...((apiQuery.showAll || apiQuery.showAll === false) && {
      showAll: apiQuery.showAll,
    }),
  };
};

/**
 * Converts a searchQuery to send to server.
 * First assigns the `queries` parameter, which must always exist.
 * Then, checks all of the other paramaters to see if they have changed from the default
 * and only sends it if there is no default.
 *
 * @param searchQuery
 */
export const toApiQuery = (searchQuery: SearchQuery): ApiSearchQuery => {
  if (!searchQuery.queries || searchQuery.queries.length < 1) {
    throw new Error("cannot convert searchQuery with no queries");
  }
  const toApiSorts = (sort: Sort): string => {
    return `${sort.field}:${sort.dir}`;
  };

  const toApiFilters = (filters: Filter[]): string[] => {
    return filters
      ? filters.map((filter) => {
          return `${filter.field}:${filter.value}`;
        })
      : [];
  };

  const toApiQueries = (queries: Query[]): string[] => {
    return queries.map((query) => {
      return `${query.field}:${query.query}`;
    });
  };

  return {
    query: toApiQueries(searchQuery.queries).join(","),
    ...(searchQuery.filters &&
      searchQuery.filters.length &&
      searchQuery.filters !== SearchQueryDefaults.filters && {
        filter: toApiFilters(searchQuery.filters).join(","),
      }),
    ...(searchQuery.page &&
      searchQuery.page !== SearchQueryDefaults.page && {
        page: searchQuery.page,
      }),
    ...(searchQuery.perPage &&
      searchQuery.perPage !== SearchQueryDefaults.perPage && {
        size: searchQuery.perPage,
      }),
    ...(searchQuery.sort &&
      searchQuery.sort !== SearchQueryDefaults.sort && {
        sort: toApiSorts(searchQuery.sort),
      }),
    ...(typeof searchQuery.showAll !== undefined &&
      searchQuery.showAll !== SearchQueryDefaults.showAll && {
        showAll: searchQuery.showAll,
      }),
  };
};

/**
 * Converts an API search query object to a NextJS query object
 * NextJS Router accepts query objects of type { [key: string]: string }
 *
 * @param searchQuery
 */
export const toLocationQuery = (searchQuery: ApiSearchQuery): string => {
  return Object.assign(
    {},
    ...Object.keys(searchQuery).map((key) => ({
      [key]: searchQuery[key],
    }))
  );
};
