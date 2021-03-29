/** Converts API responses to internal types */

import {
  ApiFilter,
  ApiSearchQuery,
  DateRange,
  Filter,
  Query,
  SearchQuery,
  Sort,
} from "../types/SearchQuery";

/**
 * Takes an object of type `ApiSearchQuery` and returns a `SearchQuery` object.
 * This function does not add defaults if they are not passed.
 *
 * @param apiQuery
 */
export const toSearchQuery = (apiQuery: ApiSearchQuery): SearchQuery => {
  console.log("query", apiQuery);
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
  const toSorts = (sort: any): Sort => {
    if (sort.length > 0) {
      return {
        field: sort[0].field,
        dir: sort[0].dir,
      };
    }
  };

  const toFilters = (apiFilters: string): Filter[] => {
    const separated = apiFilters.split(",");
    const filters: Filter[] = separated.map((sep) => {
      const split = sep.split(":");
      return { field: split[0], value: split[1] };
    });
    return filters;
  };

  const filters = apiQuery.filter && toFilters(apiQuery.filter);
  const sorts = apiQuery.sort && toSorts(apiQuery.sort);

  console.log("queries", toQueries(apiQuery.query));
  return {
    queries: toQueries(apiQuery.query),
    ...(filters && { filters: filters }),
    ...(apiQuery.page && { page: apiQuery.page }),
    ...(apiQuery.size && { perPage: apiQuery.size }),
    ...(sorts && { sort: sorts }),
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
  console.log("searchQuery", searchQuery);
  if (!searchQuery.queries || searchQuery.queries.length < 1) {
    throw new Error("cannot convert searchQuery with no queries");
  }
  const toApiSorts = (sort: Sort): [] | Sort[] => {
    if (sort.field === "relevance") {
      return [];
    } else {
      return [sort];
    }
  };

  const toApiFilters = (
    filters: Filter[],
    yearFilters: DateRange,
    showAll: boolean
  ): ApiFilter[] => {
    const apiFilters: ApiFilter[] = filters
      ? filters.map((filter) => {
          return {
            field: filter.field,
            value: filter.value,
          };
        })
      : [];

    if (yearFilters && (yearFilters.start || yearFilters.end)) {
      apiFilters.push({
        field: "years",
        value: {
          start: yearFilters.start ? yearFilters.start : "",
          end: yearFilters.end ? yearFilters.end : "",
        },
      });
    }

    if (showAll !== undefined) {
      apiFilters.push({
        field: "show_all",
        value: showAll,
      });
    }
    return apiFilters;
  };

  const filters = toApiFilters(searchQuery.filters);
  return {
    query: searchQuery.queries,
    ...(filters &&
      filters.length > 0 && {
        filters: filters,
      }),
    ...(searchQuery.page && {
      page: searchQuery.page,
    }),
    ...(searchQuery.perPage && {
      per_page: searchQuery.perPage,
    }),
    ...(searchQuery.sort && {
      sort: searchQuery.sort && toApiSorts(searchQuery.sort),
    }),
  };
};
