import Actions from '../actions/Actions';
import alt from '../alt';

class Store {
  constructor() {
    this.bindListeners({
      searchByKeyword: Actions.SEARCH_BY_KEYWORD,
      searchByTitle: Actions.SEARCH_BY_TITLE,
      searchByAuthor: Actions.SEARCH_BY_AUTHOR,
    });

    this.state = {
      searchByKeyword: [],
      searchByTitle: [],
      searchByAuthor: [],
    };
  }

  searchByKeyword(searchByKeyword) {
    this.setState({ searchByKeyword });
  }

  searchByTitle(searchByTitle) {
    this.setState({ searchByTitle });
  }

  searchByAuthor(searchByAuthor) {
    this.setState({ searchByAuthor });
  }
}

export default alt.createStore(Store, 'Store');
