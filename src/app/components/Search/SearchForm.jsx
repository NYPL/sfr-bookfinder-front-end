import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchButton from '../Button/SearchButton';
import { search } from '../../actions/SearchActions';

export class SearchForm extends React.Component {
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
    if (!this.state.filter) {
      this.setState({ filter: 'q' });
    }

    this.state.search(this.state.query, this.state.filter);
  }

  render() {
    const { query, filter, allowedFilters } = this.state;

    return (
      <div>
        <form className="nypl-omnisearch-form" onSubmit={this.handleSubmit} onKeyPress={this.handleSubmit}>
          <div className="ebook-search-form">
            <div className="nypl-omnisearch">
              <div className="nypl-text-field">
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
              </div>
              <div className="nypl-text-field">
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
              </div>
              <div className="nypl-text-field">
                <SearchButton
                  className="nypl-omnisearch-button"
                  onClick={this.submitSearchRequest}
                />
              </div>
            </div>
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
  search: () => {},
};

SearchForm.propTypes = {
  searchResults: PropTypes.object,
  query: PropTypes.string,
  filter: PropTypes.string,
  allowedFilters: PropTypes.object,
  sort: PropTypes.object,
  search: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  search: (query, filter) => dispatch(search(query, filter)),
});


export default connect(
  null,
  mapDispatchToProps,
)(SearchForm);
