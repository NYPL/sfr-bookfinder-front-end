import React from 'react';

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    console.log('State read by results', this.state);
    let resultsList;
    if (this.state.searchResults !== {}) {
      resultsList = 'Your search results';
    }
    return (
      <div className="results-list">
        <div className="results-header"><h3>{resultsList}</h3></div>
        <div className="results-metadata"></div>
        <div className="results-table"></div>
      </div>
    );
  }
}

export default SearchResultsList;
