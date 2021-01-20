/** Converts API responses to internal types */

import { initialSearchQuery } from "../constants/InitialState";
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
    showAll: toShowAll(apiQuery.filters),
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
  const filters = toApiFilters(
    searchQuery.filters,
    searchQuery.filterYears,
    searchQuery.showAll
  );

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
  yearFilters: DateRange,
  showAll: boolean
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

  apiFilters.push({
    field: "show_all",
    value: showAll,
  });

  return apiFilters;
};

export const toFilters = (apiFilters: ApiFilter[]): Filter[] => {
  return apiFilters.filter((apiFilter) => {
    return apiFilter.field !== "years" && apiFilter.field !== "show_all";
  });
};

export const toShowAll = (apiFilters: ApiFilter[]): boolean => {
  const showAllFilters = apiFilters.filter((apiFilter) => {
    return apiFilter.field === "show_all";
  });

  //TODO: error handling Check if there is more than one show_all filter

  return showAllFilters && showAllFilters[0] ? showAllFilters[0].value : false;
};

export const toApiSorts = (sort: Sort): [] | Sort[] => {
  if (sort.field === "relevance") {
    return [];
  } else {
    return [sort];
  }
};

// The front end only sorts by the first Sort.
export const toSorts = (sort: any): Sort => {
  if (sort.length > 0) {
    return {
      field: sort[0].field,
      dir: sort[0].dir,
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
  if (!yearFilters || yearFilters.length < 1) {
    return {
      start: null,
      end: null,
    };
  }
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
