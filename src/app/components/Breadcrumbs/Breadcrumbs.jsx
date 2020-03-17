import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import * as searchActions from '../../actions/SearchActions';
import { MAX_TITLE_LENGTH } from '../../constants/editioncard';

export const getBreadcrumbLinks = (workDetail) => {
  const links = [];
  if (workDetail && workDetail.title) {
    const strippedSlashTitle = workDetail.title.indexOf('/') > 0
      ? workDetail.title.substring(0, workDetail.title.indexOf('/')) : workDetail.title;
    const breadcrumbTitle = strippedSlashTitle.length > MAX_TITLE_LENGTH
      ? `${strippedSlashTitle.substring(0, MAX_TITLE_LENGTH)}...` : strippedSlashTitle;
    links.push({
      href: `/work?workId=${workDetail.uuid}`,
      text: `${breadcrumbTitle}`,
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
    Digital Research Books Beta
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
    const { location, workDetail } = this.props;
    const links = getBreadcrumbLinks(workDetail);
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
  workDetail: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
};

Breadcrumbs.defaultProps = {
  location: {},
  workDetail: {},
  dispatch: () => { },
};

Breadcrumbs.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default Breadcrumbs;
