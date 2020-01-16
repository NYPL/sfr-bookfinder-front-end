import React from 'react';
import PropTypes from 'prop-types';
// import { Html5Entities } from 'html-entities';
import { Link } from 'react-router';

// const htmlEntities = new Html5Entities();

// const getIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';

// const linkToAuthor = author => ({
//   query: author[getIdentifier(author)],
//   field: getIdentifier(author),
//   showQuery: `"${author.name}"`,
//   showField: 'author',
// });

// const birthDate = entity => (entity.birth_date_display || entity.death_date_display) && (
// <span>
//   {' ('}
//   {entity.birth_date_display && entity.birth_date_display}
//   {entity.death_date_display && ` -- ${entity.death_date_display}`}
//   {') '}
// </span>
// );

// const filterAgents = (agents, max, roleFilter) => agents //
//   .filter(agent => !roleFilter || agent.roles.indexOf(roleFilter) > -1)
//   .slice(0, max || agents.length);
const getAuthorIdentifier = author => (author.viaf && 'viaf') || (author.lcnaf && 'lcnaf') || 'name';

const getLinkToAuthorSearch = author => ({
  queries: JSON.stringify([{ query: author[getAuthorIdentifier(author)], field: getAuthorIdentifier(author) }]),
  showQuery: `"${author.name}"`,
  showField: 'author',
});


const AuthorsList = ({ agents }) => {
  if (!agents || !agents.length) return null;
  return agents.map((authorAgent, idx) => {
    const authorLinkText = idx === agents.length - 1 ? authorAgent.name : `${authorAgent.name}, `;
    return (
      <Link
        to={{ pathname: '/search', query: getLinkToAuthorSearch(authorAgent) }}
        className="link"
      >
        {authorLinkText}
      </Link>
    );
  });
};

AuthorsList.propTypes = {
  agents: PropTypes.arrayOf(PropTypes.any),
  max: PropTypes.number,
  roleFilter: PropTypes.string,
};
AuthorsList.defaultProps = {
  agents: [],
  max: 0,
  roleFilter: null,
};

export default AuthorsList;
