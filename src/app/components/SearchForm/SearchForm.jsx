/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Form/Select';
import SearchButton from '../Button/SearchButton';
import TextInput from '../Form/TextInput';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { deepEqual } from '../../util/Util';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props };

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
    if (!deepEqual(nextProps.searchQuery, this.props.searchQuery)) {
      this.setState({ searchQuery: nextProps.searchQuery });
    }
  }

  onFieldChange(event) {
    const fieldSelected = event.target.value;
    this.setState(preState => ({
      searchQuery: Object.assign(
        {},
        initialSearchQuery,
        { showField: '', showQuery: '' },
        { query: preState.searchQuery.showQuery ? preState.searchQuery.showQuery : preState.searchQuery.query },
        { field: fieldSelected },
      ),
    }));
  }

  onQueryChange(event) {
    const querySelected = event.target.value;
    this.setState(preState => ({
      searchQuery: Object.assign(
        {},
        initialSearchQuery,
        { showField: '', showQuery: '' },
        { field: preState.searchQuery.showField ? preState.searchQuery.showField : preState.searchQuery.field },
        { query: querySelected },
      ),
    }));
  }

  handleSubmit(event) {
    if (event && event.charCode === 13) {
      this.props.userQuery(
        Object.assign({}, initialSearchQuery, { query: this.state.searchQuery.query, field: this.state.searchQuery.field }),
      );
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
              label=""
              ariaLabel="Search"
              labelClass="visuallyhidden usa-label"
              id="search-by-field"
              selectClass="nypl-select-input usa-select"
              className="grid-col-3 nypl-search-input"
              options={this.props.allowedFields}
              onChange={this.onFieldChange}
              value={selectedField}
              name="field"
            />
            <TextInput
              ariaLabel="Search for keyword, author, title, or subject"
              labelClass="visuallyhidden usa-label"
              id="search-field-big"
              type="text"
              inputClass="usa-input nypl-search-input"
              name="query"
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
              ariaLabel="Search"
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
