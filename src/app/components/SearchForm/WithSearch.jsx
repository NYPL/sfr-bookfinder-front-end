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

      this.state = {
        error: false, errorMsg: '', ...props,
      };

      this.onFieldChange = this.onFieldChange.bind(this);
      this.onQueryChange = this.onQueryChange.bind(this);
      this.submitSearchRequest = this.submitSearchRequest.bind(this);
    }

    componentDidMount() {
      global.window.scrollTo(0, 0);
      this.setState({ searchQuery: this.props.initialQuery });
    }

    componentDidUpdate(prevProps) {
      // Wait for initial query to be returned before setting it in state
      if (this.props.initialQuery && this.props.initialQuery !== prevProps.initialQuery) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ searchQuery: this.props.initialQuery });
      }
    }

    onFieldChange(event) {
      const fieldSelected = event.target.value;
      this.setState(() => {
        const advancedQuery = {
          query: '',
          field: fieldSelected,
        };
        return ({
          searchQuery: Object.assign({}, initialSearchQuery,
            { showQueries: [].concat(advancedQuery) },
            { queries: [].concat(advancedQuery) }),
        });
      });
    }

    onQueryChange(event) {
      const querySelected = event.target.value;

      this.setState((prevState) => {
        const advancedQuery = {
          query: querySelected,
          field: prevState.searchQuery.showQueries[0]
            ? prevState.searchQuery.showQueries[0].field
            : prevState.searchQuery.queries[0].field || 'keyword',
        };

        const newQuery = Object.assign({}, initialSearchQuery,
          { showQueries: [].concat(advancedQuery) },
          { queries: [].concat(advancedQuery) });

        return ({ searchQuery: newQuery });
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
    initialQuery: searchQueryPropTypes,
    userQuery: PropTypes.func,
  };

  SearchComponent.defaultProps = {
    initialQuery: initialSearchQuery,
    userQuery: () => { },
  };

  SearchComponent.contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
  };

  return SearchComponent;
}

export default withSearch;
