import Actions from '../actions/Actions.js';
import alt from '../alt.js';

class Store {
  constructor() {
    this.bindListeners({
      searchByKeyword: Actions.SEARCH_BY_KEYWORD,
    });

    this.state = {
      searchByKeyword: [],
    };
  }

  searchByKeyword(searchByKeyword) {
    this.setState({ searchByKeyword });
  }
}

export default alt.createStore(Store, 'Store');
