import React from "react";
import * as DS from "@nypl/design-system-react-components";
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "~/src/stores/InitialState";
import { getQueryString } from "~/src/util/SearchQuery";
import { getNumberOfPages } from "~/src/util/Util";

const getPageList = (totalPages: any) => {
  const pageList = [];
  for (let i = 1; i <= totalPages; i += 1) {
    const currentPage = `${i.toLocaleString()} of ${totalPages.toLocaleString()}`;
    pageList.push(currentPage);
  }
  return pageList;
};

type OwnSearchPaginationProps = {
  totalItems?: number;
  searchQuery?: searchQueryPropTypes;
  userQuery?: (...args: any[]) => any;
  router?: {
    [key: string]: any;
  };
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'SearchPaginationProps' circularly refe... Remove this comment to see the full error message
type SearchPaginationProps = OwnSearchPaginationProps &
  typeof SearchPagination.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'SearchPagination' implicitly has type 'any' becau... Remove this comment to see the full error message
const SearchPagination = ({
  totalItems,
  searchQuery,
  userQuery,
  router,
}: SearchPaginationProps) => {
  const totalPages = getNumberOfPages(totalItems, searchQuery.per_page);
  const pageList = getPageList(totalPages);
  // redirect to url with query params
  const submit = (query: any) => {
    const path = `/search?${getQueryString(query)}`;
    router.push(path);
  };

  // update page in store and go to any page
  const goToPage = (newPageNumber: any) => {
    const perPage = searchQuery.per_page || initialSearchQuery.per_page;
    if (Number(searchQuery.page) === newPageNumber) {
      return;
    }
    const newQuery = Object.assign({}, searchQuery, {
      page: newPageNumber,
      per_page: perPage,
      total: totalItems || 0,
    });
    userQuery(newQuery);
    submit(newQuery);
  };

  // click and navigate to any page number
  const navigateToPage = (e: any, pageNumber: any) => {
    e.preventDefault();
    e.stopPropagation();
    let page = pageNumber;
    if (!page || page < 0) {
      page = 0;
    }
    if (page >= totalPages) {
      page = totalPages - 1;
    }
    goToPage(page);
  };

  // update page in store when select of pages change
  const onChangePage = (e: any) => {
    const pageIndex = pageList.findIndex(
      (pageValue) => pageValue === e.target.value
    );
    goToPage(pageIndex);
  };

  return (
    <DS.Pagination
      paginationDropdownOptions={pageList}
      previousPageHandler={(e) =>
        navigateToPage(e, Number(searchQuery.page) - 1)
      }
      nextPageHandler={(e) => navigateToPage(e, Number(searchQuery.page) + 1)}
      currentValue={pageList[Number(searchQuery.page)]}
      onSelectChange={onChangePage}
      onSelectBlur={onChangePage}
    />
  );
};

SearchPagination.defaultProps = {
  totalItems: 0,
  searchQuery: initialSearchQuery,
  userQuery: () => {},
  router: {},
};

export default SearchPagination;
