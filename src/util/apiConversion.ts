/** Converts API responses to internal types */

import {
  ApiFilter,
  ApiSearchQuery,
  DateRange,
  Filter,
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
  if (!apiQuery.queries || apiQuery.queries.length < 1) {
    throw new Error("Mising param `queries` in search request ");
  }
  const toFilterYears = (apiFilters: ApiFilter[]): DateRange => {
    const yearFilters = apiFilters.filter((filter) => {
      return filter.field === "years";
    });
    if (!yearFilters || yearFilters.length < 1) {
      return {
        start: null,
        end: null,
      };
    }

    const yearFilter = yearFilters[0];
    return {
      start: yearFilter.value.start ? +yearFilter.value.start : undefined,
      end: yearFilter.value.end ? +yearFilter.value.end : undefined,
    };
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

  const toShowAll = (apiFilters: ApiFilter[]): boolean => {
    const showAllFilters = apiFilters.filter((apiFilter) => {
      return apiFilter.field === "show_all";
    });

    return showAllFilters && showAllFilters[0]
      ? showAllFilters[0].value
      : false;
  };

  const toFilters = (apiFilters: ApiFilter[]): Filter[] => {
    return apiFilters.filter((apiFilter) => {
      return apiFilter.field !== "years" && apiFilter.field !== "show_all";
    });
  };

  const showAll = apiQuery.filters && toShowAll(apiQuery.filters);
  const filters = apiQuery.filters && toFilters(apiQuery.filters);
  const filterYears = apiQuery.filters && toFilterYears(apiQuery.filters);
  const sorts = apiQuery.sort && toSorts(apiQuery.sort);

  return {
    queries: apiQuery.queries,
    ...(filters && { filters: filters }),
    ...(filterYears && { filterYears: filterYears }),
    ...(typeof apiQuery.page !== undefined && { page: apiQuery.page }),
    ...(apiQuery.per_page && { perPage: apiQuery.per_page }),
    ...(sorts && { sort: sorts }),
    ...(typeof showAll !== undefined && { showAll: showAll }),
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

  const filters = toApiFilters(
    searchQuery.filters,
    searchQuery.filterYears,
    searchQuery.showAll
  );
  return {
    queries: searchQuery.queries,
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
