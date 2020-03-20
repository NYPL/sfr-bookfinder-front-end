/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { getQueryString } from '../../search/query';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import { errorMessagesText } from '../../constants/labels';

/** Wrapper that adds search functionality
 It contains handling for changes in search field and search query, as well as submit handling

 @param Component Component to test or React Element that needs these handlers */

function withSearch(WrappedComponent) {
  class SearchComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = { error: false, errorMsg: '', ...props };

      this.onFieldChange = this.onFieldChange.bind(this);
      this.onQueryChange = this.onQueryChange.bind(this);
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

    submitSearchRequest(event) {
      event.preventDefault();
      const query = this.state.searchQuery.queries[0].query.trim();
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
          currentQuery={this.state.searchQuery}
          hasError={this.state.error}
          errorMessage={this.state.errorMsg}
          {...this.props}
        />
      );
    }
  }

  SearchComponent.propTypes = {
    searchQuery: searchQueryPropTypes,
    userQuery: PropTypes.func,
  };

  SearchComponent.defaultProps = {
    searchQuery: initialSearchQuery,
    userQuery: () => { },
  };

  SearchComponent.contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
  };

  return SearchComponent;
}

export default withSearch;
