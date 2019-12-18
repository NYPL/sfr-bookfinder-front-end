/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as DS from '@nypl/design-system-react-components';
// import Select from '../Form/Select';
// import SearchButton from '../Button/SearchButton';
// import TextInput from '../Form/TextInput';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { deepEqual } from '../../util/Util';
import { errorMessagesText } from '../../constants/labels';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props, ...{ error: false, errorMsg: '', isFeatureFlagsActivated: {} } };

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
    this.setState((prevState) => {
      const advancedQuery = {
        query: prevState.searchQuery.showQuery
          ? prevState.searchQuery.showQuery : prevState.searchQuery.queries[0].query,
        field: fieldSelected,
      };
      return ({
        searchQuery: Object.assign({}, initialSearchQuery,
          { showField: '', showQuery: '' },
          { queries: [].concat(advancedQuery) }),
      });
    });
  }

  onQueryChange(event) {
    const querySelected = event.target.value;

    this.setState((prevState) => {
      const advancedQuery = {
        query: querySelected,
        field: prevState.searchQuery.showField ? prevState.searchQuery.showField : prevState.searchQuery.queries[0].field || 'keyword',
      };

      return ({
        searchQuery: Object.assign({}, initialSearchQuery, { showField: '', showQuery: '' }, { queries: [].concat(advancedQuery) }),
      });
    });
    if (querySelected) {
      this.setState({ error: false, errorMsg: '' });
    }
  }

  handleSubmit(event) {
    if (event && event.charCode === 13) {
      this.props.userQuery(
        Object.assign({}, initialSearchQuery, {
          query: this.state.searchQuery.queries,
        }),
      );
    }
  }

  submitSearchRequest(event) {
    event.preventDefault();
    const query = this.state.searchQuery.queries[0].query.replace(/^\s+/, '').replace(/\s+$/, '');
    if (!query) {
      this.setState({ error: true, errorMsg: errorMessagesText.emptySearch });
      return;
    }

    const path = `/search?${getQueryString(this.state.searchQuery)}`;
    this.context.router.push(path);
  }

  render() {
    const selectedQuery = this.state.searchQuery.showQuery || this.state.searchQuery.queries[0].query;
    const selectedField = this.state.searchQuery.showField || this.state.searchQuery.queries[0].field;

    return (
      <DS.SearchPromo
        headingText="Search the World's Research Collections"
        titleId="tagline"
        selectedOption={selectedField}
        searchButtonId="searchButtonId"
        advancedSearchMessage={(
          <p>
              Use
            {' '}
            <Link
              to="advanced-search"
              className="text-baseline"
            >
                Advanced Search
            </Link>
            {' '}
              to narrow your results.
          </p>
          )}
        hasError={this.state.error}
        errorMessage={this.state.errorMsg}
        searchBarId="searchBarId"
        dropdownId="dropdownId"
        searchInputAriaLabel="Search for keyword, author, title, or subject"
        searchValue={selectedQuery}
        searchDropdownOptions={this.props.allowedFields}
        searchSubmitHandler={this.submitSearchRequest}
        textChangeHandler={this.onQueryChange}
        selectChangeHandler={this.onFieldChange}
        selectBlurHandler={this.onFieldChange}
      />

    /* <form
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
            {
              // eslint-disable-next-line no-underscore-dangle
              FeatureFlags.store._isFeatureActive(config.booksCount.experimentName)
              && <TotalWorks />
            }
          </div>
        </form> */
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
  userQuery: () => { },
};

SearchForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default SearchForm;
