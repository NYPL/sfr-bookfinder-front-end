import React from "react";
import PropTypes from "prop-types";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DS from "@nypl/design-system-react-components";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'dgx-... Remove this comment to see the full error message
import FeatureFlags from "dgx-feature-flags";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/actions/SearchActions' o... Remove this comment to see the full error message
import * as searchActions from "~/src/actions/SearchActions";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Breadcrumbs/B... Remove this comment to see the full error message
import Breadcrumbs from "~/src/components/Breadcrumbs/Breadcrumbs";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/stores/InitialState' or ... Remove this comment to see the full error message
import { searchQueryPropTypes } from "~/src/stores/InitialState";
import Router, { withRouter } from "next/router";

import {
  deepEqual,
  isEmpty,
  getNumberOfPages,
  checkFeatureFlagActivated,
  // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
} from "~/src/util/Util";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchForm/To... Remove this comment to see the full error message
import TotalWorks from "~/src/components/SearchForm/TotalWorks";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/featureFlagConfig' or... Remove this comment to see the full error message
import featureFlagConfig from "~/config/featureFlagConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import config from "~/config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/fields' or its... Remove this comment to see the full error message
import { searchFields } from "~/src/constants/fields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchForm/Se... Remove this comment to see the full error message
import SearchHeader from "~/src/components/SearchForm/SearchHeader";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/SearchQuery' or its... Remove this comment to see the full error message
import { getQueryString } from "~/src/util/SearchQuery";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/sorts' or its ... Remove this comment to see the full error message
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/breakpoints' o... Remove this comment to see the full error message
import { breakpoints } from "~/src/constants/breakpoints";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchResults... Remove this comment to see the full error message
import Filters from "~/src/components/SearchResults/Filters";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/SearchResults... Remove this comment to see the full error message
import ResultsList from "~/src/components/SearchResults/ResultsList";
// import SearchPagination from "~/src/components/SearchResults/SearchPagination";

const isValidSearchQuery = (query: any) =>
  !!query && !isEmpty(query) && !!query.queries && !isEmpty(query.queries);

const loadSearch = (props: any, context: any) => {
  const { dispatch, searchQuery } = props;

  const query = Router.query;

  if (!isValidSearchQuery(query)) {
    dispatch(searchActions.resetSearch());
    Router.push("/");
  } else {
    let newQuery = Object.assign({}, query);
    if (query && query.filters) {
      newQuery = Object.assign({}, newQuery, {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
        filters: JSON.parse(query.filters),
      });
    }
    if (query && query.sort) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
      newQuery = Object.assign({}, newQuery, { sort: JSON.parse(query.sort) });
    }
    if (query && query.queries) {
      newQuery = Object.assign({}, newQuery, {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
        queries: JSON.parse(query.queries),
      });
    }
    if (query && query.showQueries) {
      newQuery = Object.assign({}, newQuery, {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
        showQueries: JSON.parse(query.showQueries),
      });
    }
    if (searchQuery && !deepEqual(newQuery, searchQuery)) {
      dispatch(searchActions.userQuery(newQuery));
      dispatch(searchActions.searchPost(newQuery));
    }
  }
};
// redirect to url with query params
export const submit = (query: any, router: any) => {
  const path = `/search?${getQueryString(query)}`;
  router.push(path);
};

type OwnSearchResultsPageProps = {
  searchResults?: {
    [key: string]: any;
  };
  searchQuery?: searchQueryPropTypes;
  dispatch?: (...args: any[]) => any;
  eReaderUrl?: string;
  location?: {
    [key: string]: any;
  };
};

type SearchResultsPageState = any;

type SearchResultsPageProps = OwnSearchResultsPageProps &
  typeof SearchResultsPage.defaultProps;

/**
 * Container class providing the Redux action creators
 * to its child components. State data is passed along
 * including params set in location.
 *
 * Accessibility Note: Creates the <main> element for all
 * search pages with the corresponding <h1>.
 */
class SearchResultsPage extends React.Component<
  SearchResultsPageProps,
  SearchResultsPageState
