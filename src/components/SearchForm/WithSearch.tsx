import React from "react";
import PropTypes from "prop-types";
import { getQueryString } from "~/src/util/SearchQuery";
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "../../stores/InitialState";
import { errorMessagesText } from "../../constants/labels";
import Router, { withRouter } from "next/router";
/** Wrapper that adds search functionality
 It contains handling for changes in search field and search query, as well as submit handling

 @param Component Component to test or React Element that needs these handlers */

function withSearch(WrappedComponent: any) {
  class SearchComponent extends React.Component {
    router: any;

    constructor(props: any, router: any) {
      super(props);

      this.state = {
        error: false,
        errorMsg: "",
        ...props,
      };
      this.router = router;
      this.onFieldChange = this.onFieldChange.bind(this);
      this.onQueryChange = this.onQueryChange.bind(this);
      this.submitSearchRequest = this.submitSearchRequest.bind(this);
    }

    componentDidMount() {
      // global.window.scrollTo(0, 0);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'initialQuery' does not exist on type 'Re... Remove this comment to see the full error message
      this.setState({ searchQuery: this.props.initialQuery });
    }

    componentDidUpdate(prevProps: any) {
      // Wait for initial query to be returned before setting it in state
      if (
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'initialQuery' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.initialQuery &&
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'initialQuery' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.initialQuery !== prevProps.initialQuery
      ) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'initialQuery' does not exist on type 'Re... Remove this comment to see the full error message
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ searchQuery: this.props.initialQuery });
      }
    }

    onFieldChange(event: any) {
      const fieldSelected = event.target.value;
      this.setState(() => {
        const advancedQuery = {
          query: "",
          field: fieldSelected,
        };
        return {
          searchQuery: Object.assign(
            {},
            initialSearchQuery,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            { showQueries: [].concat(advancedQuery) },
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            { queries: [].concat(advancedQuery) }
          ),
        };
      });
    }

    onQueryChange(event: any) {
      const querySelected = event.target.value;

      this.setState((prevState) => {
        const advancedQuery = {
          query: querySelected,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchQuery' does not exist on type 'Rea... Remove this comment to see the full error message
          field: prevState.searchQuery.showQueries[0]
            ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchQuery' does not exist on type 'Rea... Remove this comment to see the full error message
              prevState.searchQuery.showQueries[0].field
            : // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchQuery' does not exist on type 'Rea... Remove this comment to see the full error message
              prevState.searchQuery.queries[0].field || "keyword",
        };

        const newQuery = Object.assign(
          {},
          initialSearchQuery,
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          { showQueries: [].concat(advancedQuery) },
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          { queries: [].concat(advancedQuery) }
        );

        return { searchQuery: newQuery };
      });

      if (querySelected) {
        this.setState({ error: false, errorMsg: "" });
      }
    }

    submitSearchRequest(event: any) {
      event.preventDefault();
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchQuery' does not exist on type 'Rea... Remove this comment to see the full error message
      const query = this.state.searchQuery.queries[0].query.trim();
      if (!query) {
        this.setState({ error: true, errorMsg: errorMessagesText.emptySearch });
        return;
      }

      Router.push({
        pathname: `/search`,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchQuery' does not exist on type 'Rea... Remove this comment to see the full error message
        query: getQueryString(this.state.searchQuery),
      });
    }

    render() {
      return (
        <WrappedComponent
          onQueryChange={this.onQueryChange}
          onFieldChange={this.onFieldChange}
          submitSearchRequest={this.submitSearchRequest}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchQuery' does not exist on type 'Rea... Remove this comment to see the full error message
          currentQuery={this.state.searchQuery}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'error' does not exist on type 'Readonly<... Remove this comment to see the full error message
          hasError={this.state.error}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorMsg' does not exist on type 'Readon... Remove this comment to see the full error message
          errorMessage={this.state.errorMsg}
          {...this.props}
        />
      );
    }
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
  SearchComponent.propTypes = {
    initialQuery: searchQueryPropTypes,
    userQuery: PropTypes.func,
  };

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
  SearchComponent.defaultProps = {
    initialQuery: initialSearchQuery,
    userQuery: () => {},
  };

  // @ts-expect-error ts-migrate(2551) FIXME: Property 'contextTypes' does not exist on type 'ty... Remove this comment to see the full error message
  SearchComponent.contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
  };

  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof SearchComponent' is not a... Remove this comment to see the full error message
  return withRouter(SearchComponent);
}

export default withSearch;
