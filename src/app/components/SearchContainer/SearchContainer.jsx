import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as DS from '@nypl/design-system-react-components';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import Subjects from '../../../../subjectListConfig';
// import AdvancedSearchResults from '../SearchResults/AdvancedSearchResults';
import * as searchActions from '../../actions/SearchActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { deepEqual, isEmpty } from '../../util/Util';

/**
 * Container class providing the Redux action creators
 * to its child components. State data is passed along
 * including params set in location.
 *
 * Accessibility Note: Creates the <main> element for all
 * search pages with the corresponding <h1>.
 */
class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  componentDidMount() {
    this.loadSearch();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (!deepEqual(location.query, prevProps.location.query)) {
      global.window.scrollTo(0, 0);
      this.loadSearch();
    }
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
    const { searchQuery, searchResults, eReaderUrl } = this.props;
    const { router, history } = this.context;

    const pageType = isEmpty(searchResults) ? 'home' : 'results';
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
      <main
        id="mainContent"
      // className="main-content grid-container padding-0"
      >
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
          {(!searchResults || isEmpty(searchResults)) && (
            <div className="grid-row">
              <DS.HeaderImgRight
                headerId="ResearchNow-Main-Header"
                isImageDecorative
                pageTitleText="ResearchNow"
                imgUrl="https://placeimg.com/200/100/arch"
                bodyText={(
                  <p>
                  The internet’s search engine for research collections and
                  e-books you can use right now. Powered by the New York Public Library.
                  </p>
              )}
              />
            </div>
          )}
          <div className="grid-row">
            <SearchForm
              searchQuery={searchQuery}
              history={history}
              {...this.boundActions}
            />
          </div>

          {(!searchResults || isEmpty(searchResults)) && (
            <div className="grid-row">
              <DS.IconLinkList
                titleText="Browse By Subject"
                titleId="subject-browse-list"
                textLinks={Subjects}
              />
            </div>
          )}
          {/* <AdvancedSearchResults
              searchQuery={searchQuery}
              {...this.boundActions}
              router={router}
            /> */}
          <SearchResults
            searchQuery={searchQuery}
            results={searchResults}
            eReaderUrl={eReaderUrl}
            {...this.boundActions}
            history={history}
            router={router}
          />

        </div>
      </main>
    );
  }
}

SearchContainer.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  workDetail: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
  eReaderUrl: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any),
};

SearchContainer.defaultProps = {
  searchResults: {},
  searchQuery: initialSearchQuery,
  workDetail: {},
  dispatch: () => { },
  eReaderUrl: '',
  location: {},
};

SearchContainer.contextTypes = {
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
)(withRouter(SearchContainer));
