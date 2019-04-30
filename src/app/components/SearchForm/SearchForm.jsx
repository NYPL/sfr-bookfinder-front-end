/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { isEqual as _isEqual } from 'underscore';
import Select from '../Form/Select';
import SearchButton from '../Button/SearchButton';
import TextInput from '../Form/TextInput';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';

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
    if (!_isEqual(nextProps.searchQuery, this.props.searchQuery)) {
      this.setState({ searchQuery: nextProps.searchQuery });
    }
  }

  onFieldChange(event) {
    const fieldSelected = event.target.value;
    this.setState(preState => ({ searchQuery: Object.assign({}, preState.searchQuery, { field: fieldSelected }) }));
  }

  onQueryChange(event) {
    const querySelected = event.target.value;
    this.setState(preState => ({ searchQuery: Object.assign({}, preState.searchQuery, { query: querySelected }) }));
  }

  handleSubmit(event) {
    if (event && event.charCode === 13) {
      this.props.userQuery({ query: this.state.searchQuery.query, field: this.state.searchQuery.field });
      this.submitSearchRequest(event);
    }
  }

  submitSearchRequest(event) {
    event.preventDefault();
    if (!this.state.searchQuery.query) {
      throw new Error('Please enter a term or terms to search');
    }

    const path = `/search?${getQueryString(this.state.searchQuery)}`;
    this.context.router.push(path);
  }

  render() {
    const selectedQuery = this.state.searchQuery.showQuery || this.state.searchQuery.query;
    const selectedField = this.state.searchQuery.showField || this.state.searchQuery.field;

    return (
      <div className="grid-row">
        <form
          className="tablet:grid-col-12 sfr-center usa-search usa-search--big"
          action="/search"
          method="get"
          onSubmit={this.handleSubmit}
          onKeyPress={this.handleSubmit}
        >
          <div
            role="search"
            className="nypl-search grid-row"
            aria-label="ResearchNow"
          >
            <Select
              label="Search in"
              labelClass="usa-sr-only usa-label"
              id="search-by-field"
              selectClass="nypl-select-input usa-select"
              className="grid-col-3 nypl-search-input"
              options={this.props.allowedFields}
              onChange={this.onFieldChange}
              value={selectedField}
            />
            <TextInput
              label="Search for keyword, author, title, or subject"
              labelClass="usa-sr-only usa-label"
              id="search-field-big"
              type="text"
              inputClass="usa-input nypl-search-input"
              name="query"
              ariaLabel=""
              value={selectedQuery}
              onChange={this.onQueryChange}
              className="nypl-searchbar-input grid-col-3"
            />
            <SearchButton
              id="search-button"
              className="grid-col-1"
              buttonClassName="usa-button sfr-search-button"
              value="Search"
              onClick={this.submitSearchRequest}
            />
            <div className="grid-col-3" />
          </div>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  allowedFields: PropTypes.arrayOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
};

SearchForm.defaultProps = {
  allowedFields: ['keyword', 'title', 'author', 'subject'],
  searchQuery: initialSearchQuery,
  userQuery: () => {},
};

SearchForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default SearchForm;
