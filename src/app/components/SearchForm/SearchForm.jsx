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

  // TODO: fix show field and query
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
    const advancedSearchMessage = (
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
    );

    return (
      <div>
        {this.props.isHomePage && (
          <DS.SearchPromo
            headingText="Search the World's Research Collections"
            titleId="tagline"
            selectedOption={selectedField}
            searchButtonId="searchButtonId"
            advancedSearchMessage={advancedSearchMessage}
            searchValue={selectedQuery}
            hasError={this.state.error}
            errorMessage={this.state.errorMsg}
            searchBarId="searchBarId"
            dropdownId="dropdownId"
            searchInputAriaLabel="Search for keyword, author, title, or subject"
            searchDropdownOptions={this.props.allowedFields}
            searchSubmitHandler={this.submitSearchRequest}
            textChangeHandler={this.onQueryChange}
            selectChangeHandler={this.onFieldChange}
            selectBlurHandler={this.onFieldChange}
          />
        )}
        {!this.props.isHomePage && (
          <DS.HeaderWithSearch
            searchButtonId="searchButtonId"
            searchBarAriaLabel="Search research catalog"
            sectionTitle={(
              <Link
                className="search-header__rn-section-title rn-section-title"
                to="/"
              >
                <span id="research-now-title">
                  Research
                  <span className="rn-section-title__emphasis">Now</span>
                </span>
              </Link>
            )}
            advancedSearchElem={(
              <DS.UnderlineLink>
                <Link
                  to="advanced-search"
                  className="text-baseline"
                >
                  Advanced Search
                </Link>
              </DS.UnderlineLink>
            )}
            searchBarId="searchBarId"
            dropdownId="dropdownId"
            textFieldAriaLabel="Research Now"
            headingContent={(
              <span>
                Research
                <span className="rn-section-title__emphasis">Now</span>
              </span>
            )}
            headingId="researchNow-page-title-id"
            headingUrl="#research-now-url"
            headingBaseClass="rn-section-title"
            searchDropdownOptions={this.props.allowedFields}
            searchSubmitHandler={this.submitSearchRequest}
            textChangeHandler={this.onQueryChange}
            selectChangeHandler={this.onFieldChange}
            selectBlurHandler={this.onFieldChange}
          />
        )}
      </div>
    );
  }
}

SearchForm.propTypes = {
  isHomePage: PropTypes.bool,
  allowedFields: PropTypes.arrayOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  userQuery: PropTypes.func,
};

SearchForm.defaultProps = {
  isHomePage: true,
  allowedFields: ['keyword', 'title', 'author', 'subject'],
  searchQuery: initialSearchQuery,
  userQuery: () => { },
};

SearchForm.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default SearchForm;
