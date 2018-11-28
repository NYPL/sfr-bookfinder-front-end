import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchButton from '../Button/SearchButton';
import { search } from '../../actions/SearchActions';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;

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
    if (!this.store.filter) {
      this.setState({ filter: 'q' });
    }
    // this.props.search(this.props.query, this.props.filter);
  }

  render() {
    const { searchResults, query, filter, allowedFilters, sort } = this.state;

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
                  value={filter}
                >
                  <option value={allowedFilters.kw} defaultValue>
                    Keyword
                  </option>
                  <option value={allowedFilters.ti}>
                    Title
                  </option>
                  <option value={allowedFilters.au}>
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
                  value={query}
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
