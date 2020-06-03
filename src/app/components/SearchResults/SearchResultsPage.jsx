import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import * as searchActions from '../../actions/SearchActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import {
  deepEqual, isEmpty, getNumberOfPages, checkFeatureFlagActivated,
} from '../../util/Util';
import TotalWorks from '../SearchForm/TotalWorks';

import featureFlagConfig from '../../../../featureFlagConfig';
import config from '../../../../appConfig';
import { searchFields } from '../../constants/fields';
import SearchHeader from '../SearchForm/SearchHeader';
import { getQueryString } from '../../search/query';
import { sortMap, numbersPerPage } from '../../constants/sorts';
import { breakpoints } from '../../constants/breakpoints';
import Filters from './Filters';
import ResultsList from './ResultsList';
import SearchPagination from './SearchPagination';

export const isValidSearchQuery = query => !!query && !isEmpty(query) && !!query.queries && !isEmpty(query.queries);

export const loadSearch = (props, context) => {
  const {
    location: { query },
    dispatch,
    searchQuery,
  } = props;

  if (!isValidSearchQuery(query)) {
    dispatch(searchActions.resetSearch());
    context.router.push('/');
  } else {
    let newQuery = Object.assign({}, query);
    if (query && query.filters) {
      newQuery = Object.assign({}, newQuery, { filters: JSON.parse(query.filters) });
    }
    if (query && query.sort) {
      newQuery = Object.assign({}, newQuery, { sort: JSON.parse(query.sort) });
    }
    if (query && query.queries) {
      newQuery = Object.assign({}, newQuery, { queries: JSON.parse(query.queries) });
    }
    if (query && query.showQueries) {
      newQuery = Object.assign({}, newQuery, { showQueries: JSON.parse(query.showQueries) });
    }
    if (searchQuery && !deepEqual(newQuery, searchQuery)) {
      dispatch(searchActions.userQuery(newQuery));
      dispatch(searchActions.searchPost(newQuery));
    }
  }
};
// redirect to url with query params
export const submit = (query, router) => {
  const path = `/search?${getQueryString(query)}`;
  router.push(path);
};

/**
 * Container class providing the Redux action creators
 * to its child components. State data is passed along
 * including params set in location.
 *
 * Accessibility Note: Creates the <main> element for all
 * search pages with the corresponding <h1>.
 */
