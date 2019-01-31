import React from 'react';
import PropTypes from 'prop-types';
import SearchButton from '../Button/SearchButton';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
  }

  onFieldChange(event) {
    const fieldSelected = event.target.value;
    this.setState({ searchField: fieldSelected });
  }

  onQueryChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    if (event && event.charCode === 13) {
      this.submitSearchRequest(event);
    }
  }

  submitSearchRequest(event) {
    event.preventDefault();
    if (!this.state.searchField) {
      this.setState({ searchField: 'q' });
    }
    if (!this.state.searchQuery) {
      throw new Error('Please enter a term or terms to search');
    }

    const terms = this.state.searchQuery.trim().replace(/\s+/g, ' ');

    if (!this.state.searchField || this.state.searchField === 'q') {
      this.props.searchGet(terms);
    } else {
      this.props.searchPost(terms, this.state.searchField);
    }
    this.context.router.push(`/search?q=${terms}`);
  }

  render() {
    return (
      <div className="nypl-row">
        <div className="nypl-column-full">
          <form className="nypl-omnisearch-form" onSubmit={this.handleSubmit} onKeyPress={this.handleSubmit}>
            <div className="ebook-search-form">
              <div className="nypl-omnisearch">
                <div className="nypl-text-field">
                  <span className="nypl-omni-fields">
                    <label htmlFor="search-by-field">Search in</label>
                    <select
                      id="search-by-field"
                      onChange={this.onFieldChange}
                    >
                      <option value={this.props.allowedFields.kw} defaultValue>
                        Keyword
                      </option>
                      <option value={this.props.allowedFields.ti}>
                        Title
                      </option>
                      <option value={this.props.allowedFields.au}>
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
                      value={this.searchQuery}
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
          <div id="tagline">
            Search the world&apos;s research collections and more for digital books you
            can use right now.
          </div>
        </div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  allowedFields: PropTypes.object,
};

SearchForm.defaultProps = {
  allowedFields: {
    kw: 'q',
    ti: 'title',
    au: 'entities.name',
  },
};

SearchForm.contextTypes = {
  router: PropTypes.object,
};

export default SearchForm;
