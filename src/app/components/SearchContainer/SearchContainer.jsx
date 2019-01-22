import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import WorkDetail from '../WorkDetail/WorkDetail';
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
      <div className="wrapper">
        {!this.showingDetails &&
        <SearchForm
          searchQuery={this.props.searchQuery}
          searchField={this.props.searchField}
          {...this.boundActions}
        />}
        {!this.showingDetails &&
        <SearchResults
          results={this.props.searchResults}
          {...this.boundActions}
        />}
        <WorkDetail detail={this.props.workDetail} />
      </div>
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
)(SearchContainer);
