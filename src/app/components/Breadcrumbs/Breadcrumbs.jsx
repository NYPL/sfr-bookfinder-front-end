import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as DS from '@nypl/design-system-react-components';

/**
 * Takes `query` and `type` as properties to pass to its methods.
 *
 * @param {object} props
 * @returns {array}
 */
const Breadcrumbs = ({ links, pageType, onClickHandler }) => {
  const homeLink = (
    <Link
      to="/"
      onClick={event => onClickHandler(event)}
    >
      ResearchNow
    </Link>
  );

  const crumbTrail = () => {
    const crumbs = [homeLink];

    if (links && links.length && pageType !== 'home') {
      links.forEach((link, i) => {
        if (i < links.length - 1) {
          crumbs.push(
            <Link to={link.href}>{link.text}</Link>,
          );
        }
      });
    }

    return crumbs;
  };

  const crumbs = crumbTrail();
  return (
    <DS.Breadcrumb breadcrumbs={crumbs} />
  );
};

Breadcrumbs.propTypes = {
  links: PropTypes.arrayOf(PropTypes.any),
  pageType: PropTypes.string,
  onClickHandler: PropTypes.func,
};

Breadcrumbs.defaultProps = {
  links: [],
  pageType: 'home',
  onClickHandler: () => {},
};

export default Breadcrumbs;
