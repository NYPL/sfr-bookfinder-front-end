import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Breadcrumbs = ((props) => {

  const { query, field, type } = props;

  const homeLink = (
    <li key="home">
      <Link to={'/'} onClick={() => onClick('Home')}>
        Home
      </Link>
    </li>);

  const crumbTrail = () => {
    const crumbs = [homeLink];

    if (type === 'search') {
      crumbs.push(<li key="results">Search Results</li>);
    }

    crumbs.push(
      <li key="search">
        <Link to={`/search?q=${query}`} onClick={() => onClick('Search Results')}>
          Search Results
        </Link>
      </li>);

    if (type === 'work') {
      crumbs.push(<li key="details">Work Details</li>);
    }
    crumbs.push(
      <li key="work">
        <Link to={`/work?workId=${query}`} onClick={() => onClick('Work Details')}>Work Details</Link>
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
