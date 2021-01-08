/** Converts API responses to internal types */

import {
  ApiFilter,
  ApiSearchQuery,
  DateRange,
  Filter,
  SearchQuery,
} from "../types/SearchQuery";

export const toSearchQuery = (apiQuery: ApiSearchQuery): SearchQuery => {
  return {
    queries: apiQuery.queries,
    filters: toFilters(apiQuery.filters),
    filterYears: toFilterYears(apiQuery.filters),
    page: apiQuery.page,
    perPage: apiQuery.per_page,
    sort: apiQuery.sort,
  };
};

export const toApiQuery = (searchQuery: SearchQuery): ApiSearchQuery => {
  return {
    queries: searchQuery.queries,
    filters: toApiFilters(searchQuery.filters, searchQuery.filterYears),
    page: searchQuery.page,
    per_page: searchQuery.perPage,
    sort: searchQuery.sort,
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

  if (yearFilters) {
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
  return apiFilters.map((apiFilter) => {
    if (apiFilter.field !== "years") {
      return {
        field: apiFilter.field,
        value: apiFilter.value,
      };
    }
  });
};

export const toFilterYears = (apiFilters: ApiFilter[]): DateRange => {
  const yearFilters = apiFilters.filter((filter) => {
    return filter.field === "years";
  });
  if (!yearFilters) return;
  if (yearFilters.length > 1) {
    throw new Error("There should only be one set of year filters");
  } else {
    const yearFilter = yearFilters[0];
    return {
      start: yearFilter.value.start,
      end: yearFilter.value.end,
    };
  }
};
