import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultsMetadata from './ResultsMetadata';
import ResultsList from './ResultsList';

class SearchResultsList extends React.Component {
  render () {
    const metadata = this.props.results && this.props.results.hits;
    const hits = this.props.results && this.props.results.hits && this.props.results.hits.hits;

    if (!hits) {
      return null;
    } else {
      return (
        <div>
          <ResultsMetadata metadata={metadata} />
          <ResultsList results={hits} />
        </div>
      );
    }
  }
}

SearchResultsList.defaultProps = {
  results: {},
};

SearchResultsList.propTypes = {
  results: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    results: state && state.searchResults && state.searchResults.data,
  };
};

export default connect(
  mapStateToProps,
  null,
)(SearchResultsList);
