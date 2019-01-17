import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import * as searchActions from '../../actions/SearchActions';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  render() {
    return (
      <div className="wrapper">
        <SearchForm
          searchQuery={this.props.searchQuery}
          searchField={this.props.searchField}
          {...this.boundActions}
        />
        <SearchResults results={this.props.searchResults} />
      </div>
    );
  }
}

SearchContainer.propTypes = {
  searchResults: PropTypes.object,
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
};

SearchContainer.defaultProps = {
  searchResults: {},
  searchQuery: '',
  searchField: 'q',
};

SearchContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return { 
    searchResults: state.searchResults,
    searchQuery: state.searchQuery,
    searchField: state.searchField,
  };
};

export default connect(
  mapStateToProps,
  null,
)(SearchContainer);
