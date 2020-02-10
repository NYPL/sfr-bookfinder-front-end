/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { errorMessagesText } from '../../constants/labels';

function withSearch(WrappedComponent) {
  class SearchComponent extends React.Component {
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
          searchQuery: Object.assign({}, initialSearchQuery, { showField: '', showQuery: querySelected },
            { queries: [].concat(advancedQuery) }),
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
      return (
        <WrappedComponent
          onQueryChange={this.onQueryChange}
          onFieldChange={this.onFieldChange}
          submitSearchRequest={this.submitSearchRequest}
          context={this.context}
          currentQuery={this.state.searchQuery}
          hasError={this.state.error}
          errorMessage={this.state.errorMsg}
          {...this.props}
        />
      );
    }
  }

  SearchComponent.propTypes = {
    allowedFields: PropTypes.arrayOf(PropTypes.any),
    searchQuery: searchQueryPropTypes,
    userQuery: PropTypes.func,
  };

  SearchComponent.defaultProps = {
    allowedFields: ['keyword', 'title', 'author', 'subject'],
    searchQuery: initialSearchQuery,
    userQuery: () => { },
  };

  SearchComponent.contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
  };
  return SearchComponent;
}

export default withSearch;
