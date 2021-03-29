import { ApiSearchQuery, Query, Sort, ApiFilter } from "../types/SearchQuery";

const initialApiQuery: ApiSearchQuery = {
  queries: [],
  recordType: "editions",
  filters: [],
  sort: [
    {
      field: "title",
      dir: "asc",
    },
  ],
  per_page: 10,
  page: 1,
  total: 1000,
};

//Takes the query string from URL and parses it into a SearchQuery object
export function parseLocationQuery(queryString: any): ApiSearchQuery {
  const query = queryString;

  const parseIfString = (value: any) => {
    if (typeof value === "string") {
      return JSON.parse(value);
    } else {
      return value;
    }
  };

  //   const query: SearchQuery = JSON.parse(queryString);
  if (!query.queries && !query.showQueries) {
    //TODO: redirect
    return null;
  } else {
    const {
      filters,
      page,
      perPage,
      queries,
      sort,
    }: {
      filters: ApiFilter[] | string;
      page: number | string;
      perPage: number | string;
      queries: Query[] | string;
      showQueries: Query[] | string;
      sort: Sort[] | string;
    } = query;

    return {
      queries: parseIfString(queries),
      filters: filters ? parseIfString(filters) : initialApiQuery.filters,
      page: page ? parseIfString(page) : initialApiQuery.page,
      per_page: perPage ? parseIfString(perPage) : initialApiQuery.per_page,
      //TODO: Filter out viaf
      sort: sort ? parseIfString(sort) : initialApiQuery.sort,
    };
  }
}

/**
 * Converts an API search query object to a NextJS query object
 * NextJS Router accepts query objects of type { [key: string]: string }
 *
 * @param searchQuery
 */
export const toLocationQuery = (searchQuery: ApiSearchQuery) => {
  return Object.assign(
    {},
    ...Object.keys(searchQuery).map((key) => ({
      [key]: JSON.stringify(searchQuery[key]),
    }))
  );
};
