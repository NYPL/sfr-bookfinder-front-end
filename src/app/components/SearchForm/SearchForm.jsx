/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Select from '../Form/Select';
import SearchButton from '../Button/SearchButton';
import TextInput from '../Form/TextInput';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { deepEqual } from '../../util/Util';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props, ...{ error: false, errorMsg: '' } };

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
      this.setState({ searchQuery: nextProps.searchQuery, error: false, errorMsg: '' });
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
        { field: preState.searchQuery.showField ? preState.searchQuery.showField : preState.searchQuery.field || 'keyword' },
        { query: querySelected },
      ),
    }));
    if (querySelected) {
      this.setState({ error: false, errorMsg: '' });
    }
  }

  handleSubmit(event) {
    if (event && event.charCode === 13) {
      this.props.userQuery(
        Object.assign({}, initialSearchQuery, { query: this.state.searchQuery.query, field: this.state.searchQuery.field || 'keyword' }),
      );
      this.submitSearchRequest(event);
    }
  }

  submitSearchRequest(event) {
    event.preventDefault();
    const query = this.state.searchQuery.query.replace(/^\s+/, '').replace(/\s+$/, '');
    if (!query) {
      this.setState({ error: true, errorMsg: 'Please enter a search term' });
      return;
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
          className="grid-col-10 sfr-center usa-search usa-search--big"
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
              className="tablet:grid-col-4 nypl-search-input"
              label=""
              ariaLabel="Search"
              labelClass="visuallyhidden usa-label"
              id="search-by-field"
              selectClass="nypl-select-input usa-select"
              options={this.props.allowedFields}
              onChange={this.onFieldChange}
              value={selectedField}
              name="field"
            />
            <TextInput
              className="nypl-searchbar-input tablet:grid-col-4"
              ariaLabel="Search for keyword, author, title, or subject"
              labelClass="visuallyhidden usa-label"
              id="search-field-big"
              type="text"
              inputClass={this.state.error ? 'usa-input nypl-search-input usa-input--error' : 'usa-input nypl-search-input'}
              name="query"
              value={selectedQuery}
              onChange={this.onQueryChange}
              errorMessage={this.state.error ? this.state.errorMsg : null}
            />
            <SearchButton
              className="tablet:grid-col-2"
              id="search-button"
              buttonClassName="usa-button sfr-search-button"
              value="Search"
              onClick={this.submitSearchRequest}
              ariaLabel="Search"
            />
            <div className="tablet:grid-col-2 nypl-advanced-search padding-left-2 text-pre text-center">
              <Link
                to="advanced-search"
                className="text-baseline"
              >
                Advanced Search
              </Link>
            </div>
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
