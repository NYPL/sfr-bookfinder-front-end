/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import appConfig from '../../../../appConfig';
import * as searchActions from '../../actions/SearchActions';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import TextInput from '../Form/TextInput';
import Checkbox from '../Form/Checkbox';
import { inputTerms, formatTypes, errorMessagesText } from '../../constants/labels';
import FilterYears from '../SearchResults/FilterYears';


const initialState = {
  error: false,
  errorMsg: '',
  languages: [],
  queries: {
    keyword: '',
    title: '',
    author: '',
    subject: '',
  },
  filters: {
    format: {
      epub: false,
      pdf: false,
      html: false,
    },
    language: [],
    years: {
      start: '',
      end: '',
    },
  },
};
// style for the languages dropdown
const customStyles = {
  control: base => ({
    ...base,
    minHeight: '2.5rem',
  }),
  menu: base => ({
    ...base,
    background: '#FFF',
    // override border radius to match the box
    borderRadius: 0,
    border: '1px solid black',
    width: '100%',
    // kill the gap
    marginTop: 0,
    marginRigth: '2rem',
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? 'black' : 'white',
    color: state.isFocused ? 'white' : 'black',
  }),
};

/**
 * Container class providing the Redux action creators
 * to its child components. State data is passed along
 * including params set in location.
 *
 * Accessibility Note: Creates the <main> element for all
 * search pages with the corresponding <h1>.
 */
