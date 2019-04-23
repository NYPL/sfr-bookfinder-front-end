import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * Takes `query` and `type` as properties to pass to its methods.
 *
 * @param {object} props
 * @returns {array}
 */
const Breadcrumbs = ({ links, pageType, onClickHandler }) => {
  const homeLink = (
    <li key="home">
      <Link
        to="/"
        onClick={event => onClickHandler(event)}
      >
        ResearchNow
      </Link>
    </li>
  );

  const crumbTrail = () => {
    const crumbs = [homeLink];

    if (links && links.length && pageType !== 'home') {
      links.forEach((link, iterator) => {
        const linkKey = `links-${iterator}`;
        if (iterator < links.length - 1) {
          crumbs.push(
            <li key={linkKey}>
              <Link to={link.href}>{link.text}</Link>
            </li>,
          );
        } else {
          crumbs.push(<li key={linkKey}>{link.text}</li>);
        }
      });
    }

    return crumbs;
  };

  const crumbs = crumbTrail();

  return (
    <div className="grid-row">
      <div className="grid-col-1" />
      <nav
        aria-label="Breadcrumbs"
        className="grid-col-10 nypl-breadcrumbs"
      >
        <span className="nypl-screenreader-only">You are here:</span>
        <ol>{crumbs}</ol>
      </nav>
    </div>
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
