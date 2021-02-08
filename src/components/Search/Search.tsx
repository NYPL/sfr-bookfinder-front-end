import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import * as DS from "@nypl/design-system-react-components";
import { useRouter } from "next/router";
import { searchFields } from "~/src/constants/fields";
import { ApiSearchResult, ApiWork, FacetItem } from "~/src/types/DataModel";
import { deepEqual, getNumberOfPages } from "~/src/util/Util";
import {
  DateRange,
  Filter,
  SearchQuery,
  SearchQueryDefaults,
} from "~/src/types/SearchQuery";
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
import ResultsList from "../SearchResults/ResultsList";
import { searchResultsFetcher } from "~/src/lib/api/SearchApi";
import { breakpoints } from "~/src/constants/breakpoints";
import SearchForm from "~/src/components/SearchForm/SearchForm";
import { toLocationQuery } from "~/src/util/SearchUtils";
import { toApiQuery } from "~/src/util/apiConversion";
import Filters from "../ResultsFilters/ResultsFilters";
import ResultsSorts from "../ResultsSorts/ResultsSorts";
import { breadcrumbTitles } from "~/src/constants/labels";
import Link from "../Link/Link";
import SearchHeader from "../SearchHeader/SearchHeader";

const SearchResults: React.FC<{
  searchQuery: SearchQuery;
  searchResults: ApiSearchResult;
}> = (props) => {
  console.log("queries", props.searchQuery);

  const [searchQuery, setSearchQuery] = useState({
    ...SearchQueryDefaults,
    ...props.searchQuery,
  });

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
      if (window.innerWidth < breakpoints.medium) {
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

  const getFilterCount = (searchQuery: SearchQuery) => {
    let filterCount = 0;

    if (searchQuery.filterYears) {
      if (searchQuery.filterYears.start) {
        filterCount += 1;
      }

      if (searchQuery.filterYears.end) {
        filterCount += 1;
      }
    }
    if (searchQuery.showAll !== SearchQueryDefaults.showAll) {
      filterCount += 1;
    }
    if (searchQuery.filters) {
      filterCount += searchQuery.filters.length;
    }
    return filterCount;
  };

  const filterCount = getFilterCount(searchQuery);
  const numberOfWorks = searchResults.data.totalWorks;
  const works: ApiWork[] = searchResults.data.works;

  const totalPages = getNumberOfPages(numberOfWorks, searchQuery.perPage);
  const firstElement =
    Number(searchQuery.perPage || 10) * Number(searchQuery.page || 0) + 1;
  let lastElement =
    Number(searchQuery.perPage || 10) * (Number(searchQuery.page || 0) + 1) ||
    10;
  if (searchQuery.page >= totalPages - 1 && lastElement > numberOfWorks) {
    lastElement = numberOfWorks;
  }

  const changeFilters = (newFilters?: Filter[], newDateRange?: DateRange) => {
    const newSearchQuery: SearchQuery = {
      ...searchQuery,
      ...(newFilters && { filters: newFilters }),
      ...(newDateRange && { filterYears: newDateRange }),
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
        page: 0,
      });
      setSearchQuery(newSearchQuery);
      sendSearchQuery(newSearchQuery);
    }
  };

  const onPageChange = (select: number) => {
    console.log("select", select);
    const newSearchQuery: SearchQuery = Object.assign({}, searchQuery, {
      page: select,
    });
    setSearchQuery(newSearchQuery);
    sendSearchQuery(newSearchQuery);
  };

  return (
    <main className="main main--with-sidebar">
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
                ? `Viewing ${firstElement} - ${lastElement} of ${numberOfWorks} items`
                : "Viewing 0 items"}
            </DS.Heading>
            {!isMobile && (
              <form name="sortForm" ref={sortForm}>
                <ResultsSorts
                  perPage={searchQuery.perPage}
                  sort={searchQuery.sort}
                  onChangePerPage={(e) => onChangePerPage(e)}
                  onChangeSort={(e) => onChangeSort(e)}
                />
              </form>
            )}
          </div>
          {!isMobile && <hr />}
        </div>
        {isMobile && (
          <DS.Button
            id="filter-button"
            buttonType={DS.ButtonTypes.Secondary}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {`Filters (${filterCount})`}
          </DS.Button>
        )}
      </div>

      <div className="content-secondary content-secondary--with-sidebar-left">
        {!isMobile && (
          <form ref={filterForm}>
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
      </div>

      <div className="content-primary content-primary--with-sidebar-left">
        <ResultsList works={works} />
        {isMobile && isModalOpen && (
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
            <form name="filterForm" ref={filterForm}>
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

        <div className="content-bottom">
          <DS.Pagination
            pageCount={getNumberOfPages(numberOfWorks, searchQuery.perPage)}
            currentPage={searchQuery.page}
            onPageChange={(e) => onPageChange(e)}
          />
        </div>
      </div>
    </main>
  );
};

export default SearchResults;
