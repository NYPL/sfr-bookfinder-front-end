/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Form/Select';
import SearchButton from '../Button/SearchButton';
import TextInput from '../Form/TextInput';

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
      <div className="grid-row">
        <div className="grid-col-1" />
        <form
          className="grid-col-10 usa-search usa-search--big"
          action="/search"
          method="get"
          onSubmit={this.handleSubmit}
          onKeyPress={this.handleSubmit}
        >
          <div
            role="search"
            className="nypl-search grid-row"
          >
            <Select
              id="search-by-field"
              class="nypl-select-input usa-select"
              options={this.props.allowedFields}
              onChange={this.onFieldChange}
              value={this.state.searchField}
              label=""
              labelClass="usa-label"
            />
            <TextInput
              label=""
              labelClass=""
              inputClass="usa-input nypl-search-input"
              id="search-field-big"
              type="text"
              name="q"
              ariaLabel=""
              value={this.state.searchQuery}
              placeholder="Keyword, title, author, or subject"
              onChange={this.onQueryChange}
              className="nypl-searchbar-input grid-col-4"
            />
            <SearchButton
              id="search-button"
              className="grid-col-1"
              buttonClassName="usa-button sfr-search-button"
              value="Search"
              onClick={this.submitSearchRequest}
            />
          </div>
        </form>
      </div>
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
