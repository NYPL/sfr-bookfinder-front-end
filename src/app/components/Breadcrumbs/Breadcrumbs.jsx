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
  const crumbTrail = () => {
    const homeLink = (
      <Link
        to="/"
        onClick={event => onClickHandler(event)}
      >
        ResearchNow
      </Link>
    );

    const crumbs = [homeLink];

    if (links && links.length && pageType !== 'home') {
      // If not on home, add all the other links, except for the current page
      crumbs.concat(links.slice(0, -1)
        .map(link => (
          <Link
            to={link.href}
            onClick={event => onClickHandler(event)}
          >
            {link.text}
          </Link>
        )));
    }
    return crumbs;
  };

  return (
    <DS.Breadcrumbs breadcrumbs={crumbTrail()} />
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