class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = initialState;
    this.boundActions = bindActionCreators(searchActions, dispatch);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.parseStateToQuery = this.parseStateToQuery.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
    this.onChangeYears = this.onChangeYears.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidMount() {
    this.loadLanguages();
  }

  componentWillReceiveProps(props) {
    this.parseQueryToState(props.searchQuery);
  }

  onQueryChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState) => {
      const queries = prevState.queries;
      queries[name] = value;
      return { queries, error: false, errorMsg: '' };
    });
  }

  onLanguageChange(event) {
    const value = event && !event.target && event.map(language => language.value);
    if (value) {
      this.setState((prevState) => {
        const filters = prevState.filters;
        filters.language = value;
        return { filters };
      });
    }
  }

  onFormatChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState) => {
      const filters = prevState.filters;
      filters.format[name] = value;
      return { filters };
    });
  }

  onChangeYears(yearsFilter) {
    this.setState((prevState) => {
      const filters = prevState.filters;
      filters.years = yearsFilter;
      return { filters };
    });
  }

  onErrorYears(errorObj) {
    this.setState({ error: errorObj.error, errorMsg: errorObj.errorMsg });
  }

  loadLanguages() {
    const appEnv = process.env.APP_ENV || 'production';
    const apiUrl = appConfig.api[appEnv];
    const { languagesPath } = appConfig.api;
    const langUrl = apiUrl + languagesPath;

    axios.get(langUrl).then((resp) => {
      this.setState({
        languages:
          resp
          && resp.data
          && resp.data.data
          && resp.data.data.languages.map(language => ({ value: language.language, label: language.language })),
      });
    });
  }

  parseStateToQuery() {
    const queries = Object.keys(this.state.queries)
      .map((q) => {
        const query = this.state.queries[q] && this.state.queries[q].replace(/^\s+/, '').replace(/\s+$/, '');
        return { field: q, query };
      })
      .filter(q => !!q.query);

    const filters = [];
    if (this.state.filters.language && this.state.filters.language.length > 0) {
      Object.keys(this.state.filters.language).forEach((language) => {
        filters.push({ field: 'language', value: this.state.filters.language[language] });
      });
    }
    if (this.state.filters.years.start || this.state.filters.years.end) {
      filters.push({
        field: 'years',
        value: {
          start: this.state.filters.years.start || '',
          end: this.state.filters.years.end || '',
        },
      });
    }
    if (Object.keys(this.state.filters.format).length > 0) {
      Object.keys(this.state.filters.format).forEach((format) => {
        if (this.state.filters.format[format]) {
          filters.push({
            field: 'format',
            value: format,
          });
        }
      });
    }

    if ((!queries || queries.length < 1) && (!filters || filters.length < 1)) {
      return null;
    }
    return Object.assign({}, { page: '0', per_page: '10', sort: [] }, { queries, filters });
  }

  parseQueryToState(searchQuery) {
    const state = { queries: {}, filters: {} };
    if (!searchQuery) {
      return;
    }
    if (searchQuery.showField && searchQuery.showQuery) {
      state.queries[searchQuery.showField] = searchQuery.showQuery;
    }

    if (searchQuery.queries) {
      searchQuery.queries.forEach((q) => {
        const allowedFields = inputTerms.map(term => term.values.map(value => value.key)).flat();
        if (allowedFields.indexOf(q.field) >= 0) {
          // If field is already set (by showQuery), use the showQuery value.
          if (!state.queries[q.field]) {
            state.queries[q.field] = q.query;
          }
        } else {
          state.queries[q.field] = '';
        }
      });
    }
    if (searchQuery.filters) {
      searchQuery.filters.forEach((q) => {
        if (q.field === 'format') {
          if (!state.filters[q.field]) {
            state.filters[q.field] = {};
          }
          state.filters[q.field][q.value] = true;
        } else if (q.field === 'language') {
          if (!state.filters[q.field]) {
            state.filters[q.field] = [];
          }
          state.filters[q.field].push(q.value);
        } else {
          state.filters[q.field] = q.value;
        }
      });
    }
    this.setState((prevState) => {
      const filters = { ...prevState.filters, ...state.filters };
      const queries = { ...prevState.queries, ...state.queries };
      return { filters, queries };
    });
  }

  submitSearchRequest(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.filters && this.state.filters.years
      && this.state.filters.years.start && this.state.filters.years.end
      && Number(this.state.filters.years.start) > Number(this.state.filters.years.end)) {
      this.setState({ error: true, errorMsg: errorMessagesText.invalidDate });
      return;
    }
    const fullQuery = this.parseStateToQuery();
    if (!fullQuery || !fullQuery.queries || fullQuery.queries.length < 1) {
      this.setState({ error: true, errorMsg: errorMessagesText.emptySearch });
      return;
    }
    const path = `/search?${getQueryString(fullQuery)}`;
    this.context.router.push(path);
  }

  clearForm() {
    this.setState(initialState);
  }

  render() {
    const { searchQuery, location } = this.props;
    const { router } = this.context;
    const languagesSelected = this.state.languages.filter(language => this.state.filters.language.indexOf(language.value) > -1);
    const getQueryValue = key => this.state.queries[key];
    const getFilterValue = (filter, key) => this.state.filters[filter] && this.state.filters[filter][key];

    return (
      <main
        id="mainContent"
        className="main-content grid-container padding-0"
      >
        <div className="grid-row">
          <div className="sfr-header-wrapper tablet:grid-col-12">
            <Breadcrumbs
              router={router}
              location={location}
            />
          </div>
          <div
            aria-label="Digital Research Books Beta"
            className="grid-col-12"
          >
            <div className="sfr-header-wrapper grid-col-10">
              <h1 className="nypl-heading">Digital Research Books Beta</h1>
              <div id="tagline">Search the world&apos;s research collections and more for digital books you can use right now</div>
            </div>
            <div className="grid-col-10 margin-bottom-2 margin-x-auto">
              <form
                className="usa-form grid-container width-full margin-x-0 padding-x-0"
                onSubmit={this.submitSearchRequest}
                onKeyPress={(event) => { if (event.keyCode === 13) { this.submitSearchRequest(); } }}
              >
                <fieldset className="usa-fieldset ">
                  <legend className="usa-legend usa-sr-only">Advanced Search</legend>
                  {inputTerms.map(line => (
                    <div
                      className="grid-row grid-gap"
                      key={line.key}
                    >
                      {line.values.map(term => (
                        <TextInput
                          className="tablet:grid-col-6"
                          ariaLabel={`Search for ${term.label}`}
                          labelClass="usa-label"
                          id={term.key}
                          type="text"
                          inputClass="usa-input"
                          name={term.key}
                          onChange={this.onQueryChange}
                          label={term.label}
                          key={term.key}
                          value={getQueryValue(term.key)}
                        />
                      ))}
                    </div>
                  ))}
                </fieldset>

                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-sr-only">Language Search</legend>
                  <label
                    htmlFor="language"
                    className="usa-label width-full margin-bottom-1"
                  >
                    Language
                  </label>
                  <div className="grid-row nypl-select">
                    <Select
                      options={this.state.languages}
                      className="tablet:grid-col-6 position-relative padding-x-0 margin-x-0"
                      isMulti
                      labelClass="usa-label"
                      selectClass="usa-select multiple"
                      name="language"
                      id="filters-language"
                      label="Languages"
                      value={languagesSelected}
                      onChange={this.onLanguageChange}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colores,
                          primary: 'black',
                        },
                      })}
                      styles={customStyles}
                      classNamePrefix="nypl-select"
                    />
                    <div className="tablet:grid-col-6" />
                  </div>
                </fieldset>
                <div className="grid-row margin-top-4 grid-gap">
                  <div className="tablet:grid-col-6">
                    <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0 margin-bottom-2">
                      <legend className="usa-legend font-sans-lg sub-legend">Publication Year</legend>
                      <FilterYears
                        searchQuery={searchQuery}
                        onChange={e => this.onChangeYears(e)}
                        onError={e => this.onErrorYears(e)}
                        inputClassName="tablet:grid-col padding-right-0 padding-top-2"
                        className="grid-row grid-gap"
                      />
                    </fieldset>
                  </div>

                  <div className="tablet:grid-col-6">
                    <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0">
                      <legend className="usa-legend font-sans-lg sub-legend margin-bottom-3">Format</legend>
                      {formatTypes.map(formatType => (
                        <Checkbox
                          className="usa-checkbox tablet:grid-col-12"
                          labelClass="usa-checkbox__label"
                          inputClass="usa-checkbox__input"
                          id={`filters-format-${formatType.value}`}
                          isSelected={getFilterValue('format', formatType.value)}
                          onChange={this.onFormatChange}
                          label={formatType.label}
                          name={formatType.value}
                          key={`facet-format-${formatType.value}`}
                        />
                      ))}
                    </fieldset>
                  </div>
                </div>
                <div className="grid-row grid-gap">
                  <div className="tablet:grid-col-6">
                    <div className="grid-row grid-gap">
                      <div className="tablet:grid-col-6">
                        <input
                          className="usa-button width-full margin-top-1"
                          type="submit"
                          value="Search"
                          readOnly
                          onClick={this.submitSearchRequest}
                        />
                      </div>
                      <div className="tablet:grid-col-6">
                        <input
                          className="usa-button usa-button--outline width-full margin-top-1"
                          type="clear"
                          value="Clear"
                          onClick={this.clearForm}
                          readOnly
                        />
                      </div>
                    </div>
                    {this.state.error && (
                      <div
                        className="usa-alert usa-alert--error"
                        role="alert"
                      >
                        <div className="usa-alert__body">
                          <h3 className="usa-alert__heading">Error</h3>
                          <p className="usa-alert__text">{this.state.errorMsg}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

AdvancedSearch.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  dispatch: PropTypes.func,
};

AdvancedSearch.defaultProps = {
  location: {},
  searchQuery: initialSearchQuery,
  dispatch: () => { },
};

AdvancedSearch.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null,
)(withRouter(AdvancedSearch));