class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      ...props, isMobile: false, isModalOpen: false, isFeatureFlagsActivated: {},
    };

    this.boundActions = bindActionCreators(searchActions, dispatch);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    loadSearch(this.props, this.context);

    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.onWindowResize();

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (!deepEqual(location.query, prevProps.location.query)) {
      global.window.scrollTo(0, 0);
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
    const showQueries = this.props.searchQuery && this.props.searchQuery.showQueries
      ? this.props.searchQuery.showQueries : this.props.searchQuery.queries;
    const queriesToShow = showQueries && showQueries.filter(query => searchFields.includes(query.field));
    const queries = queriesToShow && queriesToShow.map((query, index) => {
      const joiner = index < queriesToShow.length - 1 ? ' and ' : '';
      return `${query.field}: ${query.query}${joiner}`;
    });
    return queries && queries.join('');
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
    const searchResults = this.props.searchResults && this.props.searchResults.data && this.props.searchResults.data.data;
    const numberOfWorks = searchResults && searchResults.totalWorks;
    const works = searchResults && searchResults.works;

    let filterCount = 0;
    if (searchQuery.filters) {
      filterCount = searchQuery.filters.length;

      // "Show All" doesn't appear in Filters array, but counts as a filter when checked, and doesn't count when unchecked;
      if (searchQuery.filters.find(filter => filter.field === 'show_all')) {
        filterCount -= 1;
      } else {
        filterCount += 1;
      }
    }

    const totalPages = getNumberOfPages(numberOfWorks, searchQuery.per_page);
    const firstElement = (Number(searchQuery.per_page || 10) * Number(searchQuery.page || 0)) + 1;
    let lastElement = Number(searchQuery.per_page || 10) * (Number(searchQuery.page || 0) + 1) || 10;
    if (searchQuery.page >= totalPages - 1 && lastElement > numberOfWorks) {
      lastElement = numberOfWorks;
    }

    const itemCount = (
      <DS.Heading
        level={2}
        id="page-title-heading"
        blockName="page-title"
      >
        {numberOfWorks > 0
          ? `Viewing ${firstElement.toLocaleString()} - ${lastElement.toLocaleString()} of ${numberOfWorks.toLocaleString()} items`
          : 'Viewing 0 items'}
      </DS.Heading>
    );
    const mobileItemCount = (
      <DS.Heading
        level={2}
        id="page-title-heading"
        blockName="page-title"
      >
        <>
          {numberOfWorks > 0 ? `${numberOfWorks.toLocaleString()} items` : '0 items'}
        </>
      </DS.Heading>
    );

    const onChangePerPage = (e) => {
      const newPage = 0;
      const newPerPage = e.target.value;
      if (newPerPage !== searchQuery.per_page) {
        const newQuery = Object.assign({}, searchQuery, { page: newPage, per_page: newPerPage, total: numberOfWorks || 0 });
        // this.props.userQuery(newQuery);
        submit(newQuery, router);
      }
    };

    // click and navigate with different sort
    const onChangeSort = (e) => {
      if (e.target.value !== Object.keys(sortMap).find(key => sortMap[key] === searchQuery.sort)) {
        const newQuery = Object.assign({}, searchQuery, { sort: sortMap[e.target.value], page: 0 });
        // userQuery(newQuery);
        submit(newQuery, router);
      }
    };
    return (
      <div className="layout-container">
        <main
          id="mainContent"
          className="main main--with-sidebar"
        >
          <div className="content-header">
            <Breadcrumbs
              router={router}
              location={this.props.location}
            />
            <div
              aria-label="Digital Research Books Beta"
            >
              {searchQuery && (
              <>
                <SearchHeader initialQuery={this.props.searchQuery} />
                {
                // eslint-disable-next-line no-underscore-dangle
                FeatureFlags.store._isFeatureActive(config.booksCount.experimentName)
                && <TotalWorks />
              }
              </>
              )
            }
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
                    {filterCount}
                    {' '}
                    {filterCount === 1 ? 'filter' : 'filters'}
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
                    selectedOption={searchQuery.per_page ? searchQuery.per_page : undefined}
                    dropdownOptions={numbersPerPage.map(number => number.toString())}
                    onSelectChange={onChangePerPage}
                    onSelectBlur={onChangePerPage}
                  />
                  <DS.Dropdown
                    dropdownId="sort-by-select"
                    isRequired={false}
                    labelPosition="left"
                    labelText="Sort By"
                    labelId="nav-sort-by"
                    selectedOption={searchQuery.sort
                      ? Object.keys(sortMap).find(key => deepEqual(sortMap[key], searchQuery.sort)) : undefined}
                    dropdownOptions={Object.keys(sortMap).map(sortOption => sortOption)}
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
            <ResultsList
              results={works}
              eReaderUrl={eReaderUrl}
            />
            <SearchPagination
              totalItems={numberOfWorks}
              searchQuery={searchQuery}
              router={router}
            />
          </div>

          { this.state.isMobile && this.state.isModalOpen && (
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

SearchResultsPage.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  dispatch: PropTypes.func,
  eReaderUrl: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any),
};

SearchResultsPage.defaultProps = {
  searchResults: {},
  searchQuery: {},
  dispatch: () => { },
  eReaderUrl: '',
  location: {},
};

SearchResultsPage.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state, ownProps) => ({
  searchResults: state.searchResults || ownProps.searchResults,
  searchQuery: state.searchQuery || ownProps.searchQuery,
});

export default connect(
  mapStateToProps,
  null,
)(withRouter(SearchResultsPage));
