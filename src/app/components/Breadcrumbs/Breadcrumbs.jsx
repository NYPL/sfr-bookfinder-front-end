import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as DS from '@nypl/design-system-react-components';
import * as searchActions from '../../actions/SearchActions';
import { MAX_TITLE_LENGTH } from '../../constants/editioncard';
import EditionCard from '../Card/EditionCard';
import { truncateStringOnWhitespace } from '../../util/Util';

const getLinkFromWork = (title, uuid) => {
  const workTitle = title || 'Title Unknown';

  const strippedSlashTitle = workTitle.indexOf('/') > 0
    ? workTitle.substring(0, workTitle.indexOf('/')) : workTitle;
  const breadcrumbTitle = truncateStringOnWhitespace(strippedSlashTitle, MAX_TITLE_LENGTH);
  return {
    href: `/work?workId=${uuid}`,
    text: `${breadcrumbTitle}`,
  };
};

export const getBreadcrumbLinks = (workDetail, editionDetail) => {
  const links = [];
  if (workDetail && workDetail.uuid) {
    links.push(getLinkFromWork(workDetail.title, workDetail.uuid));
  }

  if (editionDetail && editionDetail.id) {
    const editionYear = EditionCard.editionYearText(editionDetail);
    links.push({
      href: `/edition?editionId=${editionDetail.id}`,
      text: `${editionYear}`,
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
    const { location, workDetail, editionDetail } = this.props;
    const links = getBreadcrumbLinks(workDetail, editionDetail);
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
  workDetail: PropTypes.shape({ uuid: PropTypes.string, title: PropTypes.string }),
  editionDetail: PropTypes.shape({ id: PropTypes.string, publication_date: PropTypes.string }),
  dispatch: PropTypes.func,
};

Breadcrumbs.defaultProps = {
  location: {},
  workDetail: {},
  editionDetail: {},
  dispatch: () => { },
};

Breadcrumbs.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

export default Breadcrumbs;
