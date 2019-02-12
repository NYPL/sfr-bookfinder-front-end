import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Breadcrumbs = ((query, type) => {
  const onClick = pageTitle => tracker('Breadcrumbs', pageTitle);

  const homeLink = (
    <li key="home">
      <Link to={'/'} onClick={() => onClick('Home')}>
        Home
      </Link>
    </li>);

  const crumbTrail = () => {
    const crumbs = [homeLink];

    if (type === 'results') {
      crumbs.push(<li key="results">Search Results</li>);
    }

    crumbs.push(
      <li key="results">
        <Link to={`/search?q=${query.q}`} onClick={() => onClick('Search Results')}>
          Search Results
        </Link>
      </li>);

    if (type === 'details') {
      crumbs.push(<li key="details">Work Details</li>);
    }
    crumbs.push(
      <li key="details">
        <Link to={`/work?workId=${query.q}`} onClick={() => onClick('Work Details')}>Work Details</Link>
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
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default Breadcrumbs;
