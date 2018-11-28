import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SearchResultsList extends React.Component {
  render() {
    console.log('State read by results', this.props.results);
    const hits = this.props.results && this.props.results.hits && this.props.results.hits.hits;

console.log(hits);
    if (!hits) {
      return null;
    }
    return (
      <div>
        <h3>Results</h3>
        <ul className="results-list">
          {
            hits.map(hit => (
              <li>
                <h4>{hit['_source'].title}</h4>
                <p>uuid: {hit['_source'].uuid}</p>
                <p>subjects: {
                    hit['_source'].subjects.map(subject => (
                      <span>{subject.subject}</span>
                    ))
                  }</p>
              </li>
            ))
          }
        </ul>
      </div>
    );
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
