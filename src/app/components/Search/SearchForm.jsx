import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reduxStore from '../../stores/ReduxStore';
import SearchButton from '../Button/SearchButton';
import { query, filter, sort, searchResults } from '../../stores/Reducers';
import { searchActions, search } from '../../actions/SearchActions';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    const localStorage = [];

    const initialState = (localStorage['redux-store']) ?
      JSON.stringify(localStorage['redux-store']) :
      props;

    const saveState = () => {
      const state = JSON.stringify(this.state.getState());
      localStorage['redux-store'] = state;
    };

    this.state = reduxStore(initialState);
    this.state.subscribe(saveState);

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
  }

  onFilterChange(event) {
    const filterSelected = event.target.value;
    this.setState({ filter: filterSelected });
  }

  onQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    if (event && event.charCode === 13) {
      this.submitSearchRequest(event);
    }
  }

  submitSearchRequest(event) {
    event.preventDefault();
    if (!this.state.getState().filter) {
      this.setState({ filter: 'q' });
    }
    const action = {
      type: searchActions.SEARCH,
      payload: {
        query: this.state.getState().query,
        filter: this.state.getState().filter,
      },
    };

    this.state.dispatch({
      type: searchActions.SEARCH,
      payload: {
        searchResults: { hits: 0 },
        query: this.state.getState().query,
        filter: this.state.getState().filter,
        sort: { sortFilter: 'title', sortOrder: 'asc' },
      },
    });

    console.log('next state', this.state.getState());
  }

  render() {
    const { query, filter } = this.props;
    console.log('SearchForm state', this.state.getState());

    return (
      <div>
        <form className="ebook-search" onSubmit={this.handleSubmit} onKeyPress={this.handleSubmit}>
          <div className="ebook-search-form">
            <fieldset className="nypl-omnisearch">
              <span className="nypl-omni-fields">
                <label htmlFor="search-by-field">Search in</label>
                <select
                  id="search-by-field"
                  onChange={this.onFilterChange}
                  value={this.state.getState().filter}
                >
                  <option value={this.state.getState().allowedFilters.kw} defaultValue>
                    Keyword
                  </option>
                  <option value={this.state.getState().allowedFilters.ti}>
                    Title
                  </option>
                  <option value={this.state.getState().allowedFilters.au}>
                    Author
                  </option>
                </select>
              </span>
              <span className="nypl-omni-fields-text">
                {/* <label htmlFor="search-input">Search ResearchNow for</label> */}
                <input
                  id="search-input"
                  name="query"
                  type="text"
                  aria-labelledby="search-input-field"
                  value={this.state.getState().query}
                  placeholder="Keyword, title, or author"
                  onChange={this.onQueryChange}
                />
              </span>
              <SearchButton
                className="nypl-omni-button"
                onClick={this.submitSearchRequest}
              />
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}

SearchForm.defaultProps = {
  searchResults: {},
  query: '',
  filter: '',
  allowedFilters: {
    kw: 'q',
    ti: 'filters[title]',
    au: 'filters[author]',
  },
  sort: {
    sortFilter: 'title',
    sortOrder: 'asc',
  },
};

SearchForm.propTypes = {
  searchResults: PropTypes.object,
  query: PropTypes.string,
  filter: PropTypes.string,
  allowedFilters: PropTypes.object,
  sort: PropTypes.object,
};

export default SearchForm;
