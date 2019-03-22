import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'underscore';
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
    window.scrollTo(0, 0);
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

    this.props.searchPost(terms, this.state.searchField)
      .then(() => {
        const encodedUserInput = encodeURIComponent(terms);
        this.context.router.push(`/search?q=${encodedUserInput}&field=${this.state.searchField}`);
      });
  }

  render() {
    return (
      <div className="nypl-row">
        <div className="nypl-column-full">
          <form className="nypl-omnisearch-form" action="/search" method="get" onSubmit={this.handleSubmit} onKeyPress={this.handleSubmit}>
            <div className="ebook-search-form">
              <div className="nypl-omnisearch">
                <div className="nypl-text-field">
                  <span className="nypl-omni-fields">
                    <label htmlFor="search-by-field">Search in</label>
                    <select
                      id="search-by-field"
                      onChange={this.onFieldChange}
                      value={this.state.searchField}
                    >
                      {this.props.allowedFields.map((field, key) => {
                        return (
                          <option value={field} key={key.toString()}>
                            {titleCase(field)}
                          </option>
                        );
                      })}
                    </select>
                  </span>
                </div>
                <div className="nypl-text-field">
                  <span className="nypl-omni-fields-text">
                    {/* <label htmlFor="search-input">Search ResearchNow for</label> */}
                    <input
                      id="search-input"
                      name="q"
                      type="text"
                      aria-labelledby="search-input-field"
                      value={this.state.searchQuery}
                      placeholder="Keyword, title, author, or subject"
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
      </div>
    );
  }
}

SearchForm.propTypes = {
  allowedFields: PropTypes.array,
  searchQuery: PropTypes.string,
  searchField: PropTypes.string,
};

SearchForm.defaultProps = {
  allowedFields: [
    'keyword',
    'title',
    'author',
    'subject',
  ],
  searchQuery: '',
  searchField: 'keyword',
};

SearchForm.contextTypes = {
  router: PropTypes.object,
  history: PropTypes.object,
};

export default SearchForm;
