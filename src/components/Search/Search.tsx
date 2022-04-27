import React, { useState } from "react";
import {
  Breadcrumbs,
  ButtonTypes,
  Heading,
  IconNames,
  IconRotationTypes,
  Pagination,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentTop,
  TemplateContentPrimary,
  TemplateContentSidebar,
  Button,
  Icon,
  Modal,
  HeadingLevels,
  BreadcrumbsTypes,
  Box,
  HorizontalRule,
  Flex,
} from "@nypl/design-system-react-components";
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
import { defaultBreadcrumbs } from "~/src/constants/labels";
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
      return `${searchQuery.display.field}: "${searchQuery.display.query}"`;
    }
    //If not, the actual query is shown.
    const queries = searchQuery.queries.map((query: Query, index: any) => {
      const joiner = index < searchQuery.queries.length - 1 ? " and " : "";
      return `${query.field}: "${query.query}"${joiner}`;
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

  // const getFilterCount = (searchQuery: SearchQuery) => {
  //   return searchQuery.showAll !== SearchQueryDefaults.showAll
  //     ? searchQuery.filters.length + 1
  //     : searchQuery.filters.length;
  // };

  // const filterCount = getFilterCount(searchQuery);
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
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsType={BreadcrumbsTypes.Research}
          breadcrumbsData={defaultBreadcrumbs}
        />
        <SearchHeader searchQuery={searchQuery}></SearchHeader>
      </TemplateBreakout>
      <TemplateContent sidebar="left">
        <TemplateContentTop>
          <Box className="search-heading">
            <Box role="alert">
              <Heading level={HeadingLevels.One} id="page-title-heading">
                <>Search results for {getDisplayItemsHeading(searchQuery)}</>
              </Heading>
            </Box>
          </Box>
          <HorizontalRule bg="section.research.primary" />
          <Flex justify="space-between" align="center">
            <Heading
              level={HeadingLevels.Two}
              id="page-counter"
              className="page-counter"
              additionalStyles={{ m: "0" }}
            >
              {numberOfWorks > 0
                ? `Viewing ${firstElement.toLocaleString()} - ${
                    numberOfWorks < lastElement
                      ? numberOfWorks.toLocaleString()
                      : lastElement.toLocaleString()
                  } of ${numberOfWorks.toLocaleString()} items`
                : "Viewing 0 items"}
            </Heading>
            <form className="sort-form search-widescreen-show" name="sortForm">
              <ResultsSorts
                perPage={searchQuery.perPage}
                sort={searchQuery.sort}
                onChangePerPage={(e) => onChangePerPage(e)}
                onChangeSort={(e) => onChangeSort(e)}
              />
            </form>
          </Flex>
          {/* <Button
            className="filter-button"
            id="filter-button"
            buttonType={ButtonTypes.Secondary}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {`Filters (${filterCount})`}
          </Button> */}
        </TemplateContentTop>
        <TemplateContentSidebar>
          <form className="search-filter">
            <Heading level={HeadingLevels.Two} id="filter-desktop-header">
              Refine Results
            </Heading>
            <HorizontalRule bg="section.research.primary" />
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
        </TemplateContentSidebar>
        <TemplateContentPrimary>
          <ResultsList works={works} />
          {isModalOpen && (
            <Modal>
              <Button
                buttonType={ButtonTypes.Link}
                onClick={() => {
                  setModalOpen(false);
                }}
                id="modal-button"
              >
                <Icon
                  decorative={true}
                  name={IconNames.Arrow}
                  iconRotation={IconRotationTypes.Rotate90}
                />
                Go Back
              </Button>
              <Box className="search-navigation">
                <ResultsSorts
                  perPage={searchQuery.perPage}
                  sort={searchQuery.sort}
                  onChangePerPage={(e) => onChangePerPage(e)}
                  onChangeSort={(e) => onChangeSort(e)}
                />
              </Box>
              <form name="filterForm">
                <Heading level={HeadingLevels.Two} id="filter-desktop-header">
                  Refine Results
                </Heading>
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
            </Modal>
          )}
          <Pagination
            pageCount={searchPaging.lastPage ? searchPaging.lastPage : 1}
            currentPage={searchPaging.currentPage}
            onPageChange={(e) => onPageChange(e)}
          />
        </TemplateContentPrimary>
      </TemplateContent>
    </Template>
  );
};

export default SearchResults;
