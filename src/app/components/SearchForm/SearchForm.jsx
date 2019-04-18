/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Form/Select';
import SearchBar from './SearchBar';

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
        className="usa-search usa-search-big"
        action="/search"
        method="get"
        onSubmit={this.handleSubmit}
        onKeyPress={this.handleSubmit}
      >
        <div role="search">
          <div className="nypl-search">
            <Select
              label="Search in"
              id="search-by-field"
              class="nypl-select-input"
              options={this.props.allowedFields}
              onChange={this.onFieldChange}
              value={this.state.searchField}
            />
            <SearchBar
              className="usa-width-two-thirds nypl-searchbar"
              inputLabel="Search ResearchNow for"
              inputId="search-input"
              inputClass="search-field-big nypl-search-input"
              inputName="q"
              inputValue={this.state.searchQuery}
              inputType="text"
              placeholder="Keyword, title, author, or subject"
              ariaLabel="search-input-field"
              onChangeHandler={this.onQueryChange}
              buttonId="search-button"
              buttonClass="usa-width-one-third nypl-search-button"
              buttonValue="Search"
              onClickHandler={this.submitSearchRequest}
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
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default SearchForm;
