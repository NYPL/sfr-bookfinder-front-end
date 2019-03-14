import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * Takes `query` and `type` as properties to pass to its methods.
 *
 * @param {object} props
 * @returns {array}
 */
const Breadcrumbs = (({ query = '', field = '', type }) => {
  if (type === 'home') {
    return null;
  }

  // const onClick = pageTitle => tracker('Breadcrumbs', pageTitle);

  const homeLink = (
    <li key="home">
      <Link to={'/'}>
        ResearchNow
      </Link>
    </li>);

  const crumbTrail = () => {
    const crumbs = [homeLink];

    if (type === 'results') {
      crumbs.push(<li key="results">Search Results</li>);
      return crumbs;
    }

    crumbs.push(
      <li key="results">
        <Link to={`/search?q=${query}&field=${field}`}>
          Search Results
        </Link>
      </li>);

    if (type === 'details') {
      crumbs.push(<li key="details">Work Detail</li>);
      return crumbs;
    }

    crumbs.push(
      <li key="details">
        <Link to={`/work`}>Work Details</Link>
      </li>);

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
  query: PropTypes.string,
  field: PropTypes.string,
  type: PropTypes.string,
};

export default Breadcrumbs;
