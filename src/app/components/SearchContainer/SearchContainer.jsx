import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import * as searchActions from '../../actions/SearchActions';

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

  render() {
    const { query } = (this.props.location) ? this.props.location : '';
    const userQuery = (query && query.q) ? query.q : this.props.searchQuery;
    const selectedField = (query && query.field) ? query.field : this.props.searchField;
    return (
      <main id="mainContent">
        <div className="nypl-page-header">
          Breadcrumb Trail
        </div>
        <div className="nypl-full-width-wrapper" role="search" aria-label="ResearchNow">
          <div className="nypl-row">
            <div className="nypl-column-full">
              <h1 className="nypl-heading">ResearchNow</h1>
              <div id="tagline">
                Search the world&apos;s research collections and more for digital books you
                can use right now.
              </div>
            </div>
          </div>
          <div className="wrapper">
            <SearchForm
              searchQuery={userQuery}
              searchField={selectedField}
              {...this.boundActions}
            />
            <SearchResults
              results={this.props.searchResults}
              eReaderUrl={this.props.eReaderUrl}
              {...this.boundActions}
            />
          </div>
        </div>
      </main>
    );
  }
}

SearchContainer.propTypes = {
  searchResults: PropTypes.object,
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
  workDetail: PropTypes.object,
  dispatch: PropTypes.func,
  eReaderUrl: PropTypes.string,
};

SearchContainer.defaultProps = {
  searchResults: {},
  searchQuery: '',
  searchField: '',
  workDetail: {},
  dispatch: () => {},
  eReaderUrl: '',
};

SearchContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    searchResults: state.searchResults,
    searchQuery: state.searchQuery || ownProps.q,
    searchField: state.searchField || ownProps.field,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(SearchContainer));
