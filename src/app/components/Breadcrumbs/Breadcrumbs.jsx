import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import { getQueryString } from '../../search/query';
import * as searchActions from '../../actions/SearchActions';

export const getBreadcrumbLinks = (searchQuery, workDetail) => {
  const links = [];
  if (searchQuery && searchQuery.queries
    && searchQuery.queries.length && searchQuery.queries[0].query) {
    links.push({
      href: `/search?${getQueryString(searchQuery)}`,
      text: 'Search Results',
    });
  }
  if (workDetail && workDetail.uuid) {
    links.push({
      href: `/work?workId=${workDetail.uuid}`,
      text: 'Item Detail',
    });
  }
  return links;
};

export const getCrumbTrail = (location, links, handleReset) => {
  const homeLink = (
    <Link
      to="/"
      onClick={event => handleReset(event)}
    >
    ResearchNow
    </Link>
  );

  const crumbs = [homeLink];

  if (links && links.length && location && location.pathname !== '/') {
    // Add all the other links
    const additionalLinkElements = (links
      .map(link => (
        <Link to={link.href}>
          {link.text}
        </Link>
      )));
    if (additionalLinkElements) {
      crumbs.push(...additionalLinkElements);
    }
  }
  return crumbs;
};

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.boundActions = bindActionCreators(searchActions, dispatch);
  }

  render() {
    const { location, searchQuery, workDetail } = this.props;
    const links = getBreadcrumbLinks(searchQuery, workDetail);
    const handleReset = (event) => {
      event.preventDefault();

      this.boundActions.resetSearch();
      this.context.router.push('/');
    };

    return (
      <DS.Breadcrumbs breadcrumbs={getCrumbTrail(location, links, handleReset)} />
    );
  }
}

Breadcrumbs.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  searchQuery: PropTypes.objectOf(PropTypes.any),
  workDetail: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
};

Breadcrumbs.defaultProps = {
  location: {},
  searchQuery: {},
  workDetail: {},
  dispatch: () => { },
};

Breadcrumbs.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default Breadcrumbs;