> {
  static defaultProps = {
    searchResults: {},
    searchQuery: {},
    dispatch: () => {},
    eReaderUrl: "",
    location: {},
  };

  static contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
  };

  boundActions: any;

  constructor(props: SearchResultsPageProps) {
    super(props);
    const { dispatch } = props;
    this.state = {
      ...props,
      isMobile: false,
      isModalOpen: false,
      isFeatureFlagsActivated: {},
    };

    this.boundActions = bindActionCreators(searchActions, dispatch);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    loadSearch(this.props, this.context);

    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.onWindowResize();

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList,
      this.state.isFeatureFlagsActivated
    );
  }

  componentDidUpdate(prevProps: SearchResultsPageProps) {
    const { location } = this.props;
    if (!deepEqual(location.query, prevProps.location.query)) {
      // global.window.scrollTo(0, 0);
      loadSearch(this.props, this.context);
    }
  }

  componentWillUnmount() {
    FeatureFlags.store.unlisten(this.onFeatureFlagsChange.bind(this));
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  onWindowResize() {
    if (window.innerWidth < breakpoints.large) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
      this.closeModal();
    }
  }

  getDisplayItemsHeading() {
    const showQueries =
      this.props.searchQuery && this.props.searchQuery.showQueries
        ? this.props.searchQuery.showQueries
        : this.props.searchQuery.queries;
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
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { searchQuery, eReaderUrl } = this.props;
    const { router } = this.context;
    const searchResults =
      this.props.searchResults &&
      this.props.searchResults.data &&
      this.props.searchResults.data.data;
    const numberOfWorks = searchResults && searchResults.totalWorks;
    const works = searchResults && searchResults.works;

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

    const totalPages = getNumberOfPages(numberOfWorks, searchQuery.per_page);
    const firstElement =
      Number(searchQuery.per_page || 10) * Number(searchQuery.page || 0) + 1;
    let lastElement =
      Number(searchQuery.per_page || 10) *
        (Number(searchQuery.page || 0) + 1) || 10;
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
      if (newPerPage !== searchQuery.per_page) {
        const newQuery = Object.assign({}, searchQuery, {
          page: newPage,
          per_page: newPerPage,
          total: numberOfWorks || 0,
        });
        submit(newQuery, router);
      }
    };

    // click and navigate with different sort
    const onChangeSort = (e: any) => {
      if (
        e.target.value !==
        Object.keys(sortMap).find((key) => sortMap[key] === searchQuery.sort)
      ) {
        const newQuery = Object.assign({}, searchQuery, {
          sort: sortMap[e.target.value],
          page: 0,
        });
        // userQuery(newQuery);
        submit(newQuery, router);
      }
    };

    return (
      <div className="layout-container">
        <main id="mainContent" className="main main--with-sidebar">
          <div className="content-header">
            <Breadcrumbs location={Router.pathname} />

            <div aria-label="Digital Research Books Beta">
              {searchQuery && (
                <>
                  <SearchHeader initialQuery={this.props.searchQuery} />
                  {
                    // eslint-disable-next-line no-underscore-dangle
                    FeatureFlags.store._isFeatureActive(
                      config.booksCount.experimentName
                    ) && <TotalWorks />
                  }
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
                text={`Search results for ${this.getDisplayItemsHeading()}`}
              />
            </div>

            <div className="search-navigation">
              {this.state.isMobile ? mobileItemCount : itemCount}
              {this.state.isMobile && (
                <div className="filter-refine">
                  {filterCount !== 0 && (
                    <span className="filter-count">
                      {filterCount} {filterCount === 1 ? "filter" : "filters"}
                    </span>
                  )}

                  <DS.Button
                    id="filter-button"
                    buttonType={DS.ButtonTypes.Link}
                    callback={this.openModal}
                  >
                    Refine
                  </DS.Button>
                </div>
              )}
              {!this.state.isMobile && (
                <div className="search-dropdowns">
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
              )}
            </div>
          </div>
          {!this.state.isMobile && (
            <div className="content-secondary content-secondary--with-sidebar-left">
              <Filters
                data={searchResults}
                searchQuery={searchQuery}
                router={router}
                onChangeSort={onChangeSort}
                onChangePerPage={onChangePerPage}
              />
            </div>
          )}

          <div className="content-primary content-primary--with-sidebar-left">
            <ResultsList results={works} eReaderUrl={eReaderUrl} />
            {/*  <SearchPagination
              totalItems={numberOfWorks}
              searchQuery={searchQuery}
              router={router}
            />*/}
          </div>
          {this.state.isMobile && this.state.isModalOpen && (
            <DS.Modal>
              <Filters
                toggleMenu={this.closeModal}
                isMobile={this.state.isMobile}
                data={searchResults}
                onChangeSort={onChangeSort}
                onChangePerPage={onChangePerPage}
                searchQuery={searchQuery}
                router={router}
              />
            </DS.Modal>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  searchResults: state.searchResults || ownProps.searchResults,
  searchQuery: state.searchQuery || ownProps.searchQuery,
});

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof SearchResultsPage' is not... Remove this comment to see the full error message
export default connect(mapStateToProps, null)(withRouter(SearchResultsPage));
