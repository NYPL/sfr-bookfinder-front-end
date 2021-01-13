import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import { useRouter } from "next/router";
import { searchFields } from "~/src/constants/fields";
import { ApiSearchResult, ApiWork, FacetItem } from "~/src/types/DataModel";
import { deepEqual, getNumberOfPages } from "~/src/util/Util";
import { DateRange, Filter, SearchQuery } from "~/src/types/SearchQuery";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
import ResultsList from "../SearchResults/ResultsList";
import { searchResultsFetcher } from "~/src/lib/api/SearchApi";
import { breakpoints } from "~/src/constants/breakpoints";
import SearchPagination from "~/src/components/SearchResults/SearchPagination";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import { toLocationQuery } from "~/src/util/SearchUtils";
import { toApiQuery } from "~/src/util/apiConversion";
import Filters from "../ResultsFilters/ResultsFilters";
import ResultsSorts from "../ResultsSorts/ResultsSorts";

const SearchResults: React.FC<{
  searchQuery: SearchQuery;
  searchResults: ApiSearchResult;
}> = (props) => {
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);
  const [searchResults, setSearchResults] = useState(props.searchResults);

  const [isMobile, setMobile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // Because the forms submit on input change, we must call submit via a ref
  const filterForm: MutableRefObject<HTMLFormElement> = useRef<HTMLFormElement>(
    null
  );
  const sortForm: MutableRefObject<HTMLFormElement> = useRef<HTMLFormElement>(
    null
  );

  const router = useRouter();

  // When the window resizes, set mobile.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < breakpoints.large) {
        setMobile(true);
      } else {
        setMobile(false);
        setModalOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Whenever query changes, it is pushed to the URL.  Update the search results when this happens
  useEffect(() => {
    setSearchQuery({ ...searchQuery, queries: props.searchQuery.queries });
  }, [props.searchQuery.queries]);

  // The filter form should submit whenever filters change.
  useEffect(() => {
    console.log("submitting filter form");
    submitForm(filterForm.current);
  }, [searchQuery.filterYears, searchQuery.filters, searchQuery.showAll]);

  // The Sorts form should submit whenever the sorts or perpage changes.
  useEffect(() => {
    submitForm(sortForm.current);
  }, [searchQuery.perPage, searchQuery.sort]);

  // Because everything, from filters to pagination, is done on the server side
  // All changes require a new search submit.
  const handleSubmit = async (e) => {
    e.preventDefault();

    sendSearchQuery(searchQuery);
  };

  const sendSearchQuery = async (searchQuery: SearchQuery) => {
    router.push({
      pathname: "/search",
      query: toLocationQuery(toApiQuery(searchQuery)),
    });
    const searchResults = await searchResultsFetcher(toApiQuery(searchQuery));
    setSearchResults(searchResults);
  };

  const getDisplayItemsHeading = (searchQuery: SearchQuery) => {
    const showQueries = searchQuery.queries;
    const queriesToShow =
      showQueries &&
      showQueries.filter((query: any) => searchFields.includes(query.field));
    const queries =
      queriesToShow &&
      queriesToShow.map((query: any, index: any) => {
        const joiner = index < queriesToShow.length - 1 ? " and " : "";
        return `${query.field}: ${query.query}${joiner}`;
      });
    return queries && queries.join("");
  };

  const getAvailableLanguages = (
    searchResults: ApiSearchResult
  ): FacetItem[] => {
    //TODO Error handling
    const facets: FacetItem[] =
      searchResults &&
      searchResults.data.facets &&
      searchResults.data.facets["language"];

    return facets;
  };

  const numberOfWorks = searchResults.data.totalWorks;
  const works: ApiWork[] = searchResults.data.works;

  let filterCount = 0;
  if (searchQuery.filters) {
    filterCount = searchQuery.filters.length;

    // "Show All" doesn't appear in Filters array, but counts as a filter when checked, and doesn't count when unchecked;
    if (
      searchQuery.filters.find((filter: any) => filter.field === "show_all")
    ) {
      filterCount -= 1;
    } else {
      filterCount += 1;
    }
  }

  const totalPages = getNumberOfPages(numberOfWorks, searchQuery.perPage);
  const firstElement =
    Number(searchQuery.perPage || 10) * Number(searchQuery.page || 0) + 1;
  let lastElement =
    Number(searchQuery.perPage || 10) * (Number(searchQuery.page || 0) + 1) ||
    10;
  if (searchQuery.page >= totalPages - 1 && lastElement > numberOfWorks) {
    lastElement = numberOfWorks;
  }

  //TODO: requestSubmit doesn't work in Safari
  const submitForm = (form: HTMLFormElement) => {
    if (form.requestSubmit) {
      form.requestSubmit();
    } else {
      form.submit();
    }
  };

  const changeFilters = (newFilters?: Filter[], newDateRange?: DateRange) => {
    const newSearchQuery: SearchQuery = {
      ...searchQuery,
      ...(newFilters && { filters: newFilters }),
      ...(newDateRange && { filterYears: newDateRange }),
    };
    setSearchQuery(newSearchQuery);
  };

  const changeShowAll = (showAll: boolean) => {
    const newSearchQuery: SearchQuery = {
      ...searchQuery,
      showAll: showAll,
    };
    setSearchQuery(newSearchQuery);
  };

  const onChangePerPage = (e) => {
    e.preventDefault();
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.perPage) {
      const newQuery: SearchQuery = Object.assign({}, searchQuery, {
        page: newPage,
        perPage: newPerPage,
        total: numberOfWorks || 0,
      });
      setSearchQuery(newQuery);
    }
  };

  const onChangeSort = (e) => {
    e.preventDefault();

    if (
      e.target.value !==
      Object.keys(sortMap).find((key) => sortMap[key] === searchQuery.sort)
    ) {
      const newQuery: SearchQuery = Object.assign({}, searchQuery, {
        sort: sortMap[e.target.value],
        page: 0,
      });
      setSearchQuery(newQuery);
    }
  };

  const onPageChange = (select: number) => {
    console.log("select", select);
    const newQuery: SearchQuery = Object.assign({}, searchQuery, {
      page: select,
    });
    setSearchQuery(newQuery);
    sendSearchQuery(newQuery);
  };

  return (
    <main id="mainContent" className="main main--with-sidebar">
      <div className="content-header">
        <Breadcrumbs />
        <div
          className="content-primary"
          aria-label="Digital Research Books Beta"
        >
          <SearchForm searchQuery={searchQuery} />
        </div>
      </div>

      <div className="content-top">
        <div className="search-heading">
          <DS.Heading level={1} id="page-title-heading" blockName="page-title">
            <>Search results for {getDisplayItemsHeading(searchQuery)}</>
          </DS.Heading>
        </div>

        <div className="search-navigation">
          {isMobile ? (
            <DS.Heading
              level={2}
              id="page-title-heading"
              blockName="page-title"
            >
              <>
                {numberOfWorks > 0
                  ? `${numberOfWorks.toLocaleString()} items`
                  : "0 items"}
              </>
            </DS.Heading>
          ) : (
            <DS.Heading
              level={2}
              id="page-title-heading"
              blockName="page-title"
            >
              {numberOfWorks > 0
                ? `Viewing ${firstElement.toLocaleString()} - ${lastElement.toLocaleString()} of ${numberOfWorks.toLocaleString()} items`
                : "Viewing 0 items"}
            </DS.Heading>
          )}
          {!isMobile && (
            <form
              name="sortForm"
              ref={sortForm}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <ResultsSorts
                perPage={searchQuery.perPage}
                sort={searchQuery.sort}
                onChangePerPage={(e) => onChangePerPage(e)}
                onChangeSort={(e) => onChangeSort(e)}
              />
            </form>
          )}
          {isMobile && (
            <div className="filter-refine">
              {filterCount !== 0 && (
                <span className="filter-count">
                  {filterCount} {filterCount === 1 ? "filter" : "filters"}
                </span>
              )}
              ,
              <DS.Button
                id="filter-button"
                buttonType={DS.ButtonTypes.Link}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Refine
              </DS.Button>
            </div>
          )}
        </div>
      </div>

      {!isMobile && (
        <form
          ref={filterForm}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <DS.Heading level={2} id="filter-desktop-header">
            Refine Results
          </DS.Heading>
          <Filters
            filters={searchQuery.filters}
            filterYears={searchQuery.filterYears}
            showAll={searchQuery.showAll}
            languages={getAvailableLanguages(searchResults)}
            changeFilters={(filters?: Filter[], filterYears?: DateRange) => {
              changeFilters(filters, filterYears);
            }}
            changeShowAll={(showAll: boolean) => {
              changeShowAll(showAll);
            }}
          />
        </form>
      )}

      <div className="content-primary content-primary--with-sidebar-left">
        <ResultsList works={works} />
        <DS.Pagination
          pageCount={getNumberOfPages(numberOfWorks, searchQuery.perPage)}
          currentPage={searchQuery.page}
          onPageChange={(e) => onPageChange(e)}
        />
      </div>
      {isMobile && isModalOpen && (
        <DS.Modal>
          <div className="search-navigation">
            <ResultsSorts
              perPage={searchQuery.perPage}
              sort={searchQuery.sort}
              onChangePerPage={(e) => onChangePerPage(e)}
              onChangeSort={(e) => onChangeSort(e)}
            />
          </div>
          <form
            name="filterForm"
            ref={filterForm}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="search-dropdowns__mobile">
              <DS.Label htmlFor="items-per-page" id="per-page-label">
                Items Per Page
              </DS.Label>
              <DS.Select
                id="items-per-page"
                name="ItemsPerPageSelect"
                isRequired={false}
                ariaLabel="Items Per Page Select"
                labelId="per-page-label"
                selectedOption={searchQuery.perPage.toString()}
                onChange={(e) => onChangePerPage(e)}
                onBlur={(e) => onChangePerPage(e)}
              >
                {numbersPerPage.map((number: string) => {
                  return <option>{number}</option>;
                })}
              </DS.Select>

              <DS.Label htmlFor="items-sort-by" id="sort-by-label">
                Sort By
              </DS.Label>
              <DS.Select
                id="sort-by"
                name="SortBySelect"
                isRequired={false}
                ariaLabel="Sort By Select"
                labelId="sort-by-label"
                selectedOption={Object.keys(sortMap).find((key) =>
                  deepEqual(sortMap[key], searchQuery.sort)
                )}
                onChange={(e) => onChangeSort(e)}
                onBlur={(e) => onChangeSort(e)}
              >
                {Object.keys(sortMap).map((sortOption: string) => {
                  return <option>{sortOption}</option>;
                })}
              </DS.Select>
            </div>
            <DS.Heading level={2} id="filter-desktop-header">
              Refine Results
            </DS.Heading>
            <Filters
              filters={searchQuery.filters}
              filterYears={searchQuery.filterYears}
              showAll={searchQuery.showAll}
              languages={getAvailableLanguages(searchResults)}
              changeFilters={(filters?: Filter[]) => {
                changeFilters(filters);
              }}
              changeShowAll={(showAll: boolean) => {
                changeShowAll(showAll);
              }}
            />
          </form>
        </DS.Modal>
      )}
    </main>
  );
};

export default SearchResults;
