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
    if (this.props.location !== prevProps.location) {
      global.window.scrollTo(0, 0);
      this.loadSearch();
    }
  }

  loadSearch() {
    const { query } = this.props.location;
    const searchQuery = query && query.q ? query.q : this.props.searchQuery;
    const selectedField = query && query.field ? query.field : this.props.searchField;
    if (searchQuery) {
      this.props.dispatch(searchActions.userQuery(searchQuery));
      this.props.dispatch(searchActions.selectedField(selectedField));
      this.props.dispatch(searchActions.searchPost(searchQuery, selectedField));
    }
  }

  render() {
    const { query } = this.props.location;
    let { searchQuery } = this.props;
    if (query && query.showQuery) {
      searchQuery = query.showQuery;
    } else if (query && query.q) {
      searchQuery = query.q;
    }
    let selectedField = this.props.searchField;
    if (query && query.showField) {
      selectedField = query.showField;
    } else if (query && query.field) {
      selectedField = query.field;
    }

    const pageType = _isEmpty(this.props.searchResults) ? 'home' : 'results';
    /**
     * onClick handler for resetting state for the request back to the home page
     * to return the user to a new search.
     *
     * @param {object} event
     */
    const handleReset = (event) => {
      event.preventDefault();

      this.boundActions.resetSearch();
      this.context.router.push('/');
    };

    return (
      <main id="mainContent">
        <div className="nypl-full-width-wrapper">
          <div className="nypl-page-header">
            <Breadcrumbs
              links={[
                {
                  href: `/search?q=${searchQuery}&field=${selectedField}`,
                  text: 'Search Results',
                },
              ]}
              pageType={pageType}
              onClickHandler={handleReset}
            />
          </div>
          <div role="search" aria-label="ResearchNow">
            <div className="nypl-row">
              <div className="nypl-column-full">
                <h1 className="nypl-heading">ResearchNow</h1>
                <div id="tagline">
                  Search the world&apos;s research collections and more for digital books you can
                  use right now.
                </div>
              </div>
            </div>
            <div className="wrapper">
              <SearchForm
                searchQuery={searchQuery}
                searchField={selectedField}
                history={this.context.history}
                {...this.boundActions}
              />
              <SearchResults
                results={this.props.searchResults}
                eReaderUrl={this.props.eReaderUrl}
                {...this.boundActions}
              />
            </div>
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
  router: PropTypes.object,
  history: PropTypes.object,
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
