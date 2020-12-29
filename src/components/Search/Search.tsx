import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import * as DS from "@nypl/design-system-react-components";
import { useRouter } from "next/router";
import { searchFields } from "~/src/constants/fields";
import { ApiSearchResult } from "~/src/types/SearchResults";
import { deepEqual, isEmpty, getNumberOfPages } from "~/src/util/Util";
import { ApiSearchQuery, SearchQuery } from "~/src/types/SearchQuery";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SearchHeader from "../SearchForm/SearchHeader";
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
import Filters from "../SearchResults/Filters";
import appConfig from "~/config/appConfig";
import { parseLocationQuery, queryToString } from "~/src/util/SearchUtils";
import ResultsList from "../SearchResults/ResultsList";
import { searchResultsFetcher } from "~/src/hooks/useSearch";
import { breakpoints } from "~/src/constants/breakpoints";
import SearchPagination from "~/src/components/SearchResults/SearchPagination";

const SearchResults: React.FC<any> = (props) => {
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);
  const [searchResults, setSearchResults] = useState(props.searchResults);
  //TODO: use initial search query;
  // const { searchResults, isLoading } = useSearch(
  //   searchQuery,
  //   props.searchResults
  // );
  const [isMobile, setMobile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    function handleResize() {
      console.log("handle resize called", isMobile);
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

  const submit = async (query: SearchQuery) => {
    console.log("submit called", query);
    const searchResults = await searchResultsFetcher(query);
    setSearchResults(searchResults);
    const path = `/search?${queryToString(query)}`;
    setSearchQuery(query);
    router.push(path);
  };

  const getDisplayItemsHeading = (searchQuery: SearchQuery) => {
    const showQueries =
      searchQuery && searchQuery.showQueries
        ? searchQuery.showQueries
        : searchQuery.queries;
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

  const numberOfWorks = searchResults.data.totalWorks;
  const works = searchResults.data.works;

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

  const itemCount = (
    <DS.Heading level={2} id="page-title-heading" blockName="page-title">
      {numberOfWorks > 0
        ? `Viewing ${firstElement.toLocaleString()} - ${lastElement.toLocaleString()} of ${numberOfWorks.toLocaleString()} items`
        : "Viewing 0 items"}
    </DS.Heading>
  );
  const mobileItemCount = (
    <DS.Heading level={2} id="page-title-heading" blockName="page-title">
      <>
        {numberOfWorks > 0
          ? `${numberOfWorks.toLocaleString()} items`
          : "0 items"}
      </>
    </DS.Heading>
  );

  const onChangePerPage = (e: any) => {
    console.log("changed per page", searchQuery);
    const newPage = 0;
    const newPerPage = e.target.value;
    if (newPerPage !== searchQuery.perPage) {
      const newQuery: SearchQuery = Object.assign({}, searchQuery, {
        page: newPage,
        perPage: newPerPage,
        total: numberOfWorks || 0,
      });
      submit(newQuery);
    }
  };

  // click and navigate with different sort
  const onChangeSort = (e: any) => {
    if (
      e.target.value !==
      Object.keys(sortMap).find((key) => sortMap[key] === searchQuery.sort)
    ) {
      const newQuery: SearchQuery = Object.assign({}, searchQuery, {
        sort: sortMap[e.target.value],
        page: 0,
      });
      submit(newQuery);
    }
  };

  console.log("query state change", searchQuery);

  return (
    <div className="layout-container">
      <main id="mainContent" className="main main--with-sidebar">
        <div className="content-header">
          <Breadcrumbs />

          <div aria-label="Digital Research Books Beta">
            {searchQuery && (
              <>
                <SearchHeader initialQuery={searchQuery} />
                {/* TODO Feature Flag {
                  // eslint-disable-next-line no-underscore-dangle
                  FeatureFlags.store._isFeatureActive(
                    config.booksCount.experimentName
                  ) && <TotalWorks />
                } */}
              </>
            )}
          </div>
        </div>

        <div className="content-top">
          <div className="search-heading">
            <DS.Heading
              level={1}
              id="page-title-heading"
              blockName="page-title"
              text={`Search results for ${getDisplayItemsHeading(searchQuery)}`}
            />
          </div>

          <div className="search-navigation">
            {isMobile ? mobileItemCount : itemCount}
            {isMobile && (
              <div className="filter-refine">
                {filterCount !== 0 && (
                  <span className="filter-count">
                    {filterCount} {filterCount === 1 ? "filter" : "filters"}
                  </span>
                )}

                <DS.Button
                  id="filter-button"
                  buttonType={DS.ButtonTypes.Link}
                  callback={() => setModalOpen(true)}
                >
                  Refine
                </DS.Button>
              </div>
            )}
            {!isMobile && (
              <div className="search-dropdowns">
                <DS.Dropdown
                  dropdownId="items-per-page-select"
                  isRequired={false}
                  labelPosition="left"
                  labelText="Items Per Page"
                  labelId="nav-items-per-page"
                  selectedOption={
                    searchQuery.perPage ? searchQuery.perPage : undefined
                  }
                  dropdownOptions={numbersPerPage.map((number: any) =>
                    number.toString()
                  )}
                  onSelectChange={(e) => onChangePerPage(e)}
                  onSelectBlur={(e) => onChangePerPage(e)}
                />

                <DS.Dropdown
                  dropdownId="sort-by-select"
                  isRequired={false}
                  labelPosition="left"
                  labelText="Sort By"
                  labelId="nav-sort-by"
                  selectedOption={
                    searchQuery.sort
                      ? Object.keys(sortMap).find((key) =>
                          deepEqual(sortMap[key], searchQuery.sort)
                        )
                      : undefined
                  }
                  dropdownOptions={Object.keys(sortMap).map(
                    (sortOption) => sortOption
                  )}
                  onSelectChange={(e) => onChangeSort(e)}
                  onSelectBlur={(e) => onChangeSort(e)}
                />
              </div>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="content-secondary content-secondary--with-sidebar-left">
            <Filters
              data={searchResults}
              searchQuery={searchQuery}
              router={router}
              onChangeSort={() => onChangeSort}
              onChangePerPage={() => onChangePerPage}
            />
          </div>
        )}

        <div className="content-primary content-primary--with-sidebar-left">
          <ResultsList results={works} />
          <SearchPagination
            totalItems={numberOfWorks}
            searchQuery={searchQuery}
            router={router}
          />
        </div>
        {/* {isMobile && isModalOpen && (
          <DS.Modal>
            <Filters
              toggleMenu={this.closeModal}
              isMobile={isMobile}
              data={searchResults}
              onChangeSort={onChangeSort}
              onChangePerPage={onChangePerPage}
              searchQuery={searchQuery}
              router={router}
            />
          </DS.Modal>
        )} */}
      </main>
    </div>
  );
};

export default SearchResults;
