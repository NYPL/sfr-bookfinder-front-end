import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchButton from '../Button/SearchButton';
import { search } from '../../actions/SearchActions';

export class SearchForm extends React.Component {
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
    this.setState({ field: fieldSelected });
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
    if (!this.state.field) {
      this.setState({ field: 'q' });
    }
    const terms = this.state.query.trim().replace(/\s+/g, ' ');

    this.state.search(terms, this.state.field);
  }

  render() {
    const { query, field, allowedFields } = this.state;

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
                    onChange={this.onFieldChange}
                    value={field}
                  >
                    <option value={allowedFields.kw} defaultValue>
                      Keyword
                    </option>
                    <option value={allowedFields.ti}>
                      Title
                    </option>
                    <option value={allowedFields.au}>
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
  field: '',
  allowedFields: {
    kw: 'q',
    ti: 'fields[title]',
    au: 'fields[author]',
  },
  sort: {
    sortField: 'title',
    sortOrder: 'asc',
  },
  search: () => {},
};

SearchForm.propTypes = {
  searchResults: PropTypes.object,
  query: PropTypes.string,
  field: PropTypes.string,
  allowedFields: PropTypes.object,
  sort: PropTypes.object,
  search: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  search: (query, field) => dispatch(search(query, field)),
});


export default connect(
  null,
  mapDispatchToProps,
)(SearchForm);
