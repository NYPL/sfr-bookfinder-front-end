import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchForm from './SearchForm';
import SearchResultsList from './SearchResultsList';
import * as searchActions from '../../actions/SearchActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = props;
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
        <SearchResultsList results={this.props.searchResults} />
      </div>
    );
  }
}

Search.propTypes = {
  searchResults: PropTypes.object,
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
};

Search.defaultProps = {
  searchResults: {},
  searchQuery: '',
  searchField: 'q',
};

Search.contextTypes = {
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
)(Search);
