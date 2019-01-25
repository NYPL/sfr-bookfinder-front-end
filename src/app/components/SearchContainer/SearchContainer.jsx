import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import * as searchActions from '../../actions/SearchActions';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.boundActions = bindActionCreators(searchActions, dispatch);
    this.showingDetails = false;
  }

  componentDidUpdate() {
    const updated = true;
    this.showingDetails = updated;
  }

  render() {
    return (
      <main id="mainContent">
        <div className="nypl-page-header">
          <div className="breadcrumb" />
        </div>
        <div className="nypl-full-width-wrapper">
          <div className="nypl-row">
            <div className="nypl-column-full">
              <h1 className="nypl-heading">ResearchNow</h1>
            </div>
          </div>
          <div className="wrapper">
            <SearchForm
              searchQuery={this.props.searchQuery}
              searchField={this.props.searchField}
              {...this.boundActions}
            />
            <SearchResults
              results={this.props.searchResults}
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
};

SearchContainer.defaultProps = {
  searchResults: {},
  searchQuery: '',
  searchField: 'q',
  workDetail: {},
  dispatch: () => {},
};

SearchContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return { 
    searchResults: state.searchResults,
    searchQuery: state.searchQuery,
    searchField: state.searchField,
    workDetail: state.workDetail,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withRouter(SearchContainer));
