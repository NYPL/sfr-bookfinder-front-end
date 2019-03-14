import React from 'react';
import ReactDOM from 'react-dom';
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
  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
    const { query } = this.props.location;
    const searchQuery = (query && query.q) ? query.q : this.props.searchQuery;
    const selectedField = (query && query.field) ? query.field : this.props.searchField;
    const pageType = (_isEmpty(this.props.searchResults)) ? 'home' : 'results';

    return (
      <main id="mainContent">
        <div className="nypl-full-width-wrapper">
          <div className="nypl-page-header">
            <Breadcrumbs query={this.props.searchQuery} type={pageType} />
          </div>
          <div role="search" aria-label="ResearchNow">
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
  searchResults: PropTypes.object,
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
  workDetail: PropTypes.object,
  dispatch: PropTypes.func,
  eReaderUrl: PropTypes.string,
  location: PropTypes.object,
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

const mapStateToProps = (state, ownProps) => (
  {
    searchResults: state.searchResults,
    searchQuery: state.userQuery || ownProps.q,
    searchField: state.selectedField || ownProps.field,
  }
);

export default connect(
  mapStateToProps,
  null,
)(withRouter(SearchContainer));
