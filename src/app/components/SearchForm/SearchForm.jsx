import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'change-case';
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

  componentDidMount() {
    global.window.scrollTo(0, 0);
  }

  /**
   * Used to update the downstream props updated by the
   * parent component, SearchContainer.
   *
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchQuery !== this.props.searchQuery) {
      this.setState({ searchQuery: nextProps.searchQuery });
    }
    if (nextProps.searchField !== this.props.searchField) {
      this.setState({ searchField: nextProps.searchField });
    }
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
      this.props.selectedField(this.state.searchField);
      this.props.userQuery(this.state.searchQuery);
      this.submitSearchRequest(event);
    }
  }

  submitSearchRequest(event) {
    event.preventDefault();
    if (!this.state.searchQuery) {
      throw new Error('Please enter a term or terms to search');
    }

    const terms = this.state.searchQuery.trim().replace(/\s+/g, ' ');
    const encodedUserInput = encodeURIComponent(terms);
    const path = `/search?q=${encodedUserInput}&field=${this.state.searchField}`;
    this.context.router.push(path);
  }

  render() {
    return (
      <form
        className="usa-search"
        action="/search"
        method="get"
        onSubmit={this.handleSubmit}
        onKeyPress={this.handleSubmit}
      >
        <div role="search">
          <div className="nypl-search-bar">
            <div className="nypl-search-input">
              <label htmlFor="search-by-field" className="usa-sr-only">Search in</label>
              <select
                id="search-by-field"
                className="usa-input nypl-search-input"
                onChange={this.onFieldChange}
                value={this.state.searchField}
              >
                {this.props.allowedFields.map((field, key) => (
                  <option value={field} key={key.toString()}>
                    {titleCase(field)}
                  </option>
                ))}
              </select>
            </div>
            <div className="nypl-search-input">
              <label htmlFor="search-input" className="usa-sr-only">Search ResearchNow for</label>
              <input
                id="search-input"
                name="q"
                type="text"
                aria-labelledby="search-input-field"
                value={this.state.searchQuery}
                className="usa-input"
                placeholder="Keyword, title, author, or subject"
                onChange={this.onQueryChange}
              />
            </div>
            <SearchButton
              className="usa-button nypl-search-input"
              onClick={this.submitSearchRequest}
            />
          </div>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  allowedFields: PropTypes.arrayOf(PropTypes.any),
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
  selectedField: PropTypes.func,
  userQuery: PropTypes.func,
};

SearchForm.defaultProps = {
  allowedFields: ['keyword', 'title', 'author', 'subject'],
  searchQuery: '',
  searchField: 'keyword',
  selectedField: () => {},
  userQuery: () => {},
};

SearchForm.contextTypes = {
  router: PropTypes.object,
  history: PropTypes.object,
};

export default SearchForm;
