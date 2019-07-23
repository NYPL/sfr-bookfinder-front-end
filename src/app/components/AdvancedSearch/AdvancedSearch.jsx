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
import { isEmpty } from '../../util/Util';
import TextInput from '../Form/TextInput';
import Checkbox from '../Form/Checkbox';

// input type advanced searchs
const inputTerms = [
  { key: 1, values: [{ key: 'keyword', label: 'Keyword' }, { key: 'author', label: 'Author' }] },
  { key: 2, values: [{ key: 'title', label: 'Title' }, { key: 'subject', label: 'Subject' }] },
];

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
    this.state = {
      languages: [],
      queries: {
        language: [],
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
    this.boundActions = bindActionCreators(searchActions, dispatch);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.parseStateToQuery = this.parseStateToQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitSearchRequest = this.submitSearchRequest.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidMount() {
    this.loadLanguages();
  }

  onQueryChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState) => {
      const queries = prevState.queries;
      queries[name] = value;
      return { queries };
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

  onYearChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState) => {
      const filters = prevState.filters;
      filters.years[name] = value;
      return { filters };
    });
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

  handleSubmit(event) {
    if (event && event.charCode === 13) {
      this.submitSearchRequest(event);
    }
  }

  parseStateToQuery() {
    const queries = Object.keys(this.state.queries)
      .filter(q => this.state.queries[q] && this.state.queries[q].length > 0)
      .map(q => ({ field: q, query: this.state.queries[q] }));

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
    return Object.assign({}, { queries, filters });
  }

  submitSearchRequest(event) {
    event.preventDefault();
    event.stopPropagation();
    const fullQuery = this.parseStateToQuery();
    if (fullQuery) {
      this.boundActions.userQuery(fullQuery);
      const path = `/search?${getQueryString(fullQuery)}`;
      this.context.router.push(path);
    }
  }

  clearForm() {
    this.setState({ queries: {}, filters: { format: {}, language: [], years: {} } });
  }

  render() {
    const { searchQuery, searchResults } = this.props;
    const { router } = this.context;

    const pageType = isEmpty(searchResults) ? 'home' : 'results';
    /**
     * onClick handler for resetting state for the request back to the home page
     * to return the user to a new search.
     *
     * @param {object} event
     */
    const handleReset = (event) => {
      event.preventDefault();

      this.boundActions.resetSearch();
      router.push('/');
    };

    return (
      <main
        id="mainContent"
        className="main-content grid-container padding-0"
      >
        <div className="grid-row">
          <div className="sfr-header-wrapper tablet:grid-col-12">
            <Breadcrumbs
              links={[
                {
                  href: `/search?${getQueryString(searchQuery)}`,
                  text: 'Advanced Search',
                },
              ]}
              pageType={pageType}
              onClickHandler={handleReset}
            />
          </div>
          <div
            aria-label="ResearchNow"
            className="grid-col-12"
          >
            <div className="sfr-header-wrapper grid-col-10">
              <h1 className="nypl-heading">ResearchNow</h1>
              <div id="tagline">Search the world&apos;s research collections and more for digital books you can use right now</div>
            </div>
            <form
              className="usa-form grid-col-10 margin-bottom-2 margin-x-auto"
              onSubmit={this.handleSubmit}
              onKeyPress={this.handleSubmit}
            >
              <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0">
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
                        value={this.state.queries[term.key]}
                      />
                    ))}
                  </div>
                ))}
              </fieldset>

              <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0">
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
                    id="language"
                    label="Languages"
                    defaultValue={this.state.filters.language}
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
              <div className="grid-container width-full margin-x-0 padding-x-0">
                <div className="grid-row margin-top-4 grid-gap">
                  <div className="tablet:grid-col-6">
                    <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0 margin-bottom-2">
                      <legend className="usa-legend font-sans-lg sub-legend">Publication Year</legend>

                      <div className="grid-row">
                        <TextInput
                          className="grid-col-4"
                          ariaLabel="Search for Start Date"
                          labelClass="usa-label"
                          id="start"
                          type="number"
                          inputClass="usa-input usa-input--small"
                          name="start"
                          onChange={this.onYearChange}
                          label="Start"
                          value={this.state.filters.years.start}
                          max={this.state.filters.years.end}
                        />
                        <TextInput
                          className="grid-col-4"
                          ariaLabel="Search for End Date"
                          labelClass="usa-label"
                          id="end"
                          type="number"
                          inputClass="usa-input usa-input--small"
                          name="end"
                          onChange={this.onYearChange}
                          label="End"
                          value={this.state.filters.years.end}
                          min={this.state.filters.years.start}
                        />
                      </div>
                    </fieldset>
                  </div>

                  <div className="tablet:grid-col-6">
                    <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0 margin-bottom-2">
                      <legend className="usa-legend font-sans-lg sub-legend">Format</legend>
                      <div className="grid-row usa-label">
                        <Checkbox
                          className="usa-checkbox tablet:grid-col-12"
                          labelClass="usa-checkbox__label"
                          inputClass="usa-checkbox__input"
                          id="epub"
                          isSelected={this.state.filters.format.epub}
                          onChange={this.onFormatChange}
                          label="ePub"
                          name="epub"
                        />
                      </div>
                      <div className="grid-row">
                        <Checkbox
                          className="usa-checkbox tablet:grid-col-12"
                          labelClass="usa-checkbox__label"
                          inputClass="usa-checkbox__input"
                          id="pdf"
                          isSelected={this.state.filters.format.pdf}
                          onChange={this.onFormatChange}
                          label="PDF"
                          name="pdf"
                        />
                      </div>
                      <div className="grid-row">
                        <Checkbox
                          className="usa-checkbox tablet:grid-col-12"
                          labelClass="usa-checkbox__label"
                          inputClass="usa-checkbox__input"
                          id="html"
                          isSelected={this.state.filters.format.html}
                          onChange={this.onFormatChange}
                          label="Html"
                          name="html"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="grid-container width-full margin-x-0 padding-x-0">
                <div className="grid-row grid-gap">
                  <div className="tablet:grid-col-6">
                    <div className="grid-row grid-gap">
                      <div className="tablet:grid-col-6">
                        <input
                          className="usa-button width-full usa-label"
                          type="submit"
                          value="Search"
                          readOnly
                          onClick={this.submitSearchRequest}
                        />
                      </div>
                      <div className="tablet:grid-col-6">
                        <input
                          className="usa-button usa-button--outline width-full usa-label"
                          type="clear"
                          value="Clear"
                          onClick={this.clearForm}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

AdvancedSearch.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.any),
  searchQuery: searchQueryPropTypes,
  dispatch: PropTypes.func,
};

AdvancedSearch.defaultProps = {
  searchResults: {},
  searchQuery: initialSearchQuery,
  dispatch: () => {},
};

AdvancedSearch.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state, ownProps) => ({
  searchResults: state.searchResults || ownProps.searchResults,
  searchQuery: state.searchQuery || ownProps.searchQuery,
});

export default connect(
  mapStateToProps,
  null,
)(withRouter(AdvancedSearch));
