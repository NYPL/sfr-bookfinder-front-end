import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { isEmpty as _isEmpty, isEqual as _isEqual } from 'underscore';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import * as searchActions from '../../actions/SearchActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
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
    if (!_isEqual(location.query, prevProps.location.query)) {
      global.window.scrollTo(0, 0);
      this.loadSearch();
    }
  }

  loadSearch() {
    const { searchQuery } = this.props;
    const {
      location: { query },
      dispatch,
    } = this.props;
    const selectedQuery = query && query.query ? query.query : searchQuery.query;
    const selectedField = query && query.field ? query.field : searchQuery.field;
    if (selectedQuery) {
      dispatch(searchActions.userQuery(Object.assign({}, initialSearchQuery, query, { query: selectedQuery, field: selectedField })));
      dispatch(searchActions.searchPost(Object.assign({}, initialSearchQuery, query, { query: selectedQuery, field: selectedField })));
    }
  }

  render() {
    const { searchQuery, searchResults, eReaderUrl } = this.props;
    const { router, history } = this.context;

    const pageType = _isEmpty(searchResults) ? 'home' : 'results';
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
        className="main-content grid-container padding-0"
      >
        <div className="grid-row">
          <div className="sfr-header-wrapper tablet:grid-col-12">
            <Breadcrumbs
              links={[]}
              pageType={pageType}
              onClickHandler={handleReset}
            />
          </div>
          <div
            role="search"
            aria-label="ResearchNow"
            className="grid-col-12"
          >
            {(!searchResults || _isEmpty(searchResults)) && (
              <div className="nypl-row sfr-header-wrapper grid-col-10">
                <h1 className="nypl-heading">ResearchNow</h1>
                <div id="tagline">Search the world&apos;s research collections and more for digital books you can use right now.</div>
              </div>
            )}
            <SearchForm
              searchQuery={searchQuery}
              history={history}
              {...this.boundActions}
            />
            <SearchResults
              searchQuery={searchQuery}
              results={searchResults}
              eReaderUrl={eReaderUrl}
              {...this.boundActions}
              history={history}
              router={router}
            />
          </div>
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
  dispatch: () => {},
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
