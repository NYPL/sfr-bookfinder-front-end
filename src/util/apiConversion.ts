/** Converts API responses to internal types */

import { initialSearchQuery } from "../stores/InitialState";
import {
  ApiFilter,
  ApiSearchQuery,
  DateRange,
  Filter,
  SearchQuery,
  Sort,
} from "../types/SearchQuery";

export const toSearchQuery = (apiQuery: ApiSearchQuery): SearchQuery => {
  return {
    queries: apiQuery.queries,
    filters: toFilters(apiQuery.filters),
    filterYears: toFilterYears(apiQuery.filters),
    page: apiQuery.page,
    perPage: apiQuery.per_page,
    sort: toSorts(apiQuery.sort),
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
  const filters = toApiFilters(searchQuery.filters, searchQuery.filterYears);

  const sorts = toApiSorts(searchQuery.sort);

  return {
    queries: searchQuery.queries,
    ...(filters.length && {
      filters: filters,
    }),
    ...(searchQuery.page !== initialSearchQuery.page && {
      page: searchQuery.page,
    }),
    ...(searchQuery.perPage !== initialSearchQuery.perPage && {
      per_page: searchQuery.perPage,
    }),
    ...(searchQuery.sort !== initialSearchQuery.sort && {
      sort: sorts,
    }),
  };
};

export const toApiFilters = (
  filters: Filter[],
  yearFilters: DateRange
): ApiFilter[] => {
  const apiFilters: ApiFilter[] = filters.map((filter) => {
    return {
      field: filter.field,
      value: filter.value,
    };
  });

  if (yearFilters && (yearFilters.start || yearFilters.end)) {
    apiFilters.push({
      field: "years",
      value: {
        start: yearFilters.start ? yearFilters.start : "",
        end: yearFilters.end ? yearFilters.end : "",
      },
    });
  }

  return apiFilters;
};

export const toFilters = (apiFilters: ApiFilter[]): Filter[] => {
  return apiFilters.filter((apiFilter) => {
    return apiFilter.field !== "years";
  });
};

export const toApiSorts = (sort: Sort): [] | Sort[] => {
  if (sort.field === "relevance") {
    return [];
  } else {
    return [sort];
  }
};

export const toSorts = (sort: any): Sort => {
  if (sort.length > 0) {
    return {
      field: sort.field,
      dir: sort.dir,
    };
  } else {
    return {
      field: "relevance",
      dir: "DESC",
    };
  }
};

export const toFilterYears = (apiFilters: ApiFilter[]): DateRange => {
  const yearFilters = apiFilters.filter((filter) => {
    return filter.field === "years";
  });
  if (!yearFilters || yearFilters.length < 1) return;
  if (yearFilters.length > 1) {
    throw new Error("There should only be one set of year filters");
  } else {
    const yearFilter = yearFilters[0];
    return {
      start: yearFilter.value.start ? yearFilter.value.start : "",
      end: yearFilter.value.end ? yearFilter.value.end : "",
    };
  }
};
