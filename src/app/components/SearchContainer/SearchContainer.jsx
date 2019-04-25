import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { isEmpty as _isEmpty } from 'underscore';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import * as searchActions from '../../actions/SearchActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

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
    if (location !== prevProps.location) {
      global.window.scrollTo(0, 0);
      this.loadSearch();
    }
  }

  loadSearch() {
    let { searchQuery } = this.props;
    const {
      location: { query },
      dispatch,
      searchField,
    } = this.props;
    searchQuery = query && query.q ? query.q : searchQuery;
    const selectedField = query && query.field ? query.field : searchField;
    if (searchQuery) {
      dispatch(searchActions.userQuery(searchQuery));
      dispatch(searchActions.selectedField(selectedField));
      dispatch(searchActions.searchPost(searchQuery, selectedField));
    }
  }

  render() {
    const {
      searchQuery,
      searchField,
      searchResults,
      eReaderUrl,
      location: { query },
    } = this.props;
    const { router, history } = this.context;
    let selectedQuery = searchQuery;
    if (query && query.showQuery) {
      selectedQuery = query.showQuery;
    } else if (query && query.q) {
      selectedQuery = query.q;
    }
    let selectedField = searchField;
    if (query && query.showField) {
      selectedField = query.showField;
    } else if (query && query.field) {
      selectedField = query.field;
    }

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
              links={[
                {
                  href: `/search?q=${selectedQuery}&field=${selectedField}`,
                  text: 'Search Results',
                },
              ]}
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
              searchQuery={selectedQuery}
              searchField={selectedField}
              history={history}
              {...this.boundActions}
            />
            <SearchResults
              results={searchResults}
              eReaderUrl={eReaderUrl}
              {...this.boundActions}
            />
          </div>
        </div>
      </main>
    );
  }
}

SearchContainer.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.any),
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
  workDetail: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
  eReaderUrl: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any),
};

SearchContainer.defaultProps = {
  searchResults: {},
  searchQuery: '',
  searchField: 'keyword',
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
  searchField: state.searchField || ownProps.searchField,
});

export default connect(
  mapStateToProps,
  null,
)(withRouter(SearchContainer));
