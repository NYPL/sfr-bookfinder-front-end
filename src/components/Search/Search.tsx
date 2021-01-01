import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import * as DS from "@nypl/design-system-react-components";
import { useRouter } from "next/router";
import { searchFields } from "~/src/constants/fields";
import { ApiSearchResult, ApiWork } from "~/src/types/DataModel";
import { deepEqual, isEmpty, getNumberOfPages } from "~/src/util/Util";
import {
  ApiSearchQuery,
  Filter,
  SearchQuery,
  Sort,
} from "~/src/types/SearchQuery";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SearchHeader from "../SearchForm/SearchHeader";
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
import Filters from "~/src/components/Filters/Filters";
import appConfig from "~/config/appConfig";
import { parseLocationQuery, queryToString } from "~/src/util/SearchUtils";
import ResultsList from "../SearchResults/ResultsList";
import { searchResultsFetcher } from "~/src/lib/api/SearchApi";
import { breakpoints } from "~/src/constants/breakpoints";
import SearchPagination from "~/src/components/SearchResults/SearchPagination";
import Select from "~/src/components/Select/Select";
import SearchForm from "~/src/components/SearchForm/SearchForm";

const SearchResults: React.FC<{
  searchQuery: SearchQuery;
  searchResults: ApiSearchResult;
}> = (props) => {
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);
  const [searchResults, setSearchResults] = useState(props.searchResults);

  const [isMobile, setMobile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

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

  // Because everything, from filters to pagination, is done on the server side
  // All changes require a new search submit.
  const submit = async (query: SearchQuery) => {
    const searchResults = await searchResultsFetcher(query);
    console.log("search results got");
    setSearchResults(searchResults);
    const path = `/search?${queryToString(query)}`;
    setSearchQuery(query);
    router.push(path);
  };

  const updateFilters = (newFilters: Filter[]) => {
    console.log("filters updating", searchQuery.filters, newFilters);
    if (!deepEqual(searchQuery.filters, newFilters)) {
      const newQuery: SearchQuery = Object.assign({}, searchQuery, {
        filters: newFilters,
      });
      console.log("newQuery", newQuery);
      submit(newQuery);
    }
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

  return (
    <div className="layout-container">
      <main id="mainContent" className="main main--with-sidebar">
        <div className="content-header">
          <Breadcrumbs />

          <div aria-label="Digital Research Books Beta">
            <SearchForm searchQuery={searchQuery} />
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
                  // callback={() => setModalOpen(true)}
                >
                  Refine
                </DS.Button>
              </div>
            )}
            {!isMobile && (
              <div className="search-dropdowns">
                <DS.Label htmlFor="items-per-page" id="per-page-label">
                  Items Per Page
                </DS.Label>
                <Select
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
                </Select>

                <DS.Label htmlFor="items-sort-by" id="sort-by-label">
                  Sort By
                </DS.Label>
                <Select
                  id="sort-by"
                  name="SortBySelect"
                  isRequired={false}
                  ariaLabel="Sort By Select"
                  labelId="sort-by-label"
                  selectedOption={
                    searchQuery.sort
                      ? Object.keys(sortMap).find((key) =>
                          deepEqual(sortMap[key], searchQuery.sort)
                        )
                      : undefined
                  }
                  onChange={(e) => onChangeSort(e)}
                  onBlur={(e) => onChangeSort(e)}
                >
                  {Object.keys(sortMap).map((sortOption: string) => {
                    return <option>{sortOption}</option>;
                  })}
                </Select>
              </div>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="content-secondary content-secondary--with-sidebar-left">
            <DS.Heading level={2} id="filter-desktop-header">
              Refine Results
            </DS.Heading>
            <Filters
              data={searchResults}
              filters={searchQuery.filters}
              isMobile={isMobile}
              onFiltersChange={(filters) => updateFilters(filters)}
            />
          </div>
        )}

        <div className="content-primary content-primary--with-sidebar-left">
          <ResultsList works={works} />
          <SearchPagination
            totalItems={numberOfWorks}
            searchQuery={searchQuery}
            router={router}
          />
        </div>
        {/* {isMobile && isModalOpen && (
          <DS.Modal>
      <div className="search-navigation">
        <DS.Button
          id="gobackButton"
          type="button"
          buttonType={DS.ButtonTypes.Link}
          iconPosition={DS.ButtonIconPositions.Left}
          iconRotation={DS.IconRotationTypes.rotate90}
          iconName="arrow_xsmall"
          iconModifiers={["left"]}
          iconDecorative
          callback={(event) => this.onSubmit(event, toggleMenu, true)}
        >
          <span>Go Back</span>
        </DS.Button>

        <DS.Button
          id="closeButton"
          type="submit"
          callback={(event) => this.onSubmit(event, toggleMenu, true)}
        >
          Show Results
        </DS.Button>
      </div>
              <div className="search-dropdowns__mobile">
              <DS.Dropdown
                dropdownId="items-per-page-select"
                isRequired={false}
                labelPosition="left"
                labelText="Items Per Page"
                labelId="nav-items-per-page"
                selectedOption={
                  searchQuery.per_page ? searchQuery.per_page : undefined
                }
                dropdownOptions={numbersPerPage.map((number: any) =>
                  number.toString()
                )}
                onSelectChange={onChangePerPage}
                onSelectBlur={onChangePerPage}
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
                onSelectChange={onChangeSort}
                onSelectBlur={onChangeSort}
              />
            </div>
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
