import React, { useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import { useRouter } from "next/router";
import { FacetItem, Query } from "~/src/types/DataModel";
import {
  ApiSearchResult,
  Filter,
  SearchQuery,
  SearchQueryDefaults,
} from "~/src/types/SearchQuery";
import { sortMap } from "~/src/constants/sorts";
import ResultsList from "../ResultsList/ResultsList";
import { toLocationQuery, toApiQuery } from "~/src/util/apiConversion";
import Filters from "../ResultsFilters/ResultsFilters";
import ResultsSorts from "../ResultsSorts/ResultsSorts";
import { breadcrumbTitles } from "~/src/constants/labels";
import SearchHeader from "../SearchHeader/SearchHeader";
import { ApiWork } from "~/src/types/WorkQuery";

const SearchResults: React.FC<{
  searchQuery: SearchQuery;
  searchResults: ApiSearchResult;
}> = (props) => {
  const searchResults = props.searchResults;
  const [searchQuery, setSearchQuery] = useState({
    ...SearchQueryDefaults,
    ...props.searchQuery,
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const sendSearchQuery = async (searchQuery: SearchQuery) => {
    router.push({
      pathname: "/search",
      query: toLocationQuery(toApiQuery(searchQuery)),
    });
  };

  // The Display Items heading (Search Results for ... )
  const getDisplayItemsHeading = (searchQuery: SearchQuery) => {
    // If a display query is set, it is shown instead of the actual query
    if (searchQuery.display) {
      return `${searchQuery.display.field}: ${searchQuery.display.query}`;
    }
    //If not, the actual query is shown.
    const queries = searchQuery.queries.map((query: Query, index: any) => {
      const joiner = index < searchQuery.queries.length - 1 ? " and " : "";
      return `${query.field}: ${query.query}${joiner}`;
    });
    return queries && queries.join("");
  };

  const getAvailableLanguages = (
    searchResults: ApiSearchResult
  ): FacetItem[] => {
    const facets: FacetItem[] =
      searchResults &&
      searchResults.data.facets &&
      searchResults.data.facets["languages"];

    return facets;
  };

  const getFilterCount = (searchQuery: SearchQuery) => {
    return searchQuery.showAll !== SearchQueryDefaults.showAll
      ? searchQuery.filters.length + 1
      : searchQuery.filters.length;
  };

  const filterCount = getFilterCount(searchQuery);
  const numberOfWorks = searchResults.data.totalWorks;
  const works: ApiWork[] = searchResults.data.works;

  const searchPaging = searchResults.data.paging;
  const firstElement =
    (searchPaging.currentPage - 1) * searchPaging.recordsPerPage + 1;
  const lastElement =
    searchQuery.page <= searchPaging.lastPage
      ? searchPaging.currentPage * searchPaging.recordsPerPage
      : numberOfWorks;

  // When Filters change, it should reset the page number while preserving all other search preferences.
  const changeFilters = (newFilters?: Filter[]) => {
    const newSearchQuery: SearchQuery = {
      ...searchQuery,
      ...{ page: SearchQueryDefaults.page },
      ...(newFilters && { filters: newFilters }),
    };
    setSearchQuery(newSearchQuery);
    sendSearchQuery(newSearchQuery);
  };

  const changeShowAll = (showAll: boolean) => {
    const newSearchQuery: SearchQuery = {
      ...searchQuery,
      showAll: showAll,
    };
    setSearchQuery(newSearchQuery);
    sendSearchQuery(newSearchQuery);
  };

  const onChangePerPage = (e) => {
    e.preventDefault();
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.perPage) {
      const newSearchQuery: SearchQuery = Object.assign({}, searchQuery, {
        page: newPage,
        perPage: newPerPage,
        total: numberOfWorks || 0,
      });
      setSearchQuery(newSearchQuery);
      sendSearchQuery(newSearchQuery);
    }
  };

  const onChangeSort = (e) => {
    e.preventDefault();
    if (
      e.target.value !==
      Object.keys(sortMap).find((key) => sortMap[key] === searchQuery.sort)
    ) {
      const newSearchQuery: SearchQuery = Object.assign({}, searchQuery, {
        sort: sortMap[e.target.value],
        page: SearchQueryDefaults.page,
      });
      setSearchQuery(newSearchQuery);
      sendSearchQuery(newSearchQuery);
    }
  };

  const onPageChange = (select: number) => {
    const newSearchQuery: SearchQuery = Object.assign({}, searchQuery, {
      page: select,
    });
    setSearchQuery(newSearchQuery);
    sendSearchQuery(newSearchQuery);
  };

  return (
    <>
      {" "}
      <div className="content-header">
        <DS.Breadcrumbs
          breadcrumbs={[{ url: "/", text: breadcrumbTitles.home }]}
        />
        <SearchHeader searchQuery={searchQuery}></SearchHeader>
      </div>
      <div className="content-top">
        <div className="search-heading">
          <DS.Heading level={1} id="page-title-heading" blockName="page-title">
            <>Search results for {getDisplayItemsHeading(searchQuery)}</>
          </DS.Heading>
          <hr />
          <div className="search-subheading">
            <DS.Heading level={2} id="page-counter" className="page-counter">
              {numberOfWorks > 0
                ? `Viewing ${firstElement.toLocaleString()} - ${
                    numberOfWorks < lastElement
                      ? numberOfWorks.toLocaleString()
                      : lastElement.toLocaleString()
                  } of ${numberOfWorks.toLocaleString()} items`
                : "Viewing 0 items"}
            </DS.Heading>
            <form
              hidden
              className="sort-form search-widescreen-show"
              name="sortForm"
            >
              <ResultsSorts
                perPage={searchQuery.perPage}
                sort={searchQuery.sort}
                onChangePerPage={(e) => onChangePerPage(e)}
                onChangeSort={(e) => onChangeSort(e)}
              />
            </form>
          </div>
          <hr hidden className="search-widescreen-show" />
        </div>
        <DS.Button
          className="filter-button"
          id="filter-button"
          buttonType={DS.ButtonTypes.Secondary}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {`Filters (${filterCount})`}
        </DS.Button>
      </div>
      <div
        className={
          "content-secondary content-secondary--with-sidebar-left search-widescreen-show"
        }
        hidden
      >
        <form className="search-filter">
          <DS.Heading level={2} id="filter-desktop-header">
            Refine Results
          </DS.Heading>
          <hr />
          <Filters
            filters={searchQuery.filters}
            showAll={searchQuery.showAll}
            languages={getAvailableLanguages(searchResults)}
            changeFilters={(filters: Filter[]) => {
              changeFilters(filters);
            }}
            changeShowAll={(showAll: boolean) => {
              changeShowAll(showAll);
            }}
          />
        </form>
      </div>
      <div className="content-primary content-primary--with-sidebar-left">
        <ResultsList works={works} />
        {isModalOpen && (
          <DS.Modal>
            <DS.Button
              buttonType={DS.ButtonTypes.Link}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <DS.Icon
                decorative={true}
                name={DS.IconNames.arrow}
                iconRotation={DS.IconRotationTypes.rotate90}
              />
              Go Back
            </DS.Button>
            <div className="search-navigation">
              <ResultsSorts
                perPage={searchQuery.perPage}
                sort={searchQuery.sort}
                onChangePerPage={(e) => onChangePerPage(e)}
                onChangeSort={(e) => onChangeSort(e)}
              />
            </div>
            <form name="filterForm">
              <DS.Heading level={2} id="filter-desktop-header">
                Refine Results
              </DS.Heading>
              <Filters
                filters={searchQuery.filters}
                showAll={searchQuery.showAll}
                languages={getAvailableLanguages(searchResults)}
                changeFilters={(filters: Filter[]) => {
                  changeFilters(filters);
                }}
                changeShowAll={(showAll: boolean) => {
                  changeShowAll(showAll);
                }}
              />
            </form>
          </DS.Modal>
        )}
        {searchPaging.lastPage > 1 && (
          <div className="content-bottom">
            <DS.Pagination
              pageCount={searchPaging.lastPage ? searchPaging.lastPage : 1}
              currentPage={searchPaging.currentPage}
              onPageChange={(e) => onPageChange(e)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
