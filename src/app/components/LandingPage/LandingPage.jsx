import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as DS from '@nypl/design-system-react-components';
import FeatureFlags from 'dgx-feature-flags';
import SearchForm from '../SearchForm/SearchForm';
import Subjects from '../../../../subjectListConfig';
import * as searchActions from '../../actions/SearchActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { deepEqual, isEmpty, checkFeatureFlagActivated } from '../../util/Util';
import TotalWorks from '../SearchForm/TotalWorks';

import featureFlagConfig from '../../../../featureFlagConfig';
import config from '../../../../appConfig';
/**
 * Container class providing the Redux action creators
 * to its child components. State data is passed along
 * including params set in location.
 *
 * Accessibility Note: Creates the <main> element for all
 * search pages with the corresponding <h1>.
 */
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = { ...props, isFeatureFlagsActivated: {} };

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    this.loadSearch();
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));

    checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated,
    );
  }


  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (!deepEqual(location.query, prevProps.location.query)) {
      global.window.scrollTo(0, 0);
      this.loadSearch();
    }
  }

  componentWillUnmount() {
    FeatureFlags.store.unlisten(this.onFeatureFlagsChange.bind(this));
  }

  onFeatureFlagsChange() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  loadSearch() {
    const {
      location: { query },
      dispatch,
      searchQuery,
    } = this.props;

    if (!query || isEmpty(query)) {
      this.boundActions.resetSearch();
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
      if (searchQuery && !deepEqual(newQuery, searchQuery)) {
        dispatch(searchActions.userQuery(newQuery));
        dispatch(searchActions.searchPost(newQuery));
      }
    }
  }

  render() {
    const { searchQuery } = this.props;
    const { router, history } = this.context;

    const pageType = 'home';
    /**
     * onClick handler for resetting state for the request back to the home page
     * to return the user to a new search.
     *
     * @param {object} event
     */
    const handleReset = (event) => {
      event.preventDefault();

      this.boundActions.resetSearch();
      router.push('/');
    };

    return (
      <DS.Container>
        <main id="mainContent">
          <Breadcrumbs
            links={[
              {
                href: `/search?${getQueryString(searchQuery)}`,
                text: 'Search Results',
              },
            ]}
            pageType={pageType}
            onClickHandler={handleReset}
          />
          <div
            aria-label="ResearchNow"
          >
            <div className="grid-row">
              <div className="sfr-center">
                <DS.HeaderImgRight
                  headerId="ResearchNow-Main-Header"
                  isImageDecorative
                  pageTitleText="ResearchNow"
                  imgUrl="https://placeimg.com/200/100/arch"
                  bodyText={(
                    <p>
                      Find millions of free digital books from the world’s research libraries
                    </p>
                  )}
                />
              </div>
            </div>
            <div className="grid-row">
              <div className="sfr-center">
                <SearchForm
                  isHomePage
                  history={history}
                  {...this.boundActions}
                />
                {
                // eslint-disable-next-line no-underscore-dangle
                FeatureFlags.store._isFeatureActive(config.booksCount.experimentName)
                && <TotalWorks />
              }
              </div>
            </div>
            <div className="grid-row">
              <div className="sfr-center">
                <DS.IconLinkList
                  titleText="Browse By Subject"
                  titleId="subject-browse-list"
                  textLinks={Subjects}
                />
              </div>
            </div>
          </div>
        </main>
      </DS.Container>
    );
  }
}

LandingPage.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  workDetail: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
  eReaderUrl: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any),
};

LandingPage.defaultProps = {
  searchResults: {},
  searchQuery: initialSearchQuery,
  workDetail: {},
  dispatch: () => { },
  eReaderUrl: '',
  location: {},
};

LandingPage.contextTypes = {
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
)(withRouter(LandingPage));
