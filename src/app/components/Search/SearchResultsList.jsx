import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ResultsMetadata from './ResultsMetadata';
import ResultsList from './ResultsList';
import WorkPage from '../Work/WorkPage';

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const metadata = this.props.results && this.props.results.hits;
    const hits = this.props.results && this.props.results.hits && this.props.results.hits.hits;
    console.log('Hits to send to row', hits);

    if (!hits) {
      return null;
    } else {
      return (
        <div className="nypl-row">
          <div className="nypl-column-full">
            <ResultsMetadata metadata={metadata} />
            <ResultsList results={hits} />
          </div>
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
