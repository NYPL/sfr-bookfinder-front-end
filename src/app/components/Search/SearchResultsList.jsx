import React from 'react';
import reduxStore from '../../stores/ReduxStore';

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);

    const localStorage = [];

    const initialState = (localStorage['redux-store']) ?
      JSON.stringify(localStorage['redux-store']) :
      {};

    const saveState = () => {
      const state = JSON.stringify(this.state.getState());
      localStorage['redux-store'] = state;
    };

    this.state = reduxStore(initialState);
    this.state.subscribe(saveState);
  }

  render() {
    console.log('State read by results', this.state.getState());
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
