import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * Takes `query` and `type` as properties to pass to its methods.
 *
 * @param {object} props
 * @returns {array}
 */
const Breadcrumbs = (({ links, pageType, onClickHandler }) => {
  if (pageType === 'home') {
    return null;
  }

  // const onClick = pageTitle => tracker('Breadcrumbs', pageTitle);

  const homeLink = (
    <li key="home">
      <Link to="/" onClick={event => onClickHandler(event)}>
        ResearchNow
      </Link>
    </li>);

  const crumbTrail = () => {
    const crumbs = [homeLink];

    if (links && links.length) {
      links.forEach((link, iterator) => {
        const linkKey = `links-${iterator}`;
        if (iterator < links.length - 1) {
          crumbs.push(<li key={linkKey}><Link to={link.href}>{link.text}</Link></li>);
        } else {
          crumbs.push(<li key={linkKey}>{link.text}</li>);
        }
      });
    }

    return crumbs;
  };

  const crumbs = crumbTrail();

  return (
    <nav aria-label="Breadcrumbs" className="nypl-breadcrumbs">
      <span className="nypl-screenreader-only">You are here:</span>
      <ol>
        {crumbs}
      </ol>
    </nav>
  );
});

Breadcrumbs.propTypes = {
  links: PropTypes.array,
  pageType: PropTypes.string,
  onClickHandler: PropTypes.func,
};

Breadcrumbs.defaultProps = {
  links: [],
  pageType: 'home',
  onClickHandler: () => {},
};

export default Breadcrumbs;
