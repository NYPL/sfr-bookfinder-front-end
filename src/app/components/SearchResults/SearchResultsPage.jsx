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
import { deepEqual, isEmpty, checkFeatureFlagActivated } from '../../util/Util';
import TotalWorks from '../SearchForm/TotalWorks';

import featureFlagConfig from '../../../../featureFlagConfig';
import config from '../../../../appConfig';
import { searchFields } from '../../constants/fields';
import SearchHeader from '../SearchForm/SearchHeader';
import SearchResults from './SearchResults';

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
    this.state = { ...props, isFeatureFlagsActivated: {} };

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    loadSearch(this.props, this.context);

    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

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

  getDisplayItemsHeading() {
    const queriesToShow = this.props.searchQuery.showQueries
      .filter(query => searchFields.includes(query.field));
    const queries = queriesToShow.map((query, index) => {
      const joiner = index < queriesToShow.length - 1 ? ' and ' : '';
      return `${query.field}: ${query.query}${joiner}`;
    });
    return queries.join('');
  }

  render() {
    const { searchQuery, searchResults, eReaderUrl } = this.props;
    const { router, history } = this.context;
    return (
      <DS.Container>
        <main id="mainContent">
          <Breadcrumbs
            router={router}
            location={this.props.location}
          />
          <div
            aria-label="Digital Research Books Beta"
          >
            <div>
              <SearchHeader />
              {
                // eslint-disable-next-line no-underscore-dangle
                FeatureFlags.store._isFeatureActive(config.booksCount.experimentName)
                && <TotalWorks />
              }
            </div>
            <div className="grid-row">
              <DS.Heading
                level={1}
                id="page-title-heading"
                blockName="page-title"
                text={`Search Results for ${this.getDisplayItemsHeading()}`}
              />
            </div>
            <SearchResults
              searchQuery={searchQuery}
              results={searchResults.data}
              eReaderUrl={eReaderUrl}
              {...this.boundActions}
              history={history}
              router={router}
            />
          </div>
        </main>
      </DS.Container>
    );
  }
}

SearchResultsPage.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  workResult: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
  eReaderUrl: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any),
};

SearchResultsPage.defaultProps = {
  searchResults: {},
  searchQuery: initialSearchQuery,
  workResult: {},
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
